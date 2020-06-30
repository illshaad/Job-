const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require("multer");
const moment = require('moment');
const fs = require('fs').promises
const validator = require('validator')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors = require('cors')
const app = express();
const { body, validationResult } = require('express-validator');

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

app.post("/upload", upload.any(), [
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
  res.status(200).json({ Sauvegarde: 'ok' });
});

//Verification rh
app.get('/verificationRh', function (req, res, next) {
  res.render('rh ok');
});
//Recuperation information Save BDD
app.post('/recuperationInformations', function (req, res, next) {
  res.render('Verification Rh');
});

app.get('/recuperationInformationCollaborateur', function (req, res, next) {
  res.render('Verification Rh');
});

// Tabeleau
app.get('/recuperationTousCollaborateur', function (req, res, next) {
  res.render('Verification TousCollaborateur Ok');
});

app.post('/ajouterDocumentRH', function (req, res, next) {
  res.render('ajouterOk');
});


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
