/* eslint-disable prefer-destructuring */
const admin = require('../../firebase-service');

const getAuthToken = (req, _, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};

module.exports = function checkIfAuthenticated(req, res, next) {
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
};
