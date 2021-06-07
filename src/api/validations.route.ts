import express from 'express';

import ValidationCtrl from './validations.controller';

const router = express.Router();

router.route('/isemailtaken/:email').get(ValidationCtrl.checkemail);
router.route('/isusernametaken/:username').get(ValidationCtrl.checkusername);

export default router;
