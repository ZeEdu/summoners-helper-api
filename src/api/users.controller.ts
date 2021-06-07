import { Request, Response } from 'express';
import admin from 'firebase-admin';

import UsersDAO from '../dao/usersDAO';

class UserCtrl {
   static async createProfile(req: Request, res: Response) {
      try {
         const userData = req.body;
         userData.joined = new Date();

         let errors = [];
         if (userData.username.length <= 5) {
            errors.push({ usernameLength: 'Username has less than 5 characters' });
         }
         if (userData.username.length >= 30) {
            errors.push({ usernameLength: 'Username has more than 30 characters' });
         }
         const whiteSpace = new RegExp('/^S*$/');
         if (whiteSpace.test(userData.username)) {
            errors.push({ usernameWhiteSpace: 'Username has White Spaces' });
         }
         const alphanumeric = new RegExp('/^[a-zA-Z0-9-_]+$/');
         if (alphanumeric.test(userData.username)) {
            errors.push({ usernameWhiteSpace: 'Username uses invalid characters' });
         }
         const uidResult = await UsersDAO.getUserByUID(userData.uid);
         if (uidResult !== null) {
            errors.push({ uid: 'UID being used' });
         }
         const usernameResult = await UsersDAO.getUserByUsername(userData.username);
         if (usernameResult !== null) {
            errors.push({ username: 'Username being used' });
         }
         const emailResult = await UsersDAO.getUserByEmail(userData.email);
         if (emailResult !== null) {
            errors.push({ email: 'Email being used' });
         }
         if (Object.keys(errors).length > 0) {
            let errorObject = errors.reduce((obj, item) => Object.assign(obj, { item }, {}));

            res.status(400).json(errorObject);
            return;
         }
         const insertResult = await UsersDAO.createProfile(userData);
         if (insertResult.success !== true) {
            errors.push({ insert: insertResult.error });
         }
         const integrityResult = await UsersDAO.userIntegrity(userData);
         if (integrityResult) {
            errors.push({ general: 'Internal Error' });
         }
         if (errors.length > 0) {
            let errorObject = errors.reduce((obj, item) => Object.assign(obj, { item }, {}));
            res.status(201).json({ errorObject });
            return;
         }

         res.status(200).json({ success: true });
      } catch (e) {
         res.status(500).json({ error: e });
      }
   }

   static async getProfileByUID(req: Request, res: Response) {
      try {
         const { uid } = req.params;
         let errors = [];
         const stmResult = await UsersDAO.getProfileByUID(uid);
         if (stmResult === null) {
            errors.push({ message: 'Profile not Found' });
         }
         if (errors.length > 0) {
            let errorRes = errors.reduce((obj, item) => Object.assign(obj, { item }, {}));
            res.status(4000).json(errorRes);
            return;
         }
         res.status(200).json(stmResult);
      } catch (e) {
         res.status(400).json({ err: e });
      }
   }

   static async getUserByUID(req: Request, res: Response) {
      try {
         const { uid } = req.params;
         let errors = [];
         const stmResult = await UsersDAO.getUserByUID(uid);
         if (stmResult == null) {
            errors.push({ message: 'Username not found' });
         }
         if (errors.length > 0) {
            let errorRes = errors.reduce((obj, item) => Object.assign(obj, { item }, {}));
            res.status(400).json(errorRes);
            return;
         }
         res.status(200).json(stmResult.username);
      } catch (e) {
         res.status(400).json({ error: e });
      }
   }

   static async deleteUser(req: Request, res: Response) {
      try {
         const { uid } = req.params;
         const errors = [];
         const userRecord = await admin.auth().getUser(uid);
         const { email } = userRecord;

         if (!email) {
            res.status(400).json({ email: 'user not found' });
            return;
         }

         const uidResult = await UsersDAO.getUserByUID(uid);
         if (uidResult === null) {
            errors.push({ uid: 'UID does not exist in the database' });
         }

         const emailResult = await UsersDAO.getUserByEmail(email);
         if (emailResult === null) {
            errors.push({ email: 'Email does not exist in the database' });
         }

         if (errors.length > 0) {
            let errorRes = errors.reduce((obj, item) => Object.assign(obj, { item }, {}));
            res.status(400).json(errorRes);
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
export default UserCtrl;
