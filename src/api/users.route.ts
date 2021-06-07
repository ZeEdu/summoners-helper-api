import express from 'express';

import UserCtrl from './users.controller';

const router = express.Router();

router.route('/createprofile').post(UserCtrl.createProfile);
router.route('/getprofilebyuid/:uid').get(UserCtrl.getProfileByUID);
router.route('/deleteuser/:uid').delete(UserCtrl.deleteUser);
router.route('/getuserbyuid/:uid').get(UserCtrl.getUserByUID);

export default router;
