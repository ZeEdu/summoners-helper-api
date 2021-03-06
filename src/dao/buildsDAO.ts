const ObjectId = require('mongodb').ObjectID;

let builds: any;

class BuildsDAO {
   static async injectDB(conn: any) {
      if (builds) {
         return;
      }
      try {
         builds = await conn.db(process.env.SUMMONERS_NS).collection('builds');
      } catch (e) {
         console.error(`Unable to establish collection handles in build: ${e}`);
      }
   }

   static async addBuild(buildBody: any) {
      try {
         await builds.insertOne({
            userUID: buildBody.userUID,
            name: buildBody.name,
            champion: buildBody.champion,
            role: buildBody.role,
            createdOn: buildBody.createdOn,
            patch: buildBody.patch,
            runes: buildBody.runes,
            runesDescription: buildBody.runesDescription,
            bonus: buildBody.bonus,
            bonusDescription: buildBody.bonusDescription,
            spells: buildBody.spells,
            spellsDescription: buildBody.spellsDescription,
            itemsBlock: buildBody.itemsBlock,
            itemsDescription: buildBody.itemsDescription,
            abilitiesProgression: buildBody.abilitiesProgression,
            abilitiesProgressionDescription: buildBody.abilitiesProgressionDescription,
            threats: buildBody.threats,
            introduction: buildBody.introduction,
         });
         return { success: true };
      } catch (e) {
         console.error(`Error occurred while adding new Build, ${e}`);
         return { error: e };
      }
   }

   static async updateBuild(buildBody: any) {
      try {
         await builds.updateOne(
            {
               _id: ObjectId(buildBody._id),
            },
            {
               $set: {
                  userUID: buildBody.userUID,
                  name: buildBody.name,
                  champion: buildBody.champion,
                  introduction: buildBody.introduction,
                  role: buildBody.role,
                  createdOn: buildBody.createdOn,
                  updatedOn: buildBody.updatedOn,
                  patch: buildBody.patch,
                  runes: buildBody.runes,
                  runesDescription: buildBody.runesDescription,
                  bonus: buildBody.bonus,
                  bonusDescription: buildBody.bonusDescription,
                  spells: buildBody.spells,
                  spellsDescription: buildBody.spellsDescription,
                  itemsBlock: buildBody.itemsBlock,
                  itemsDescription: buildBody.itemsDescription,
                  abilitiesProgression: buildBody.abilitiesProgression,
                  abilitiesProgressionDescription: buildBody.abilitiesProgressionDescription,
                  threats: buildBody.threats,
               },
            },
            {
               upsert: true,
            }
         );
         return { success: true };
      } catch (e) {
         return { e };
      }
   }

   static async getBuildById(id: string) {
      try {
         return builds.findOne({ _id: new ObjectId(id) });
      } catch (e) {
         return { e };
      }
   }

   static async getBuildsByUser(uid: string, page: number) {
      const filter = { userUID: uid };
      const projection = {
         _id: 1,
         champion: 1,
         name: 1,
         patch: 1,
      };
      try {
         const findResult = await builds
            .find(filter)
            .project(projection)
            .limit(10)
            .skip(page * 10);
         return findResult.toArray();
      } catch (e) {
         return { e };
      }
   }

   static async getBuildsByChampion(championID: string, page: number) {
      try {
         const filter = { champion: championID };
         const projection = {
            _id: 1,
            userUID: 1,
            champion: 1,
            name: 1,
            patch: 1,
         };
         const findResult = await builds
            .find(filter)
            .project(projection)
            .limit(10)
            .skip(page * 10);
         return findResult.toArray();
      } catch (e) {
         return { e };
      }
   }

   static async deleteBuild(buildID: string) {
      try {
         const id = new ObjectId(buildID);
         await builds.deleteOne({ _id: id });
         return { success: true };
      } catch (e) {
         console.error(`Error occurred while removig the guide, ${e}`);
         return { error: e };
      }
   }

   static async deleteBuildsFromUser(uid: string) {
      try {
         await builds.deleteMany({ userUID: uid });
         return { success: true };
      } catch (e) {
         console.error(`Error occurred while removig the guide, ${e}`);
         return { error: e };
      }
   }
}

export default BuildsDAO;
