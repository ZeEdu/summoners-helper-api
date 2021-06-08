import { Request, Response } from 'express';

import BuildsDAO from '../dao/buildsDAO';
import ChampionDataDAO from '../dao/championDataDAO';
import ChampionsDataDAO from '../dao/championDataDAO';
import getChampionData from '../utils/Champions/getChampionData';
import getChampionsList from '../utils/Champions/getChampionsList';

class ChampionsController {
   static async getChampion(req: Request, res: Response) {
      const { id } = req.params;

      try {
         const stmRes = getChampionData(id);

         res.status(200).json(stmRes);
      } catch (err) {
         console.error("Something went't wrong", err);
         res.status(400).json({ error: err });
      }
   }
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
      try {
         res.status(200).json(getChampionsList());
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
