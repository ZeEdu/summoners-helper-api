const Router = require('express');

const ValidationCtrl = require('./validations.controller');

const router = new Router();

router.route('/isemailtaken/:email').get(ValidationCtrl.checkemail);
router.route('/isusernametaken/:username').get(ValidationCtrl.checkusername);

module.exports = router;
