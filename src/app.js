const MongoClient = require('mongodb');
const app = require('./server.js');
const UserDAO = require('./dao/usersDAO');
const BuildsDAO = require('./dao/buildsDAO');
const ChampionDataDAO = require('./dao/championDataDAO');

const port = process.env.PORT || 3000;

const dbUri =
   process.env.PRODUCTION === 'true'
      ? process.env.PROD_SUMMONERS_DB_URI
      : process.env.SUMMONERS_DB_URI;

const startupMessage =
   process.env.PRODUCTION === 'true'
      ? `Server is up and running at port: ${port} (production mode)`
      : `Server is up and running at port: ${port} (developer mode)`;

MongoClient.connect(dbUri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
   .catch((err) => {
      console.error(err.stack);
      process.exit(1);
   })
   .then(async (client) => {
      await UserDAO.injectDB(client);
      await BuildsDAO.injectDB(client);
      await ChampionDataDAO.injectDB(client);
      app.listen(port, () => {
         console.log(startupMessage);
      });
   });
