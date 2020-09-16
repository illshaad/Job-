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
const passport = require('passport')
const { v4: uuidv4 } = require('uuid');

const collaborateurModel = require('./models/collaborteurs');

//Config passport //
require('./config/passport')(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use(cors())
app.use(passport.initialize())
app.use('/', indexRouter);
app.use('/users', usersRouter);


//CONFIGURATION MULTER //
var storage = multer.diskStorage({
  //Création d'un folder pour chaque utilisateur 
  // Si le path n'existe pas tu le créee avec le nom de l'utilisateur 
  destination: function (req, file, cb) {
    const sousCategorie = req.body.prenom + req.body.nom
    console.log(sousCategorie, 'NOM ICI');

    const path = `./public/uploads/${sousCategorie}`
    console.log(path)
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      uuidv4() + file.originalname.split(" ").join("")
    );
  },
});

// SAVE FILE MY LOCAL STORAGE //
let upload = multer({ storage: storage });


//recuperer tous mes collaborateurs//
app.get('/uploadCollaborateur', function (req, res) {
  collaborateurModel.find(function (error, collaborateurs) {
    res.json(collaborateurs);
  });
});



//: id pour faire des modificiations d'un collaborateur //
app.post("/uploadCollaborateur/:id", upload.any(), [
  body('prenom').isLength({ min: 2 }),
  body('nom').isLength({ min: 2 }),
  body('numerosecurite').isLength({ min: 1, max: 12 }),
  body('email').isEmail(),
], async function (req, res) {
  console.log(req.body, 'Donnée que je recois')
  try {
    const objectFiles = {};
    const nameFiles = ["carteIdentitePassport", "carteVital", "cv", "carnetVaccination", "photo", "RIB", "aptitudeMedicale", "permisConduire", "assuranceAutomobile", "attestationAssuranceHabitation", "autreContratsTravailCours", "lettreMotivation", "carteSejour", "casierJudiciaire", "RCP", "ONCD", "conseildelordre", "radioProtectionPatients", "radioProtectionTravailleurs", 'diplomes', 'diplomesRh', 'materiels', 'contrat', 'declaration', 'fichedeposte', 'fichesynthetique', 'avantagesennature', 'mutuelle', 'onboarding']
    for (let i = 0; i < nameFiles.length; i++) {
      objectFiles[nameFiles[i]] = req.files.find((e) => {
        const object = nameFiles[i].includes(e.fieldname) ? e.path : "";
        return object
      })
    }
    const resultGet = await collaborateurModel.findById(req.params.id)
    const result = await collaborateurModel.findByIdAndUpdate(req.params.id, {
      prenom: req.body.prenom,
      nom: req.body.nom,
      genre: req.body.genre,
      datenaissance: req.body.datenaissance,
      villedenaissance: req.body.villedenaissance,
      nomnaissance: req.body.nomnaissance,
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
      specialitePratiquee: req.body.specialitePratiquee,
      materiels: req.body.materiels,
      contrat: req.body.contrat,
      declaration: req.body.declaration,
      fichedeposte: req.body.fichedeposte,
      fichesynthetique: req.body.fichesynthetique,
      avantagesennature: req.body.avantagesennature,
      mutuelle: req.body.mutuelle,
      onboarding: req.body.onboarding,
      fonctiondigitalsecondaire: req.body.fonctiondigitalsecondaire,
      datePriseDeFonction: req.body.datePriseDeFonction,
      telephonetravail: req.body.telephonetravail,
      telephonemobile: req.body.telephonemobile,
      adressetravail: req.body.adressetravail,
      activite: req.body.activite,
      emailresponsable: req.body.emailresponsable,
      etablissement: req.body.etablissement,
      fonctiondigital: req.body.fonctiondigital,
      juridique: req.body.juridique,
      collaborateur: req.body.collaborateur,
      convention: req.body.convention,
      erp: req.body.erp,
      naturetravail: req.body.naturetravail,
      tempstravail: req.body.tempstravail,
      classification: req.body.classification,
      niveau: req.body.niveau,
      indice: req.body.indice,
      coefficient: req.body.coefficient,
      remunerationbrutemensuelle: req.body.remunerationbrutemensuelle,
      remunerationbrutejournaliere: req.body.remunerationbrutejournaliere,
      remunerationbruteannuelle: req.body.remunerationbruteannuelle,
      remunerationbrutehoraire: req.body.remunerationbrutehoraire,
      nombreheureshebdomadairedusalarie: req.body.nombreheureshebdomadairedusalarie,
      nombreheuresmensueldusalarie: req.body.nombreheuresmensueldusalarie,
      //si reqfiles il est true y a une data sinon vide j'affiche l'emplacement vide//
      carteIdentitePassport: objectFiles.carteIdentitePassport ? objectFiles.carteIdentitePassport.path.replace("public/", "") : resultGet.carteIdentitePassport,
      carteVital: objectFiles.carteVital ? objectFiles.carteVital.path.replace("public/", "") : resultGet.carteVital,
      cv: objectFiles.cv ? objectFiles.cv.path.replace("public/", "") : resultGet.cv,
      carnetVaccination: objectFiles.carnetVaccination ? objectFiles.carnetVaccination.path.replace("public/", "") : resultGet.carnetVaccination,
      diplomesRh: objectFiles.diplomesRh ? objectFiles.diplomesRh.path.replace("public/", "") : resultGet.diplomesRh,
      photo: objectFiles.photo ? objectFiles.photo.path.replace("public/", "") : resultGet.photo,
      RIB: objectFiles.RIB ? objectFiles.RIB.path.replace("public/", "") : resultGet.RIB,
      aptitudeMedicale: objectFiles.aptitudeMedicale ? objectFiles.aptitudeMedicale.path.replace("public/", "") : resultGet.aptitudeMedicale,
      permisConduire: objectFiles.permisConduire ? objectFiles.permisConduire.path.replace("public/", "") : resultGet.permisConduire,
      assuranceAutomobile: objectFiles.assuranceAutomobile ? objectFiles.assuranceAutomobile.path.replace("public/", "") : resultGet.assuranceAutomobile,
      attestationAssuranceHabitation: objectFiles.attestationAssuranceHabitation ? objectFiles.attestationAssuranceHabitation.path.replace("public/", "") : resultGet.attestationAssuranceHabitation,
      autreContratsTravailCours: objectFiles.autreContratsTravailCours ? objectFiles.autreContratsTravailCours.path.replace("public/", "") : resultGet.autreContratsTravailCours,
      lettreMotivation: objectFiles.lettreMotivation ? objectFiles.lettreMotivation.path.replace("public/", "") : resultGet.lettreMotivation,
      carteSejour: objectFiles.carteSejour ? objectFiles.carteSejour.path.replace("public/", "") : resultGet.carteSejour,
      casierJudiciaire: objectFiles.casierJudiciaire ? objectFiles.casierJudiciaire.path.replace("public/", "") : resultGet.casierJudiciaire,
      RCP: objectFiles.RCP ? objectFiles.RCP.path.replace("public/", "") : resultGet.RCP,
      ONCD: objectFiles.ONCD ? objectFiles.ONCD.path.replace("public/", "") : resultGet.ONCD,
      conseildelordre: objectFiles.conseildelordre ? objectFiles.conseildelordre.path.replace("public/", "") : resultGet.conseildelordre,
      radioProtectionPatients: objectFiles.radioProtectionPatients ? objectFiles.radioProtectionPatients.path.replace("public/", "") : resultGet.radioProtectionPatients,
      radioProtectionTravailleurs: objectFiles.radioProtectionTravailleurs ? objectFiles.radioProtectionTravailleurs.path.replace("public/", "") : resultGet.radioProtectionTravailleurs,
      diplomes: objectFiles.diplomes ? objectFiles.diplomes.path.replace("public/", "") : resultGet.diplomes,
      materiels: objectFiles.materiels ? objectFiles.materiels.path.replace("public/", "") : resultGet.materiels,
      contrat: objectFiles.contrat ? objectFiles.contrat.path.replace("public/", "") : resultGet.contrat,
      declaration: objectFiles.declaration ? objectFiles.declaration.path.replace("public/", "") : resultGet.declaration,
      fichedeposte: objectFiles.fichedeposte ? objectFiles.fichedeposte.path.replace("public/", "") : resultGet.fichedeposte,
      fichesynthetique: objectFiles.fichesynthetique ? objectFiles.fichesynthetique.path.replace("public/", "") : resultGet.fichesynthetique,
      avantagesennature: objectFiles.avantagesennature ? objectFiles.avantagesennature.path.replace("public/", "") : resultGet.avantagesennature,
      onboarding: objectFiles.onboarding ? objectFiles.onboarding.path.replace("public/", "") : resultGet.onboarding,
    }, { new: true }
    )
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
  }
});

//Création d'un nouveau collaborateur dans la BDD et recuperation par son prenom et nom //
app.post('/userCollaborateur', upload.any(), async (req, res) => {
  try {
    const user = await collaborateurModel.findOne({ prenom: req.body.prenom, nom: req.body.nom })
    if (user) {
      console.log("user")
      return res.status(200).json(user)
    } else {
      console.log("no user")
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
        specialitePratiquee: req.body.specialitePratiquee,
      });
      newCollaborateur.save(function (error, collaborateur) {
        res.status(200).json(collaborateur);
      });
    }
  } catch (error) {
    console.log("error")
  }
})

//Recuperer les fichiers dans public/uploads j'envoie au micro api 

app.post('/api', function (req, res) {
  const emailToFront = req.body.email
  const sousCategorie = req.body.prenom + req.body.nom
  const path = fs.readFileSync(`./public/uploads/${sousCategorie}`)
  const send = emailToFront + path
  res.status(200).json(send)
});


//GOOGLE API GOOGLE SHEET//

//CONVENTION COLLECTIF //
app.get("/conventionData", async function (req, res) {
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
        range: 'Convention collective',
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
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(3))
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})

// TEMP DE TRAVAIL //
app.get("/travailData", async function (req, res) {
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
        range: 'Temps de travail',
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
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(3))
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})


//NATURE TRAVAILLE //
app.get("/natureData", async function (req, res) {
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
        range: 'Nature relation de travail',
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
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(3))
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})




// COLLABORATEUR //


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
// Load client secrets from a local file.
app.get("/collaborateurData", async function (req, res) {
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
        range: 'Type User',
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
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(3))
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})

//ACTIVITER //
// Load client secrets from a local file.
app.get("/activiteData", async function (req, res) {
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
        range: 'Activité',
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
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(3))
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})




// ETABLISSEMENT // 

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
          // console.log(arrayData);
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
        // console.log(arrayData, "DATA")
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

      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(1, 10))//limite
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
        // console.log(arrayData, "DATA")
      } else {
        console.log('No data found.');
      }
      res.status(200).json(arrayData.slice(1))
    } catch (error) {
      console.log("error dans listMajor")
    }
  };
})


// TEST RECUPERATION GESTION PERSONEL//
// Création un google sheeat personnaliser avec =query(importrange("https://docs.google.com/spreadsheets/d/16Qezk7i2fUz24ldDR_pbPUptliLwzmu-t0fFyOgYm00/edit#gid=123987456";"Users!a:v");"select * where (Col19='gestionpersonnel' OR Col20 ='gestionpersonnel')")

app.post("/gestionPerso", async function (req, res) {
  const emailToFront = req.body.email
  console.log(emailToFront, ' EMAIL');

  fs.readFile('./public/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
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

  async function gestionPerso(auth) {
    var arrayData = []
    const sheets = google.sheets({ version: 'v4', auth });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: '1ycPx2bgZH7OcoRNA3J-1tOTcUQOdoSSkjqjqQmDlSWI',
        range: 'Data',
      })
      const rows = response.data.values;
      if (rows.length) {
        var names = rows;
        for (const i in names) {
          let object = {
            key: i,
            value: rows[i][2],
          }
          arrayData.push(object)
        }
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.log("error dans listMajor")
    }

    // Quand je me connecte par le front si mon email fait partie de ces cas je fais partie du gestion personnel sinon non//
    const isCollabo = arrayData.filter((element, i) => element.value === emailToFront)
    res.status(200).json({ isCollabo: isCollabo.length ? true : false })
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
