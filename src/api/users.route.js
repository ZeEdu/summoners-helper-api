const Router = require('express');

const UserCtrl = require('./users.controller');

const router = new Router();

router.route('/adduser').post(UserCtrl.addUser);
router.route('/deleteuser').delete(UserCtrl.deleteUser);

module.exports = router;
