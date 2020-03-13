let user;

class UsersDAO {
  static async injectDB(conn) {
    if (user) {
      return;
    }
    try {
      user = await conn.db(process.env.SUMMONERS_NS).collection('users');
    } catch (e) {
      console.error(`Unable to establish collection handles in usersDAO:: ${e}`);
    }
  }

  static async getUserByEmail(email) {
    return user.findOne({ useremail: email });
  }

  static async getUserByUsername(userName) {
    return user.findOne({ username: userName });
  }

  static async addUser(userInfo) {
    try {
      await user.insertOne({
        userUID: userInfo.uid,
        username: userInfo.username,
        email: userInfo.email,
        joined: new Date()
      });
      return { success: true };
    } catch (e) {
      if (String(e).startsWith('MongoError: E11000 duplicate key error')) {
        return { error: 'A username already exists ' };
      }
      console.error(`Error occurred while adding new User, ${e}`);
      return { error: e };
    }
  }
}

module.exports = UsersDAO;
