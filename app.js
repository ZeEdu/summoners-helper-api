const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const validationRoutes = require('./api/routes/validations');

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/validations', validationRoutes);

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

// app.use((req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Authorization'
//     );
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     console.log('not getting here');
// });

// const whitelist = [
// 'capacitor://localhost',
// 'ionic://localhost',
// 'http://localhost',
// 'http://localhost:8080',
// 'http://localhost:3306',
// 'http://localhost:8100',
// 'http://localhost:4200'
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// };

// app.options('*', cors(corsOptions));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.json({ status: 'Sever is Running' });
// });

// app.get('/validation/isusernametaken/:username', cors(corsOptions), (req, res) => {
//     // Start mariadb connection
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
// });

// app.get('/validation/isemailtaken/:email', (req, res) => {
//     // Start mariadb connection
//     mariadb
//         .createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//             port: process.env.DB_PORT,
//             database: process.env.DB_DATABASE
//         })
//         .then(conn => {
//             conn.query('SELECT * FROM USERPROFILE WHERE EMAIL = (?)', [req.params.email])
//                 .then(rows => {
//                     res.send(rows);
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

// app.listen(port, () => {
//     console.log(`Running on port ${port}`);
// });
