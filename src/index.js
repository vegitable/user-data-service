const express = require('express');
const app = express();
const session = require('express-session');
const helmet = require('helmet');
const user = require('./routes/users');
const corsMiddleware = require('./middleware/cors');
const port = 3002 || event.process.PORT;

require('./startup/db')();

app.use(helmet());
app.use(corsMiddleware);
app.use(session({
  secret: 'thisisthevegitablesecret',
  resave: false,
  saveUninitialized: true
}));
app.use(express.json());

app.use('/api/users', user);

app.get('/', (req, res) => {
  res.send('vegitable user-data-service is running!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});