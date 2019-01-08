const db = require('../startup/db')
const bcrypt = require('bcrypt');

register = (req) => {
  const email = req.body.email;

  db.connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (result.length > 0) {
      console.log('Email already exists.');
      return ({
        "code": 204,
        "success": "Email already exists."
      })
    } else {
      return registerUserToDB(req);
    }
  });
} 

registerUserToDB = (req) => {
  const today = new Date();

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    var users = {
      "first_name": req.body.firstname,
      "last_name": req.body.lastname,
      "email": req.body.email,
      "password": hash,
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
          "success": "Registering the user was successful!"
        });
      }
    });
  });
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
        bcrypt.compare(password, result[0].password, function(err, res) {
          if(res) {
            console.log(`User ${result[0].first_name} ${result[0].last_name} has logged in at ${new Date()}.`)
            return ({
              "code": 200,
              "success": "Login was successful!"
            });
          } else {
            console.log('Loging was unsuccessful as passwords do not match...')
            return ({
              "code": 204,
              "success": "Email and password do not match..."
            });
          } 
        });
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