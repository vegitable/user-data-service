const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);

register = async (req) => {
  let user = await User.findOne({email: req.body.email});
  if (user) {
    return {
      code: 200,
      message: 'User already exists.'
    }
  } 

  const hash = await genSalt(req.body.password);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  
  const result = await user.save();
  return {
    code: 200,
    message: 'User ' + result.name + ' was created successfully'
  }
}

genSalt = (password) => {
  return new Promise((resolve,reject) => {
    bcrypt.hash(password, 10 , (err,hash) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(hash);
      }
    });
  });
}

login = (req) => {
}

module.exports = {
  register,
  login
}