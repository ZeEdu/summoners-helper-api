const BuildsDAO = require('../dao/buildsDAO');

class BuildsController {
  static async addBuild(req, res) {
    try {
      const BuildFromBody = req.body;
      const insertResult = await BuildsDAO.addBuild(BuildFromBody);
      console.log(` inserted:  ${insertResult.success}`);
      res.status(200).json(insertResult.success);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }

  static async updateBuild(req, res) {
    try {
      const BuildFromBody = req.body;
      console.log(BuildFromBody._id);
      const updateResult = await BuildsDAO.updateBuild(BuildFromBody);
      console.log(updateResult);

      res.status(200).json(updateResult);
    } catch (e) {}
  }

  static async getBuildsByChampion(req, res) {
    try {
      const championID = parseInt(req.params.championid);
      const findResult = await BuildsDAO.getBuildsByChampion(championID);
      console.log(findResult);
      res.status(200).json(findResult);
    } catch (e) {}
  }

  static async getBuildsByUser(req, res) {
    try {
      const creatorID = req.params.creatorid;
      const findResult = await BuildsDAO.getBuildsByUser(creatorID);
      res.status(200).json(findResult);
    } catch (e) {}
  }

  static async deleteBuild(req, res) {
    try {
      const buildID = req.params.buildid;
      console.log(`Id informado: ${buildID}`);

      const deleteResult = await BuildsDAO.deleteBuild(buildID);

      res.status(200).json(deleteResult);
    } catch (e) {}
  }
}
module.exports = BuildsController;
