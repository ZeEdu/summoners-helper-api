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
      return user.findOne({ email });
   }

   static async getUserByUsername(username) {
      return user.findOne({ username });
   }

   static async getUserByUID(useruid) {
      return user.findOne({ userUID: useruid });
   }

   static async userIntegrity(userdata) {
      return user.findOne({
         email: userdata.email,
         username: userdata.username,
         userUID: userdata.userUID,
      });
   }

   static async createProfile(userInfo) {
      try {
         await user.insertOne({
            userUID: userInfo.uid,
            username: userInfo.username,
            email: userInfo.email,
            joined: userInfo.joined,
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

   static async getProfileByUID(uid) {
      return user.findOne({ userUID: uid });
   }

   static async deleteUser(uid, email) {
      try {
         await user.deleteOne({
            userUID: uid,
            email: email,
         });
         return { success: true };
      } catch (e) {
         console.error(`Error occurred while deleting the User, ${e}`);
         return { error: e };
      }
   }
}

module.exports = UsersDAO;
