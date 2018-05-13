const mongoose = require('mongoose');
const dbModels = require('./models');
const db = mongoose.connection;

db.once('open', function() {
  console.log('DB Connected');
});

db.on('error', console.error.bind(console, 'connection error:'));

mongoose.connect(process.env.DB);

module.exports = {
  db: db,
  dbModels: dbModels
};
