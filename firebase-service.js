const admin = require('firebase-admin');
require('dotenv').config();

// eslint-disable-next-line import/no-dynamic-require
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://summoners-helper.firebaseio.com',
});

module.exports = admin;
