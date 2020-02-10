require('dotenv').config();
const mariadb = require('mariadb');
const express = require('express');

const router = express.Router();

router.get('/isusernametaken/:username', (req, res, next) => {
    try {
        const user = req.params.username;
        res.status(200).json({ message: user });
    } catch (err) {
        res.status(202).send(err);
    }
});

// router.get('/isusernametaken/:username', (req, res, next) => {
//     mariadb
//         .createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//             port: process.env.DB_PORT,
//             database: process.env.DB_DATABASE
//         })
//         .then(conn => {
//             conn.query('SELECT USERNAME FROM USERPROFILE WHERE USERNAME = (?)', [
//                 req.params.username
//             ])
//                 .then(rows => {
//                     console.log(rows);
//                     // console.log(typeof rows);
//                     // const entries = Object.entries(rows);
//                     // const popped = entries.pop();
//                     // console.log(`Popped: ${popped}`);
//                     // console.log(entries);
//                     res.status(200).json(rows);
//                     conn.end();
//                 })
//                 .catch(err => {
//                     res.send(err);
//                 });
//         })
//         .catch(err => {
//             res.send(err);
//         });
// });

module.exports = router;
