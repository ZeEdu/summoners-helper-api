require('dotenv').config(); // const express = require('express');
const mariadb = require('mariadb');

// const app = express();
// const port = 3000;

mariadb
    .createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    })
    .then(conn => {
        console.log('Connected Successfully');
        conn.query('SELECT NOW()')
            .then(rows => {
                console.log(rows);
                conn.end();
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => {
        console.log(err);
    });

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.listen(port, () => {
//     console.log(`Running on port ${port}`);
// });
