import MongoClient from 'mongodb';
import app from './server';
import UserDAO from './dao/usersDAO';
import BuildsDAO from './dao/buildsDAO';
import ChampionDataDAO from './dao/championDataDAO';

const port = process.env['PORT'] || 3000;

const dbUri =
   process.env['PRODUCTION'] === 'true'
      ? process.env['PROD_SUMMONERS_DB_URI']
      : process.env['SUMMONERS_DB_URI'];

const startupMessage =
   process.env['PRODUCTION'] === 'true'
      ? `Server is up and running at port: ${port} (production mode)`
      : `Server is up and running at port: ${port} (developer mode)`;

if (dbUri) {
   MongoClient.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
      .catch((err: any) => {
         console.error(err.stack);
         process.exit(1);
      })
      .then(async (client: any) => {
         await UserDAO.injectDB(client);
         await BuildsDAO.injectDB(client);
         await ChampionDataDAO.injectDB(client);
         app.listen(port, () => {
            console.log(startupMessage);
         });
      });
} else {
   throw new Error("dbUri doesn't exist");
}
