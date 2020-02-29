require('dotenv').config();
const express = require('express');
const mariadb = require('mariadb');

const router = express.Router();

router.get('/isusernametaken/:username', (req, res, next) => {
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
          res.status(500).json({ message: 'Something Went Wrong!', error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ message: 'Something Went Wrong!', error: err });
    });
});

router.get('/isemailtaken/:email', (req, res, next) => {
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
          if (rows.length === 0) {
            res.status(200).json({});
          } else {
            res.status(200).json({ message: 'Email Taken' });
          }
          conn.end();
        })
        .catch(err => {
          res.status(500).json({ message: err });
        });
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
