const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { register, login } = require('../models/user');

router.get('/', (req, res) => {
  res.send('vegitable session started!')
});

router.post('/register', async (req, res) => {
  const result = await register(req);
  if (!result) {
    res.status(401).send({
      message: 'Failed to create account.'
    })
  } else {
    let token = jwt.sign({id: result._id}, 'supertestsecret', {
      expiresIn: 3600
    })

    res.status(200).send(
      {
        auth: true,
        token: token,
        message: 'User ' + result.name + ' was created successfully'
      }
    );

  }
});

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).send({
      message: 'Missing authentication details.'
    });
  }
  const result = await login(req);
  if (!result) {
    res.status(401).send({
      message: 'User could not be authorised.'
    })
  } else {
    req.session.user = result.name;
    req.session.email = result.email;
    
    console.log(result);
    res.status(200).send(result);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).send({
    message: 'User logged out successfully'
  });
});

router.get('/auth', (req, res) => {
  let token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).send({
      auth: false,
      message: 'User authenticaton failed.'
    });
  }

  jwt.verify(token, 'supertestsecret', (err, decoded) => {
    if (err) {
      return res.status(500).send({ 
        auth: false, 
        message: 'Failed to authenticate token.' 
      });
    }
    res.status(200).send(decoded);
  });
});

module.exports = router;