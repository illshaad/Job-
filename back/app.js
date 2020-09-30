const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer");
const moment = require("moment");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = require("./api/apiLrd");
const cors = require("cors");
const app = express();
const db = require("./models/db");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const collaborateurModel = require("./models/collaborteurs");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(__dirname + "/public"));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use(cors());

//app.use("/", indexRouter);
//app.use("/users", usersRouter);
app.use("/api", apiRouter);

//CONFIGURATION MULTER //
var storage = multer.diskStorage({
  //Création d'un folder pour chaque utilisateur
  // Si le path n'existe pas tu le créee avec le nom de l'utilisateur
  destination: function (req, file, cb) {
    const email = req.body.email;
    const path = `./public/uploads/${email}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname.split(" ").join(""));
  },
});

// SAVE FILE MY LOCAL STORAGE //
let upload = multer({ storage: storage });

app.post("/upload", async function (req, res) {
  console.log(req.body);
  res.send("ok");
});

app.post("/file", upload.any(), async function (req, res) {
  const email = req.body.email;
  const files = req.files;
  console.log(files);

  const arrayUploads = [];
  for (let e in files) {
    // const readFile = fs.createReadStream(
    //   `./public/uploads/${email}/${files[e].filename}`
    // );
    arrayUploads.push({
      email: email,
      listToUpload: [
        {
          fsImg: files[e].path,
          categorie: files[e].fieldname,
          extension: files[e].mimetype,
        },
      ],
    });
  }
  console.log(arrayUploads, "TEST");
  console.log(arrayUploads[0].listToUpload);
  axios.post(
    "https://serveur-uploaddrive-dot-projet-test-doctegestio.uc.r.appspot.com/api/driveUpload",
    { listToUpload: arrayUploads }
  );
  res.send("ok");
});

app.post("/idCollaborateur", async function (req, res) {
  const email = req.body.email;
  const responseIdCollaborateur = await axios.get(
    `https://test.api.dg.fr/users/search?field=email_principal&value=${email}&api_key=AIzaSyBJ-4UnNq3A4Xi71h83GpMSnIFFipr4bc8`
  );
  const idUser = responseIdCollaborateur.data.id;
  const responseIdEtablissement = await axios.get(
    `https://test.api.dg.fr/users/${idUser}/full?api_key=AIzaSyBJ-4UnNq3A4Xi71h83GpMSnIFFipr4bc8`
  );
  const idEstablishment = responseIdEtablissement.data.establishment;
  const responseEtablissementSupport = await axios.get(
    `https://test.api.dg.fr/establishments/supports/${idEstablishment}?api_key=AIzaSyBJ-4UnNq3A4Xi71h83GpMSnIFFipr4bc8   `
  );
  const dataEtablissementSupport = responseEtablissementSupport.data;
  const arrayIdEtablissement = dataEtablissementSupport.map((e) => e.id);
  let arrayUsers = [];
  for (let i = 0; i < arrayIdEtablissement.length; i++) {
    let users = await axios.get(
      `https://test.api.dg.fr/users/establishments/${arrayIdEtablissement[i]}?api_key=AIzaSyBJ-4UnNq3A4Xi71h83GpMSnIFFipr4bc8`
    );
    arrayUsers.push(users.data);
  }
  const userEmail = arrayUsers.flat().map((e) => {
    return {
      key: e.email,
      text: e.email,
      value: e.email,
    };
  });
  res.status(200).json(userEmail);
});

//GOOGLE API GOOGLE SHEET//

const TOKEN_PATH = "token.json";

//CONVENTION COLLECTIF //
app.get("/conventionData", async function (req, res) {
  fs.readFile("./public/credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.

    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err)
          return console.error(
            "Error while trying to retrieve access token",
            err
          );
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  /**
   * Prints the names and majors of students in a sample spreadsheet:
   * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */

  async function listMajors(auth) {
    var arrayData = [];
    const sheets = google.sheets({ version: "v4", auth });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "1KLtdch7_TT2JZOHc7rrBMrfSPf67Xs1gmnJEfYqTwwI",
        range: "Convention collective",
      });
      const rows = response.data.values;
      if (rows.length) {
        var names = rows;
        for (const i in names) {
          let object = {
            key: i,
            value: rows[i][1],
            text: rows[i][1],
          };
          arrayData.push(object);
        }
      } else {
        console.log("No data found.");
      }
      res.status(200).json(arrayData.slice(3));
    } catch (error) {
      console.log("error dans listMajor");
    }
  }
});

//NATURE TRAVAILLE //
app.get("/natureData", async function (req, res) {
  fs.readFile("./public/credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.

    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err)
          return console.error(
            "Error while trying to retrieve access token",
            err
          );
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  /**
   * Prints the names and majors of students in a sample spreadsheet:
   * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */

  async function listMajors(auth) {
    var arrayData = [];
    const sheets = google.sheets({ version: "v4", auth });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "1KLtdch7_TT2JZOHc7rrBMrfSPf67Xs1gmnJEfYqTwwI",
        range: "Nature relation de travail",
      });
      const rows = response.data.values;
      if (rows.length) {
        var names = rows;
        for (const i in names) {
          let object = {
            key: i,
            value: rows[i][1],
            text: rows[i][1],
          };
          arrayData.push(object);
        }
      } else {
        console.log("No data found.");
      }
      res.status(200).json(arrayData.slice(3));
    } catch (error) {
      console.log("error dans listMajor");
    }
  }
});

app.get("/juridiqueData", async function (req, res) {
  fs.readFile("./public/credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), juridique);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.

    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err)
          return console.error(
            "Error while trying to retrieve access token",
            err
          );
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  /**
   * Prints the names and majors of students in a sample spreadsheet:
   * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */

  async function juridique(auth) {
    var arrayData = [];
    const sheets = google.sheets({ version: "v4", auth });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "1KLtdch7_TT2JZOHc7rrBMrfSPf67Xs1gmnJEfYqTwwI",
        range: "Structure Juridique",
      });
      const rows = response.data.values;
      if (rows.length) {
        var names = rows;
        for (const i in names) {
          let object = {
            key: i,
            value: rows[i][1],
            text: rows[i][1],
          };
          arrayData.push(object);
        }
        // console.log(arrayData, "DATA")
      } else {
        console.log("No data found.");
      }
      res.status(200).json(arrayData.slice(1));
    } catch (error) {
      console.log("error dans listMajor");
    }
  }
});

// TEST RECUPERATION GESTION PERSONEL//
// Création un google sheeat personnaliser avec =query(importrange("https://docs.google.com/spreadsheets/d/16Qezk7i2fUz24ldDR_pbPUptliLwzmu-t0fFyOgYm00/edit#gid=123987456";"Users!a:v");"select * where (Col19='gestionpersonnel' OR Col20 ='gestionpersonnel')")

app.post("/gestionPerso", async function (req, res) {
  const emailToFront = req.body.email;
  fs.readFile("./public/credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), gestionPerso);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err)
          return console.error(
            "Error while trying to retrieve access token",
            err
          );
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  /**
   * Prints the names and majors of students in a sample spreadsheet:
   * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
   */

  async function gestionPerso(auth) {
    var arrayData = [];
    const sheets = google.sheets({ version: "v4", auth });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "1ycPx2bgZH7OcoRNA3J-1tOTcUQOdoSSkjqjqQmDlSWI",
        range: "Data",
      });
      const rows = response.data.values;
      if (rows.length) {
        var names = rows;
        for (const i in names) {
          let object = {
            key: i,
            value: rows[i][2],
          };
          arrayData.push(object);
        }
      } else {
        console.log("No data found.");
      }
    } catch (error) {
      console.log("error dans listMajor");
    }

    // Quand je me connecte par le front si mon email fait partie de ces cas je fais partie du gestion personnel sinon non//
    const isCollabo = arrayData.filter(
      (element, i) => element.value === emailToFront
    );
    res.status(200).json({ isCollabo: isCollabo.length ? true : false });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
