require('dotenv').config();
const express = require('express');
const mariadb = require('mariadb');

const router = express.Router();

router.post('/newuser', (req, res, next) => {
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
          'INSERT INTO USER_PROFILE (USER_STR_UID, USER_STR_NAME, USER_STR_EMAIL, USER_DATE_JOINED) VALUES ((?), (?), (?), CURDATE());',
          [req.body.uid, req.body.username, req.body.email]
        )
        .then(query => {
          res.status(200).json({ message: 'User created successfully' });
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
