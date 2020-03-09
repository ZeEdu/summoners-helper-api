const Router = require('express');

const validationCtrl = require('./validations.controller');

const router = new Router();

router.route('/isemailtaken/:email').get(validationCtrl.checkemail);
router.route('/isusernametaken/:username').get(validationCtrl.checkusername);

module.exports = router;
