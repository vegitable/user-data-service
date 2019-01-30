const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const users = require('./routes/users');
const profiles = require('./routes/profiles');
const corsMiddleware = require('./middleware/cors');

const app = express();
const port = process.env.PORT || 3002;

require('./startup/db')();

app.use(helmet());
app.use(corsMiddleware);
app.use(session({
  secret: 'thisisthevegitablesecret',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.json());

app.use('/api/users', users);
app.use('/api/profiles', profiles);

app.get('/', (req, res) => {
  res.send('vegitable user-data-service is running in staging!');
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
