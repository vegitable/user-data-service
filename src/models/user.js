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
  },
});

const User = mongoose.model('User', userSchema);

const genHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const checkAuth = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('Bcrypt authenticate validated.');
        resolve(true);
      }
    });
  });
};

const register = async (req) => {
  let user = await User.findOne({ email: req.body.email })
    .catch((err) => {
      console.log(err);
      return null;
    })
    .then((result) => {
      console.log(result);
      return result;
    });

  if (user) { return null; }

  const hash = await genHash(req.body.password);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  return user.save()
    .catch((err) => {
      console.log(err);
      return null;
    })
    .then((result) => {
      console.log(result);
      return result;
    });
};

const login = async (req) => {
  const user = await User.findOne({ email: req.body.email })
    .catch((err) => {
      console.log(`Error finding user account: ${err}`);
      return null;
    })
    .then((result) => {
      console.log(`Result: ${result}`);
      return result;
    });

  if (!user) {
    return null;
  }

  return checkAuth(req.body.password, user.password)
    .catch((err) => {
      console.log(`Error authorising user: ${err}`);
      return null;
    })
    .then((result) => {
      console.log(`Result: ${result}`);
      return user;
    });
};

const auth = async (id) => {
  return User.findById(id)
    .catch((err) => {
      console.log(`Error authenticating user: ${err}`);
      return null;
    })
    .then((result) => {
      console.log(result);
      return result;
    });
};


module.exports = {
  User,
  register,
  login,
  auth,
};
