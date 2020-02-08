require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ xtended: false }));

app.use(bodyParser.json());

const users = [
    { name: 'Eduardo', email: 'eduardo@gmail.com' },
    { name: 'Carlos', email: 'carlos@gmail.com' }
];
