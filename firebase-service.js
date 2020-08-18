/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const admin = require('firebase-admin');
require('dotenv').config();

let serviceAccount;
if (process.env.PRODUCTION === 'true') {
   serviceAccount = require(process.env.PROD_GOOGLE_APPLICATION_CREDENTIALS);

   admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://summoners-helper.firebaseio.com',
   });
} else {
   serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

   admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://summoners-helper-dev.firebaseio.com',
   });
}
module.exports = admin;
