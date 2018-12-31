const express = require('express');
const app = express();
const user = require('./routes/users');
const db = require('./startup/db');

app.use(express.json());
app.use('/api/users', user);

app.get('/', (req, res) => {
  res.send('vegitable user-data-service is running!');
});

app.listen(4000, () => {
  console.log('Listening on port 4000...');
});