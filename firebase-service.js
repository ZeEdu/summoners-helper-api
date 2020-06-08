var admin = require('firebase-admin');
require('dotenv').config();

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://summoners-helper.firebaseio.com'
});

module.exports = admin;
