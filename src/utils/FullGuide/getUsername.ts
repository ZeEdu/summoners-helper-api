import UsersDAO from '../../dao/usersDAO';
import { UserProfile } from '../../interfaces/UserProfile';

export const getUsername = async (uid: string) => {
   try {
      const userData: UserProfile = await UsersDAO.getProfileByUID(uid);
      return userData.username;
   } catch (error) {
      console.error('Error occurred:', error);
      throw new Error(error);
   }
};
