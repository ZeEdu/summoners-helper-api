import * as admin from 'firebase-admin';
require('dotenv').config();

let serviceAccount: string | admin.ServiceAccount;

if (process.env.PRODUCTION === 'true') {
   if (process.env.PROD_GOOGLE_APPLICATION_CREDENTIALS) {
      serviceAccount = require(process.env.PROD_GOOGLE_APPLICATION_CREDENTIALS);

      admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
         databaseURL: 'https://summoners-helper.firebaseio.com',
      });
   }
} else {
   if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

      admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
         databaseURL: 'https://summoners-helper-dev.firebaseio.com',
      });
   }
}
export default admin;
