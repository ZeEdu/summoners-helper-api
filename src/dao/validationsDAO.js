let user;

class ValidationsDAO {
  static async injectDB(conn) {
    if (user) {
      return;
    }
    try {
      user = await conn.db(process.env.SUMMONERS_NS).collection('users');
    } catch (e) {
      console.error(`UNable to establish collection handles in validationDAO:: ${e}`);
    }
  }

  static async getUserByEmail(email) {
    return user.findOne({ useremail: email });
  }

  static async getUserNyUsername(userName) {
    return user.findOne({ username: userName });
  }
}

module.exports = ValidationsDAO;
