import { Request, Response } from 'express';

import BuildsDAO from '../dao/buildsDAO';
import ChampionDataDAO from '../dao/championDataDAO';
import ChampionsDataDAO from '../dao/championDataDAO';

class ChampionsController {
   static async getChampionInfo(req: Request, res: Response) {
      const { id } = req.params;

      try {
         const stmRes = await ChampionDataDAO.getChampion(id);
         if (!stmRes) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }
         res.status(200).json(stmRes);
      } catch (err) {
         console.error("Something went't wrong", err);
         res.status(400).json({ error: err });
      }
   }
   static async getChampionsHeader(req: Request, res: Response) {
      const { page } = req.params;
      try {
         const championHeaders = await ChampionsDataDAO.getChampions(Number(page));
         if (!championHeaders) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }
         res.status(200).json(championHeaders);
      } catch (e) {
         console.error("Something went't wrong", e);
         res.status(400).json({ error: e });
      }
   }

   static async getChampionsList(req: Request, res: Response) {
      const page = 1;
      console.log('entrou em getChampionsList');
      let list = [];

      try {
         const stmResponse = await ChampionsDataDAO.getChampions(page);
         list = [...stmResponse];

         //  do {
         //     championList = [...championList, ...list];
         //     page += 1;
         //     console.log('list.length', list.length);
         //     console.log(championList);
         //  } while (list.length === 20);

         res.status(200).json(list);
      } catch (e) {
         console.error("Something went't wrong", e);
         res.status(400).json({ error: e });
      }
   }

   static async getChampionsThreats(req: Request, res: Response) {
      const { id } = req.params;
      try {
         const guide = await BuildsDAO.getBuildById(id);

         if (!guide) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }

         const threats = guide.threats.map((threat: any) => threat.threat);

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

export default ChampionsController;
