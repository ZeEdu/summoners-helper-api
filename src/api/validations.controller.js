const ValidationsDAO = require('../dao/validationsDAO');

class ValidationCtrl {
  static async checkemail(req, res) {
    try {
      const qrryRes = await ValidationsDAO.getUserByEmail(req.params.email);
      if (qrryRes == null) {
        res.status(200).json({});
      } else {
        res.status(200).json({ message: 'Username Taken' });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async checkusername(req, res) {
    try {
      const qrryRes = await ValidationsDAO.getUserNyUsername(req.params.username);
      console.log(qrryRes);
      res.status(200).json({ res: qrryRes });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}

module.exports = ValidationCtrl;
