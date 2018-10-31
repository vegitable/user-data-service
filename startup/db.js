const db = require('mongoose');

module.exports = function() {
  db.connect('mongodb://testuser:testuser1@ds016108.mlab.com:16108/user-data-service')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.log('Unable to connect to MongoDB...'));
}