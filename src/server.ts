import express, { Request, Response } from 'express';
// const express = require('express');
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import checkIfAuthenticated from './middlewares/auth.middleware';

import validations from './api/validations.route';
import users from './api/users.route';
import builds from './api/builds.route';
import champions from './api/champions.route';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/v1/validations/', validations);
app.use('/api/v1/users/', users);
app.use('/api/v1/builds/', checkIfAuthenticated, builds);
// app.use('/api/v1/champions/', checkIfAuthenticated, champions);
app.use('/api/v1/champions/', champions);
app.use('/', (_: Request, res: Response) => res.status(200).json({ status: 'Server is Running' }));
app.use('*', (_: Request, res: Response) => res.status(404).json({ error: 'not found' }));

export default app;
// module.exports = app;
