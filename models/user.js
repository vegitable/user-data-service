const db = require('../startup/db');

register = (req) => {
  var today = new Date();
  var users = {
    "first_name": req.body.firstname,
    "last_name": req.body.lastname,
    "email": req.body.email,
    "password": req.body.password,
    "created": today,
    "modified": today
  }

  db.connection.query('INSERT INTO users SET ?', users, (err, results) => {
    if (err) {
      console.log('The following error ocurred while attempting to register user: ', err);
      return ({
        "code": 400,
        "failed": "An error ocurred registering the user."
      });
    } else {
      console.log('Registering the user was successful!');
      return ({
        "code": 200,
        "success": "The user was registered successfully!"
      });
    }
  })
}

module.exports = {
  register
}