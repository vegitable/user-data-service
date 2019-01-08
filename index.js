const express = require('express');
const app = express();
const user = require('./routes/users');
const db = require('./startup/db');
const port = 3002 || event.process.PORT;

app.use(express.json());
app.use('/api/users', user);

app.get('/', (req, res) => {
  res.send('vegitable user-data-service is running!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});