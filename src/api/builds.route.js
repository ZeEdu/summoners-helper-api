const Router = require('express');

const BuildsController = require('./builds.controller');

const router = new Router();

router.route('/getbuildsbychampion/:championid/:page').get(BuildsController.getBuildsByChampion);
router.route('/getbuildsbyuser/:creatoruid/:page').get(BuildsController.getBuildsByUser);
router.route('/getbuildbyid/:id').get(BuildsController.getBuildById);
router.route('/getfullguidebyid/:id').get(BuildsController.getFullGuideById);

router.route('/addbuild').post(BuildsController.addBuild);
router.route('/updatebuild').put(BuildsController.updateBuild);
router.route('/deletebuilds/:uid').delete(BuildsController.deleteBuildsByUID);
router.route('/deletebuild/:buildid').delete(BuildsController.deleteBuild);

module.exports = router;
