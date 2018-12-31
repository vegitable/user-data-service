const db = require('../startup/db');

register = (req) => {
  console.log(req.body)
  var today = new Date();
  var users = {
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
    "email": req.body.email,
    "password": req.body.password,
    "create": today,
    "modified": today
  }

  db.connection.query('INSERT INTO users SET ?', users, (err, results) => {
    if (err) {
      console.log('The following error ocurred while attempting to register user: ', err);
      return err;
    } else {
      console.log('Registering the user was successful!');
      return results;
    }
  })
}

module.exports = {
  register
}