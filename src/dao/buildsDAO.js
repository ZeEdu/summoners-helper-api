const ObjectId = require('mongodb').ObjectID;
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
        introduction: buildBody.introduction
      });
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while adding new Build, ${e}`);
      return { error: e };
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

  static async getBuildById(id) {
    try {
      return builds.findOne({ _id: new ObjectId(id) });
    } catch (e) {
      return { e };
    }
  }

  static async getBuildsByUser(creatorID) {
    const filter = { userUID: creatorID };
    const projection = {
      _id: 1,
      champion: 1,
      name: 1,
      patch: 1
    };
    try {
      const findResult = await builds.find(filter).project(projection);
      return findResult.toArray();
    } catch (e) {
      return { e };
    }
  }

  static async getBuildsByChampion(championID) {
    try {
      const filter = { champion: championID };
      const projection = {
        _id: 1,
        userUID: 1,
        champion: 1,
        name: 1,
        patch: 1
      };
      const findResult = await builds.find(filter).project(projection);
      return findResult.toArray();
    } catch (e) {
      return { e };
    }
  }

  static async deleteBuild(buildID) {
    try {
      const id = new ObjectId(buildID);
      await builds.deleteOne({ _id: id });
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while removig the guide, ${e}`);
      return { error: e };
    }
  }
}

module.exports = BuildsDAO;
