require('dotenv').config();
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const validationRoutes = require('./api/routes/validations');

const app = express();

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
};

app.options('*', cors(corsOptions));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get('/validations/isusernametaken/:username', (req, res, next) => {
  mariadb
    .createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    })
    .then(conn => {
      conn
        .query('SELECT USER_STR_NAME FROM USER_PROFILE WHERE USER_STR_NAME = (?)', [
          req.params.username
        ])
        .then(rows => {
          if (rows.length === 0) {
            res.status(200).json({});
          } else {
            res.status(200).json({ message: 'Username Taken' });
          }
          conn.end();
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      res.send(err);
    });
});

app.get('/validations/isemailtaken/:email', (req, res, next) => {
  mariadb
    .createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    })
    .then(conn => {
      conn
        .query('SELECT USER_STR_EMAIL FROM USER_PROFILE WHERE USER_STR_EMAIL = (?)', [
          req.params.email
        ])
        .then(rows => {
          res.status(200).json(rows);
          conn.end();
        })
        .catch(err => res.status(400).json({ message: err }));
    })
    .catch(err => res.status(400).json({ message: err }));
});

app.post('/signupuser', (req, res, next) => {
  mariadb
    .createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    })
    .then(conn => {
      conn
        .query(
          'insert into USER_PROFILE (USER_STR_UID, USER_STR_NAME, USER_STR_EMAIL, USER_DATE_JOINED) values ((?), (?), (?), curdate())',
          [req.body.uid, req.body.username, req.body.email]
        )
        .then(querry => {
          res.status(200).json({ message: 'success' });
        })
        .catch(err => res.status(400).json({ message: err }));
    })
    .catch(err => res.status(400).json({ message: err }));
});
// Handling Errors
app.use((res, req, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
  next();
});

// Exporting App
module.exports = app;
