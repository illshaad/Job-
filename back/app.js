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

app.post("/upload", upload.any(), async function (req, res) {
  let dataFront = {
    data: req.body,
    files: req.files
  }
  const { nom, prenom } = req.body
  console.log(req.body);


  // await fs.mkdir(`./public/uploads/${nom}_${prenom}`)
  // for (let i = 0; i < req.files.length; i++) {
  //   await fs.rename(`/public/uploads/${req.files[i].filename}`, `/public/uploads/${nom}_${prenom}`)
  // }

  let objectError = {};

  if (validator.isLength(req.body.prenom[{ min: 2 }])) {
    objectError.prenom = "S'il vous plait, le doit prenom n'est pas correct ou pas renseigner !";
  }
  if (validator.isLength(req.body.nom[{ min: 2 }])) {
    objectError.nom = "S'il vous plait, le doit nom n'est pas correct ou pas renseigner !";
  }

  if (validator.isLength(req.body.gender[{ min: 0 }])) {
    objectError.genre = "S'il vous plait, merci de préciser votre genre !";
  }
  if (validator.isLength(req.body.operateur[{ min: 2 }])) {
    objectError.operateur = "S'il vous plait, merci de préciser votre l'operateur !";
  }
  if (validator.isLength(req.body.correspondant[{ min: 3 }])) {
    objectError.correspondant = "S'il vous plait, merci de préciser votre correspondant !";
  }
  // if (validator.isEmail(req.body.email)) {
  //   objectError.email = "L'email n'est pas valide";
  // }
  res.status(400).json(objectError);
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
