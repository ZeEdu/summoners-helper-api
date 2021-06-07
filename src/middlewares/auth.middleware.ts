/* eslint-disable prefer-destructuring */
import admin from '../firebase-service';

const getAuthToken = (req: any, _: any, next: any) => {
   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      req.authToken = req.headers.authorization.split(' ')[1];
   } else {
      req.authToken = null;
   }
   next();
};

export default function checkIfAuthenticated(req: any, res: any, next: any) {
   getAuthToken(req, res, async () => {
      try {
         const { authToken } = req;
         const userInfo = await admin.auth().verifyIdToken(authToken);
         req.authId = userInfo.uid;
         return next();
      } catch (e) {
         return res.status(401).send({ error: 'You are not authorized' });
      }
   });
}
