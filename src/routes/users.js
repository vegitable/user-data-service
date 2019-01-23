const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { register, login, auth } = require('../models/user');

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

    result.password = 0;

    res.status(200).send({
        auth: true,
        token: token,
        message: 'User was created successfully',
        user: result
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
    let token = jwt.sign({id: result._id}, 'supertestsecret', {
      expiresIn: 30
    })
    
    result.password = 0;

    res.status(200).send({
        auth: true,
        token: token,
        message: 'User logged in successfully',
        user: result,
      }
    );
  }
});

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

router.get('/auth', async (req, res) => {
  let token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).send({
      auth: false,
      message: 'User authenticaton failed.'
    });
  }

  let result = await jwt.verify(token, 'supertestsecret', (err, decoded) => {
    if (err) {
      return null;
    };
    if (!decoded.id) { return null }
    else {
      return decoded;
    }
  });

  if (result) {
    let user = await auth(result.id);
    user.password = 0;
    res.status(200).send({
      auth: true,
      user: user,
    });
  } else {
    res.status(401).send({
      auth: false,
      message: 'User authentication failed.'
    });
  }
});

module.exports = router;