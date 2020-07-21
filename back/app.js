const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require("multer");
const moment = require('moment');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors = require('cors')
const app = express();
const db = require('./models/db');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const collaborateurModel = require('../back/models/collaborteurs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);


//CONFIGURATION MULTER //
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/uploads/`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      moment().locale("fr").format("MMMM Do YYYY, h:mm:ss") +
      "   " +
      file.originalname
    );
  },
});

// SAVE FILE MY LOCAL STORAGE //
let upload = multer({ storage: storage });


app.get('/uploadCollaborateur', function (req, res) {
  collaborateurModel.find(function (error, data) {
    res.json({ result: true, data });
  });
});

app.post("/uploadCollaborateur", upload.any(), [
  body('prenom').isLength({ min: 2 }),
  body('nom').isLength({ min: 2 }),
  body('numerosecurite').isLength({ min: 1, max: 12 }),
  body('email').isEmail(),
], async function (req, res) {
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    let errorsObject = {};
    errors.array().forEach((e) => {
      if (e.param === "prenom") errorsObject.prenom = "Ce prenom n'est pas assez long !"
      if (e.param === "nom") errorsObject.nom = "Ce nom n'est pas assez long !"
      if (e.param === "numerosecurite") errorsObject.numerosecurite = "Merci de saisir le N°Securite Social !"
      if (e.param === "email") errorsObject.email = "Ce email n'est pas bon !"
    })
    return res.status(422).json({ errors: errorsObject });
  }

  const newCollaborateur = new collaborateurModel({
    prenom: req.body.prenom,
    nom: req.body.nom,
    genre: req.body.genre,
    dateDeNaissance: req.body.dateDeNaissance,
    villeDeNaissance: req.body.villeDeNaissance,
    nomDeNaissance: req.body.nomDeNaissance,
    nationalite: req.body.nationalite,
    numerosecurite: req.body.numerosecurite,
    addresse: req.body.addresse,
    cp: req.body.cp,
    ville: req.body.ville,
    email: req.body.email,
    telephonePerso: req.body.telephonePerso,
    telephoneDomicile: req.body.telephoneDomicile,
    telephoneUrgence: req.body.telephoneUrgence,
    rpps: req.body.rpps,
    numeroDepartemental: req.body.numeroDepartemental,
    departementConseil: req.body.departementConseil,
    specialitePratiquee: req.body.specialitePratiquee
  });
  newCollaborateur.save(function (error, collaborateur) {
    res.status(200).json({ Sauvegarde: 'ok', collaborateur });
  });
});

app.post("/uploadRH", upload.any(), async function (req, res) {
  console.log(req.body);
});

//GOOGLE API//
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
app.get("/etablissementData", async function (req, res) {

  fs.readFile('./public/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
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
      client_id, client_secret, redirect_uris[0]);

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
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
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
    var arrayData = []
    const sheets = google.sheets({ version: 'v4', auth });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1KLtdch7_TT2JZOHc7rrBMrfSPf67Xs1gmnJEfYqTwwI',
        range: 'Etablissement.DIRECTION',
      })
      const rows = response.data.values;
      if (rows.length) {
        var names = rows;
        for (const i in names) {
          let object = {
            key: i,
            value: rows[i][1],
            text: rows[i][1]
          }
          arrayData.push(object)
          console.log(arrayData);
        };
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(3))
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})

// FONCTIONDIGITAL

app.get("/fonctionData", async function (req, res) {
  fs.readFile('./public/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), functionDigital);
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
      client_id, client_secret, redirect_uris[0]);

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
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
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

  async function functionDigital(auth) {
    var arrayData = []
    const sheets = google.sheets({ version: 'v4', auth });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1KLtdch7_TT2JZOHc7rrBMrfSPf67Xs1gmnJEfYqTwwI',
        range: 'fonction',
      })
      const rows = response.data.values;
      if (rows.length) {
        var names = rows;
        for (const i in names) {
          let object = {
            key: i,
            value: rows[i][1],
            text: rows[i][1]
          }
          arrayData.push(object)
        };
        console.log(arrayData, "DATA")
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(1))
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})


app.get("/emailData", async function (req, res) {
  fs.readFile('./public/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), emailResponsable);
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
      client_id, client_secret, redirect_uris[0]);

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
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
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

  async function emailResponsable(auth) {
    var arrayData = []
    const sheets = google.sheets({ version: 'v4', auth });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1KLtdch7_TT2JZOHc7rrBMrfSPf67Xs1gmnJEfYqTwwI',
        range: 'Output_Users',
      })
      const rows = response.data.values;
      if (rows.length) {
        var names = rows;
        // console.log(names[1]);
        for (const i in names) {
          let object = {
            key: i,
            value: rows[i][2],
            text: rows[i][2]
          }
          arrayData.push(object)
        };
        console.log(arrayData, "DATA")
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(1, 100))//limite
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})


app.get("/juridiqueData", async function (req, res) {
  fs.readFile('./public/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
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
      client_id, client_secret, redirect_uris[0]);

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
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
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
    var arrayData = []
    const sheets = google.sheets({ version: 'v4', auth });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1KLtdch7_TT2JZOHc7rrBMrfSPf67Xs1gmnJEfYqTwwI',
        range: 'Structure Juridique',
      })
      const rows = response.data.values;
      if (rows.length) {
        var names = rows;
        for (const i in names) {
          let object = {
            key: i,
            value: rows[i][1],
            text: rows[i][1]
          }
          arrayData.push(object)
        };
        console.log(arrayData, "DATA")
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(1))
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
