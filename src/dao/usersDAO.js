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
    return user.findOne({ email: email });
  }

  static async getUserByUsername(username) {
    return user.findOne({ username: username });
  }
  static async getUserByUID(useruid) {
    return user.findOne({ userUID: useruid });
  }
  static async userIntegrity(user) {
    return user.findOne({ email: user.email, username: user.username, userUID: user.userUID });
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
        return { error: 'A username already exists' };
      }
      console.error(`Error occurred while adding new User, ${e}`);
      return { error: e };
    }
  }

  static async deleteUser(userInfo) {
    try {
      await user.deleteOne({
        userUID: userInfo.uid,
        username: userInfo.username,
        email: userInfo.email
      });
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while deleting the User, ${e}`);
      return { error: e };
    }
  }
}

module.exports = UsersDAO;
