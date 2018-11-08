const express = require('express');
const app = express();
const user = require('./routes/users');

require('./startup/db')();

app.use(express.json());
app.use('/api/users', user);

app.get('/', (req, res) => {
  res.send('Hello user data service!');
});

app.listen(4000, () => {
  console.log('Listening on port 4000...');
});