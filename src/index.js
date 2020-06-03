const MongoClient = require('mongodb');
const app = require('./server');
const UserDAO = require('./dao/usersDAO');
const BuildsDAO = require('./dao/buildsDAO');

const port = process.env.PORT || 3000;

MongoClient.connect(process.env.SUMMONERS_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await UserDAO.injectDB(client);
    await BuildsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
