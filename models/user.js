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

  db.connection.query('INSERT INTO users SET ?', users, (err) => {
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

login = (req) => {
  var email = req.body.email;
  var password = req.body.password

  db.connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      return ({
        "code": 400,
        "failed": "An error ocurred attempting login."
      });
    } else {
      if (result.length > 0) {
        if (result[0].password === password) {
          console.log(`User ${result[0].first_name} ${result[0].last_name} has logged in at ${new Date()}.`)
          return ({
            "code": 200,
            "success": "Login was sucessful!"
          });
        } else {
          return ({
            "code": 204,
            "success": "Email and password do not match..."
          });
        }
      } else {
        return ({
          "code": 204,
          "success": "Email does not exist"
        });
      }
    }
  })
}

module.exports = {
  register,
  login
}