const BuildsDAO = require('../dao/buildsDAO');

class BuildsController {
  static async getBuildById(req, res) {
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

  static async addBuild(req, res) {
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

  static async updateBuild(req, res) {
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

  static async getBuildsByChampion(req, res) {
    try {
      const championID = req.params.championid;
      const { page } = req.params;
      const findResult = await BuildsDAO.getBuildsByChampion(championID, page);
      res.status(200).json(findResult);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  static async getBuildsByUser(req, res) {
    try {
      const creatorID = req.params.creatorid;
      const { page } = req.params;
      const findResult = await BuildsDAO.getBuildsByUser(creatorID, page);
      res.status(200).json(findResult);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  static async deleteBuild(req, res) {
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
module.exports = BuildsController;
