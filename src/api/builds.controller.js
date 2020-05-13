const BuildsDAO = require('../dao/buildsDAO');

class BuildsController {
  static async getBuildById(req, res) {
    try {
      const guide = await BuildsDAO.getBuildById(req.params.id);
      if (!guide) {
        res.status(500).json({ error: 'Internal error, please try again later' });
      }
      console.log(guide);
      res.status(200).json(guide);
    } catch (e) {
      console.error('Error occurred while removig the guide', e);
      res.status(400).json({ error: e });
    }
  }
  static async addBuild(req, res) {
    try {
      const BuildFromBody = req.body;
      BuildFromBody.createdOn = Date.now();
      BuildFromBody.patch = process.env.PATCH_VERSION;
      const insertResult = await BuildsDAO.addBuild(BuildFromBody);
      if (insertResult.success !== true) {
        res.status(500).json({ error: 'Internal error, please try again later' });
      }
      console.log(insertResult);
      res.status(201).json(insertResult);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async updateBuild(req, res) {
    try {
      const BuildFromBody = req.body;
      const updateResult = await BuildsDAO.updateBuild(BuildFromBody);
      console.log(updateResult);
      res.status(200).json(updateResult);
    } catch (e) {}
  }

  static async getBuildsByChampion(req, res) {
    try {
      const championID = req.params.championid;
      const findResult = await BuildsDAO.getBuildsByChampion(championID);
      res.status(200).json(findResult);
    } catch (e) {}
  }

  static async getBuildsByUser(req, res) {
    try {
      const creatorID = req.params.creatorid;
      const findResult = await BuildsDAO.getBuildsByUser(creatorID);
      console.log(findResult);
      res.status(200).json(findResult);
    } catch (e) {}
  }

  static async deleteBuild(req, res) {
    try {
      const buildID = req.params.buildid;
      const deleteResult = await BuildsDAO.deleteBuild(buildID);
      console.log(deleteResult);
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
module.exports = BuildsController;
