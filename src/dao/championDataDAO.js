let championsData;

class ChampionDataDAO {
   static async injectDB(conn) {
      if (championsData) {
         return;
      }
      try {
         championsData = await conn.db(process.env.SUMMONERS_NS).collection('championData');
      } catch (e) {
         console.error(`Unable to estabilish collection handles in ChampionData:: ${e}`);
      }
   }

   static async getChampions(page) {
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
module.exports = ChampionDataDAO;
