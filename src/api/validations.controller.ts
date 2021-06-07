import { Request, Response } from 'express';
import UsersDAO from '../dao/usersDAO';

class ValidationCtrl {
   static async checkemail(req: Request, res: Response) {
      try {
         const qrryRes = await UsersDAO.getUserByEmail(req.params.email);
         if (qrryRes === null) {
            res.status(200).json({});
         } else {
            res.status(200).json({ message: true });
         }
      } catch (e) {
         res.status(500).json({ error: e });
      }
   }

   static async checkusername(req: Request, res: Response) {
      try {
         const qrryRes = await UsersDAO.getUserByUsername(req.params.username);
         if (qrryRes === null) {
            res.status(200).json({});
         } else {
            res.status(200).json({ message: true });
         }
      } catch (e) {
         res.status(500).json({ error: e });
      }
   }
}

export default ValidationCtrl;
