const Router = require('express');

const ChampionsController = require('./champions.controller');

const router = new Router();

router.route('/data/:page').get(ChampionsController.getChampionsHeader);

module.exports = router;
