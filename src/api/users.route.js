const Router = require('express');

const UserCtrl = require('./users.controller');

const router = new Router();

router.route('/addUser').post(UserCtrl.addUser);
router.route('/getUser').get();
router.route('/deleteUser').delete();

module.exports = router;
