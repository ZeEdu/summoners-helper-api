const Router = require('express');

const BuildsController = require('./builds.controller');

const router = new Router();

router.route('/getbuildsbychampion/:championid').get(BuildsController.getBuildsByChampion);
router.route('/getbuildsbyuser/:creatorid').get(BuildsController.getBuildsByUser);
router.route('/addbuild').post(BuildsController.addBuild);
router.route('/updatebuild').put(BuildsController.updateBuild);
router.route('/deletebuild/:buildid').delete(BuildsController.deleteBuild);

module.exports = router;