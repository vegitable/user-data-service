const express = require('express');
const app = express();
const db = require('mongoose');

db.connect('mongodb://testuser:testuser1@ds016108.mlab.com:16108/user-data-service')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.log('Unable to connect to MongoDB...'));

app.get('/', (req, res) => {
  res.send('Hello user data service!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});