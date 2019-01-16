const session = require('express-session');
const uuid = require('uuid');

module.exports = (req, res, next) => {
  session({
    genid: (req) => {
      console.log('Inside the session middleware');
      console.log(req.sessionID);
      return uuid();
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  });
}