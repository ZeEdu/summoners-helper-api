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

app.get('/validations/isusernametaken/:username', cors(), (req, res, next) => {
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
        .query('SELECT username FROM userprofile WHERE BINARY username = (?)', [
          req.params.username
        ])
        .then(rows => {
          res.status(200).json(rows);
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

app.get('/validations/isemailtaken/:email', cors(), (req, res, next) => {
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
        .query('SELECT email FROM userprofile WHERE BINARY email = (?)', [req.params.email])
        .then(rows => {
          res.status(200).json(rows);
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
