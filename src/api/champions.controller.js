const BuildsDAO = require('../dao/buildsDAO');
const ChampionsDataDAO = require('../dao/championDataDAO');

class ChampionsController {
   static async getChampionsHeader(req, res) {
      const { page } = req.params;
      try {
         const championHeaders = await ChampionsDataDAO.getChampions(page);
         if (!championHeaders) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }
         res.status(200).json(championHeaders);
      } catch (e) {
         console.error("Something went't wrong", e);
         res.status(400).json({ error: e });
      }
   }

   static async getChampionsList(req, res) {
      const page = 1;
      const championList = [];
      console.log('entrou em getChampionsList');
      let list = [];

      try {
         list = ChampionsDataDAO.getChampions(page);

         console.log(list);

         //  do {
         //     championList = [...championList, ...list];
         //     page += 1;
         //     console.log('list.length', list.length);
         //     console.log(championList);
         //  } while (list.length === 20);

         res.status(200).json(championList);
      } catch (e) {
         console.error("Something went't wrong", e);
         res.status(400).json({ error: e });
      }
   }

   static async getChampionsThreats(req, res) {
      const { id } = req.params;
      try {
         const guide = await BuildsDAO.getBuildById(id);

         if (!guide) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }

         const threats = guide.threats.map((threat) => threat.threat);

         const championThreats = await ChampionsDataDAO.getThreats(threats);
         if (!championThreats) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }

         res.status(200).json(championThreats);
      } catch (e) {
         console.error("Something went't wrong", e);
         res.status(400).json({ error: e });
      }
   }
}

module.exports = ChampionsController;
