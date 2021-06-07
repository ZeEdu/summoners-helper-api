import { Request, Response } from 'express';
import admin from '../firebase-service';
import fs from 'fs';
import path from 'path';

import BuildsDAO from '../dao/buildsDAO';
import { IGuide } from '../interfaces/Guide';
import UsersDAO from '../dao/usersDAO';
import { UserProfile } from '../interfaces/UserProfile';
import { Rune, RunesReforged } from '../interfaces/RunesReforgedJSON';
import { SummonerJSON } from '../interfaces/SummonerJSON';
import { ItemJSON } from '../interfaces/ItemJSON';

class BuildsController {
   static async getFullGuideById(req: Request, res: Response) {
      const guideId = req.params.id;
      try {
         const guide: IGuide = await BuildsDAO.getBuildById(guideId);
         if (!guide) {
            res.status(500).json({ error: 'Internal error, please try again later' });
         }
         const userData: UserProfile = await UsersDAO.getProfileByUID(guide.userUID);

         const rawRunes = fs.readFileSync(
            path.join(__dirname.split('src')[0], 'public/10.7.1/data/en_US/runesReforged.json'),
            'utf8'
         );
         const parsedRunes: RunesReforged[] = JSON.parse(rawRunes);

         const primaryRune = parsedRunes.find((item) => item.key === guide.runes.primaryRune);
         const secondaryRune = parsedRunes.find((item) => item.key === guide.runes.secondaryRune);
         let allPrimaryRunes: Rune[] = [];
         let allSecondaryRunes: Rune[] = [];

         if (primaryRune) {
            primaryRune.slots.forEach((item) => {
               allPrimaryRunes = [...allPrimaryRunes, ...item.runes];
            });
         }

         if (secondaryRune) {
            secondaryRune.slots.forEach((item) => {
               allSecondaryRunes = [...allSecondaryRunes, ...item.runes];
            });
         }

         const primaryRunesObj: { [key: string]: Rune } = allPrimaryRunes.reduce(
            (obj, item) => ({ ...obj, [item['key']]: item }),
            {}
         );

         const secondaryRunesObj: { [key: string]: Rune } = allSecondaryRunes.reduce(
            (obj, item) => ({ ...obj, [item['key']]: item }),
            {}
         );

         const firstPrimary = primaryRunesObj[guide.runes.primarySlots.first];

         const secondPrimary = primaryRunesObj[guide.runes.primarySlots.second];

         const thirdPrimary = primaryRunesObj[guide.runes.primarySlots.third];

         if (guide.runes.primarySlots.fourth) {
            const fourthPrimary = primaryRunesObj[guide.runes.primarySlots.fourth];
         }

         const firstSecondary = secondaryRunesObj[guide.runes.secondarySlots.first];

         const secondSecondary = secondaryRunesObj[guide.runes.secondarySlots.second];

         const thirdSecondary = secondaryRunesObj[guide.runes.secondarySlots.third];

         const rawSummoner = fs.readFileSync(
            path.join(__dirname.split('src')[0], 'public/10.7.1/data/en_US/summoner.json'),
            'utf8'
         );

         const parsedSummoner: SummonerJSON = JSON.parse(rawSummoner);

         const firstSpell = parsedSummoner.data[guide.spells.first];
         const secondSpell = parsedSummoner.data[guide.spells.second];

         const rawItemsJSON = fs.readFileSync(
            path.join(__dirname.split('src')[0], 'public/10.7.1/data/en_US/item.json'),
            'utf8'
         );
         const parsedItems: ItemJSON = JSON.parse(rawItemsJSON);

         res.status(200).json(guide.itemsBlock[0].itemArray[0].item);

         //  res.status(200).json({ message: 'success' });
      } catch (e) {
         console.error('Error occurred while removig the guide', e);
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
