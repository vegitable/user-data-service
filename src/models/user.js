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

  if (user) { return null } 

  let hash = await genHash(req.body.password);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  return await user.save()
    .catch((err) => {
      console.log(err);
      return null;
    })
    .then((result) => {
      console.log(result);
      return result;
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
    return null;
  } else {
    return await checkAuth(req.body.password, user.password)
    .catch((err) => {
      console.log('Error authorising user: ' + err);
      return null;
    })
    .then((result) => {
      return user;
    });
  }
}

auth = async (id) => {
  return await User.findById(id)
    .catch((err) => {
      console.log('Error authenticating user: ' + err);
      return null;
    })
    .then((result) => {
      console.log(result);
      return result;
    });
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
        console.log('Bcrypt authenticate validated.');
        resolve(true);
      }
    });
  })

}

module.exports = {
  User,
  register,
  login,
  auth
}