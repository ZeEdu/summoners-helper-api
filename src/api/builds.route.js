const Router = require('express');

const BuildsController = require('./builds.controller');

const router = new Router();

router.route('/getbuildsbychampion/:championid/:page').get(BuildsController.getBuildsByChampion);
router.route('/getbuildsbyuser/:creatorid/:page').get(BuildsController.getBuildsByUser);
router.route('/getbuildbyid/:id').get(BuildsController.getBuildById);
router.route('/addbuild').post(BuildsController.addBuild);
router.route('/updatebuild').put(BuildsController.updateBuild);
router.route('/deletebuild/:buildid').delete(BuildsController.deleteBuild);

module.exports = router;
