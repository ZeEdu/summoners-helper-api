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
            conn.query('SELECT USERNAME FROM USERPROFILE WHERE USERNAME = (?)', [
                req.params.username
            ])
                .then(rows => {
                    res.status(200).json(rows);
                    // res.status(200).json(rows);
                    conn.end();
                })
                .catch(err => {
                    res.send(err);
                });
        })
        .catch(err => {
            res.send(err);
        });
    // next();
});

module.exports = router;
//     mariadb
//         .createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//             port: process.env.DB_PORT,
//             database: process.env.DB_DATABASE
//         })
//         .then(conn => {
//             conn.query('SELECT * FROM USERPROFILE WHERE USERNAME = (?)', [req.params.username])
//                 .then(rows => {
//                     res.send(rows);
//                     console.log(rows);
//                     conn.end();
//                 })
//                 .catch(err => {
//                     res.send(err);
//                 });
//         })
//         .catch(err => {
//             res.send(err);
//         });
