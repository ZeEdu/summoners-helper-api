const MongoClient = require('mongodb');
const app = require('./server');
const ValidationsDAO = require('./dao/validationsDAO');

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.SUMMONERS_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await ValidationsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
