const UsersDAO = require('../dao/usersDAO');

class UserCtrl {
  static async addUser(req, res) {
    try {
      const userFromBody = req.body;
      console.log(userFromBody.username);
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

      if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
        return;
      }

      const insertResult = await UsersDAO.addUser(userFromBody);
      if (!insertResult.sucess) {
        error.email = insertResult.error;
      }

      const userFromDB = await UsersDAO.getUserByEmail(userFromBody);
      if (!userFromDB) {
        errors.general = 'Internal Error';
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
      }

      res.status(200).json({});
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
module.exports = UserCtrl;
