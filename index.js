const express = require('express');
const app = express();

require('./startup/db')();

app.get('/', (req, res) => {
  res.send('Hello user data service!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});