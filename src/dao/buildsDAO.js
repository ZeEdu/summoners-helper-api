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
          threats: buildBody.threats
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

  static async getBuildsByUser(creatorID, page) {
    const filter = { userUID: creatorID };
    const projection = {
      _id: 1,
      champion: 1,
      name: 1,
      patch: 1
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

  static async getBuildsByChampion(championID, page) {
    try {
      const filter = { champion: championID };
      const projection = {
        _id: 1,
        userUID: 1,
        champion: 1,
        name: 1,
        patch: 1
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
