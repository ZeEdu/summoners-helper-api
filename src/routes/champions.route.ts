import express from 'express';

import ChampionsController from '../controllers/champions.controller';

const router = express.Router();

router.route('/data/:page').get(ChampionsController.getChampionsHeader);
router.route('/data/threats/:id').get(ChampionsController.getChampionsThreats);
router.route('/data/list').get(ChampionsController.getChampionsList);
router.route('/data/champion/:id').get(ChampionsController.getChampionInfo);

export default router;
