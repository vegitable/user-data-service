const db = require('mongoose');
const config = require('config');

module.exports = function() {
  db.connect(config.get('db'))
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.log('Unable to connect to MongoDB...'));
}