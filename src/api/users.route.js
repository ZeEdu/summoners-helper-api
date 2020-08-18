const Router = require('express');

const UserCtrl = require('./users.controller');

const router = new Router();

router.route('/createprofile').post(UserCtrl.createProfile);
router.route('/getprofilebyuid/:uid').get(UserCtrl.getProfileByUID);
// router.route('/deleteuser').delete(UserCtrl.deleteUser);
router.route('/getuserbyuid/:uid').get(UserCtrl.getUserByUID);

module.exports = router;
