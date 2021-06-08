import { Request, Response } from 'express';
import admin from '../firebase-service';

import BuildsDAO from '../dao/buildsDAO';
import { IGuide } from '../interfaces/Guide';

import { IFullGuide } from '../interfaces/FullGuide';

import { getUsername } from '../utils/getUsername';
import { genItemBlock } from '../utils/genItemBlock';

import { genBonusSlots } from '../utils/genBonusSlots';
import { genSpells } from '../utils/genSpells';
import { genRunes } from '../utils/genRunes';

class BuildsController {
   static async getFullGuideById(req: Request, res: Response) {
      const guideId = req.params.id;
      try {
         const guide: IGuide = await BuildsDAO.getBuildById(guideId);
         if (!guide) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }

         const fullGuide: IFullGuide = {
            ...guide,
            username: await getUsername(guide.userUID),
            itemsBlock: genItemBlock(guide.itemsBlock),
            bonus: genBonusSlots(guide.bonus),
            spells: genSpells(guide.spells),
            runes: genRunes(guide.runes),
         };
         res.status(200).json(fullGuide);
      } catch (e) {
         console.error('Error occurred:', e);
         res.status(400).json({ error: e });
      }
   }

   static async getBuildById(req: Request, res: Response) {
      try {
         const guide: IGuide = await BuildsDAO.getBuildById(req.params.id);

         if (!guide) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }
         res.status(200).json(guide);
      } catch (e) {
         console.error('Error occurred while removig the guide', e);
         res.status(400).json({ error: e });
      }
   }

   static async addBuild(req: Request, res: Response) {
      try {
         const Guide = req.body;
         Guide.createdOn = Date.now();
         Guide.patch = process.env.PATCH_VERSION;
         const insertResult = await BuildsDAO.addBuild(Guide);
         if (insertResult.success !== true) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }
         res.status(201).json(insertResult.success);
      } catch (e) {
         res.status(500).json({ error: e });
      }
   }

   static async updateBuild(req: Request, res: Response) {
      try {
         const Guide = req.body;
         Guide.updatedOn = Date.now();
         Guide.patch = process.env.PATCH_VERSION;
         const updateResult = await BuildsDAO.updateBuild(Guide);
         res.status(200).json(updateResult);
      } catch (e) {
         res.status(400).json(e);
      }
   }

   static async getBuildsByChampion(req: Request, res: Response) {
      try {
         const championID = req.params.championid;
         const { page } = req.params;
         const findResult = await BuildsDAO.getBuildsByChampion(championID, Number(page));
         res.status(200).json(findResult);
      } catch (e) {
         res.status(400).json(e);
      }
   }

   static async getBuildsByUser(req: Request, res: Response) {
      try {
         const { creatoruid, page } = req.params;
         console.log('User UID', creatoruid);
         const findResult = await BuildsDAO.getBuildsByUser(creatoruid, Number(page));
         res.status(200).json(findResult);
      } catch (e) {
         res.status(400).json(e);
      }
   }

   static async deleteBuildsByUID(req: Request, res: Response) {
      try {
         const { uid } = req.params;
         const deleteResult = await BuildsDAO.deleteBuildsFromUser(uid);
         if (deleteResult.success !== true) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }
         res.status(200).json({ deleteResult });
      } catch (e) {
         console.error('Error occurred while removig the guide', e);
         res.status(400).json({ error: e });
      }
   }

   static async deleteBuild(req: Request, res: Response) {
      try {
         const buildID = req.params.buildid;
         const deleteResult = await BuildsDAO.deleteBuild(buildID);
         if (deleteResult.success !== true) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }
         res.status(200).json({ deleteResult });
      } catch (e) {
         console.error('Error occurred while removig the guide', e);
         res.status(400).json({ error: e });
      }
   }
}
export default BuildsController;
