const admin = require('firebase-admin');

const UsersDAO = require('../dao/usersDAO');

class UserCtrl {
   static async createProfile(req, res) {
      try {
         const userData = req.body;
         userData.joined = new Date();
         console.log(userData);
         const errors = {};
         if (userData.username.length <= 5) {
            errors.usernameLength = 'Username has less than 5 characters';
         }
         if (userData.username.length >= 30) {
            errors.usernameLength = 'Username has more than 30 characters';
         }
         const whiteSpace = new RegExp('/^S*$/');
         if (whiteSpace.test(userData.username)) {
            errors.usernameWhiteSpace = 'Username has White Spaces';
         }
         const alphanumeric = new RegExp('/^[a-zA-Z0-9-_]+$/');
         if (alphanumeric.test(userData.username)) {
            errors.usernameWhiteSpace = 'Username uses invalid characters';
         }
         const uidResult = await UsersDAO.getUserByUID(userData.uid);
         if (uidResult !== null) {
            errors.uid = 'UID being used';
         }
         const usernameResult = await UsersDAO.getUserByUsername(userData.username);
         if (usernameResult !== null) {
            errors.username = 'Username being used';
         }
         const emailResult = await UsersDAO.getUserByEmail(userData.email);
         if (emailResult !== null) {
            errors.email = 'Email being used';
         }
         if (Object.keys(errors).length > 0) {
            res.status(400).json(errors);
            return;
         }
         const insertResult = await UsersDAO.createProfile(userData);
         if (insertResult.success !== true) {
            errors.insert = insertResult.error;
         }
         const integrityResult = await UsersDAO.userIntegrity(userData);
         if (integrityResult) {
            errors.general = 'Internal Error';
         }
         if (Object.keys(errors).length > 0) {
            res.status(201).json({ err: errors });
            return;
         }
         res.status(200).json({ success: true });
      } catch (e) {
         res.status(500).json({ error: e });
      }
   }

   static async getProfileByUID(req, res) {
      try {
         const { uid } = req.params;
         const errors = {};

         const stmResult = await UsersDAO.getProfileByUID(uid);
         if (stmResult === null) {
            errors.message = 'Profile not Found';
         }
         if (Object.keys(errors) > 0) {
            res.status(4000).json(errors);
            return;
         }
         res.status(200).json(stmResult);
      } catch (e) {
         res.status(400).json({ err: e });
      }
   }

   static async getUserByUID(req, res) {
      try {
         const { uid } = req.params;
         const errors = {};
         const stmResult = await UsersDAO.getUserByUID(uid);
         if (stmResult == null) {
            errors.message = 'Username not found';
         }
         if (Object.keys(errors) > 0) {
            res.status(400).json(errors);
            return;
         }
         res.status(200).json(stmResult.username);
      } catch (e) {
         res.status(400).json({ error: e });
      }
   }

   static async deleteUser(req, res) {
      try {
         const { uid } = req.params;
         const errors = {};
         const userRecord = await (await admin.auth().getUser(uid)).toJSON();
         const { email } = userRecord;

         const uidResult = await UsersDAO.getUserByUID(uid);
         if (uidResult == null) {
            errors.uid = 'UID does not exist in the database';
         }

         const emailResult = await UsersDAO.getUserByEmail(email);
         if (emailResult == null) {
            errors.email = 'Email does not exist in the database';
         }

         if (Object.keys(errors) > 0) {
            res.status(400).json(errors);
            return;
         }
         await admin.auth().deleteUser(uid);
         await UsersDAO.deleteUser(uid, email);
         res.status(200).json({ deleted: true });
      } catch (e) {
         res.status(400).json({ err: e });
      }
   }
}
module.exports = UserCtrl;
