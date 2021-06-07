import { Request, Response } from 'express';

import BuildsDAO from '../dao/buildsDAO';

class BuildsController {
   static async getFullGuideById(req: Request, res: Response) {
      try {
         res.status(200).json({ message: 'Sucess' });
      } catch (e) {
         console.error('Error occurred while removig the guide', e);
         res.status(400).json({ error: e });
      }
   }

   static async getBuildById(req: Request, res: Response) {
      try {
         const guide = await BuildsDAO.getBuildById(req.params.id);
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
