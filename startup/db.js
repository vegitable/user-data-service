const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
  mongoose.connect(config.get('db'))
    .then(() => console.log(`Connected to ${config.get('db')}...`))
    .catch(() => console.log('Connection to MongoDB failed...'));
}