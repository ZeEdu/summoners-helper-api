const ObjectID = require('mongodb').ObjectID;
let builds;

class BuildsDAO {
  static async injectDB(conn) {
    if (builds) {
      return;
    }
    try {
      builds = await conn.db(process.env.SUMMONERS_NS).collection('builds');
    } catch (e) {
      console.error(`Unable to establish collection handles in build: ${e}`);
    }
  }
  static async addBuild(buildBody) {
    try {
      await builds.insertOne({
        usrUID: buildBody.usrUID,
        champ: buildBody.champ,
        name: buildBody.build,
        patch: buildBody.patch,
        pub: new Date(),
        pRune: buildBody.pRunes,
        sRune: buildBody.sRunes,
        bonus: buildBody.bonus,
        spells: buildBody.spells,
        items: buildBody.items,
        abilities: buildBody.abilities,
        threats: buildBody.threats,
        description: buildBody.description
      });
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while adding new Build, ${e}`);
    }
  }

  static async updateBuild(buildBody) {
    try {
      await builds.update(
        {
          _id: ObjectId(buildBody._id)
        },
        {
          patch: buildBody.patch,
          updated: new Date(),
          pRune: buildBody.pRunes,
          sRune: buildBody.sRunes,
          bonus: buildBody.bonus,
          spells: buildBody.spells,
          items: buildBody.items,
          abilities: buildBody.abilities,
          threats: buildBody.threats,
          description: buildBody.description
        }
      );
    } catch (e) {}
  }
  static async getBuildsByUser(creatorID) {
    try {
      const findResult = await builds.find({ usrUID: creatorID });
      return findResult.toArray();
    } catch (e) {
      return { e };
    }
  }
  static async getBuildsByChampion(championID) {
    try {
      const findResult = await builds.find({ champ: championID });
      return findResult.toArray();
    } catch (e) {
      return { e };
    }
  }
  static async deleteBuild(buildID) {
    try {
      const id = new ObjectID(buildID);
      const deleteResponse = await builds.deleteOne({ _id: id });
      return deleteResponse;
    } catch (e) {
      console.log(e);

      return { error: e };
    }
  }
}

module.exports = BuildsDAO;
