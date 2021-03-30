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
}

module.exports = ChampionsController;
