let championsData: any;

class ChampionDataDAO {
   static async injectDB(conn: any) {
      if (championsData) {
         return;
      }
      try {
         championsData = await conn.db(process.env.SUMMONERS_NS).collection('championData');
      } catch (e) {
         console.error(`Unable to estabilish collection handles in ChampionData:: ${e}`);
      }
   }

   static async getChampion(id: string) {
      const query = {
         id: id,
      };
      try {
         return championsData.findOne(query);
      } catch (err) {
         console.error(`Error occurred while fetching requested data, ${err}`);
         return { error: err };
      }
   }

   static async getThreats(threats: any) {
      const query = {
         id: {
            $in: threats,
         },
      };

      const projection = {
         _id: 0,
         id: 1,
         name: 1,
         image: 1,
         title: 1,
      };
      try {
         const findResult = championsData
            .find(query)
            .project(projection)
            .sort({ name: 1 })
            .limit(10);

         return findResult.toArray();
      } catch (e) {
         console.error(`Error occurred while fetching requested data, ${e}`);
         return { error: e };
      }
   }

   static async getChampions(page: number) {
      const projection = {
         _id: 0,
         id: 1,
         name: 1,
         image: 1,
         title: 1,
      };
      try {
         const findResult = championsData
            .find()
            .project(projection)
            .sort({ name: 1 })
            .limit(20)
            .skip(page * 20);
         return findResult.toArray();
      } catch (e) {
         console.error(`Error occurred while fetching requested data, ${e}`);
         return { error: e };
      }
   }
}
export default ChampionDataDAO;
