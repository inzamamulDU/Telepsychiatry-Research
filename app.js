const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const compress = require('compression');
const flash = require('connect-flash');
const session = require('express-session');
const helmet = require('helmet');
const passport = require('passport');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

mongoose.connect(
  process.env.mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  () => console.log('connected to database!')
);

app.use(express.static('client'));
app.use(express.static('data'));

const multer = require('multer');
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).single('image')
);

if (process.env.NODE_ENV === 'development') app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.alertMessage = req.flash('alertMessage');
  next();
});
app.use(compress());
app.use(helmet());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at port: ${port}`));
