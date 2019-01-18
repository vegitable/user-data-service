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
  let user = await User.findOne({email: req.body.email})
    .catch((err) => {
      console.log(err);
      return null;
    })
    .then((result) => {
      return result;
    });

  if (user) {
    return {
      status: 200,
      message: 'User already exists.'
    }
  } 

  let hash = await genHash(req.body.password);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  return await user.save()
    .catch((err) => {
      console.log(err);
      return {
        status: 200,
        message: err
      }
    })
    .then((result) => {
      console.log(result);
      return {
        status: 200,
        message: 'User ' + result.name + ' was created successfully'
      }
    });
}


login = async (req) => {
  const user = await User.findOne({ email: req.body.email})
    .catch((err) => {
      console.log('Error finding user account: ' + err);
      return null;
    })
    .then((result) => {
      return result;
    });
    
    if (!user) {
      return {
        status: 401,
        message: 'Account does not exist.'
      }
    } else {
      return await checkAuth(req.body.password, user.password)
      .catch((err) => {
        console.log('Error authorising user: ' + err);
        return {
          status: 401,
          message: 'User could not be authorised.'
        }
      })
      .then((result) => {
        console.log(result);
        return {
          status: 200,
          message: 'User logged in successfully.',
          name: user.name,
          email: user.email,
        }
      });
    }
  }

genHash = (password) => {
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

checkAuth = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        console.log(err);
        reject(false);
      } else {
        console.log(res);
        resolve(true);
      }
    });
  })

}

module.exports = {
  User,
  register,
  login
}