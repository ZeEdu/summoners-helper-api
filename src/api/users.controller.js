const UsersDAO = require('../dao/usersDAO');

class UserCtrl {
  static async addUser(req, res) {
    try {
      const userFromBody = req.body;
      let errors = {};

      if (userFromBody.username.length <= 5) {
        errors.usernameLength = 'Username has less than 5 characters';
      }

      if (userFromBody.username.length >= 30) {
        errors.usernameLength = 'Username has more than 30 characters';
      }

      const whiteSpace = new RegExp('/^S*$/');
      if (whiteSpace.test(userFromBody.username)) {
        errors.usernameWhiteSpace = 'Username has White Spaces';
      }

      const alphanumeric = new RegExp('/^[a-zA-Z0-9-_]+$/');
      if (alphanumeric.test(userFromBody.username)) {
        errors.usernameWhiteSpace = 'Username uses invalid characters';
      }

      const uidResult = await UsersDAO.getUserByUID(userFromBody.uid);
      if (uidResult !== null) {
        errors.uid = 'UID being used';
      }

      const usernameResult = await UsersDAO.getUserByUsername(userFromBody.username);
      if (usernameResult !== null) {
        errors.username = 'Username being used';
      }

      const emailResult = await UsersDAO.getUserByEmail(userFromBody.email);
      if (emailResult !== null) {
        errors.email = 'Email being used';
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
        return;
      }

      const insertResult = await UsersDAO.addUser(userFromBody);
      if (insertResult.success !== true) {
        errors.insert = insertResult.error;
      }

      const integrityResult = await UsersDAO.userIntegrity(userFromBody);
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

  static async getUserByUID(req, res) {
    console.log('Entrou em getUserByUID');

    try {
      const UID = req.params.uid;
      let errors = {};

      const stmResult = await UsersDAO.getUserByUID(UID);
      if (stmResult == null) {
        errors.message = 'Username not found';
      }

      if (Object.keys(errors) > 0) {
        res.status(400).json(errors);
        return;
      }
      res.status(200).json(stmResult.username);
    } catch (e) {
      return { e };
    }
  }

  static async deleteUser(req, res) {
    try {
      const userData = req.body;
      let errors = {};

      const uidResult = await UsersDAO.getUserByUID(userData.uid);
      if (uidResult == null) {
        errors.uid = 'UID does not exist in the database';
      }

      const usernameResult = await UsersDAO.getUserByUsername(userData.username);
      if (usernameResult == null) {
        errors.username = 'Username does not exist in the database';
      }

      const emailResult = await UsersDAO.getUserByEmail(userData.email);
      if (emailResult == null) {
        errors.email = 'Email does not exist in the database';
      }

      if (Object.keys(errors) > 0) {
        res.status(400).json(errors);
        return;
      }

      const deleteResult = await UsersDAO.deleteUser(userData);
      console.log(deleteResult);

      res.status(200).json({ deleted: true });
    } catch (e) {
      res.status(400).json({ err: e });
    }
  }
}
module.exports = UserCtrl;
