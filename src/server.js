const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const validations = require('../src/api/validations.route');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/validations/', validations);
app.use('/', (req, res) => res.status(200).json({ status: 'Server is Running' }));
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

module.exports = app;
