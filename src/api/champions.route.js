const Router = require('express');

const ChampionsController = require('./champions.controller');

const router = new Router();

router.route('/data/:page').get(ChampionsController.getChampionsHeader);
router.route('/data/threats/:id').get(ChampionsController.getChampionsThreats);
router.route('/data/list').get(ChampionsController.getChampionsList);

module.exports = router;
