const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { register, login, auth } = require('../models/user');

router.get('/', (req, res) => {
  res.status(200).send({ message: 'vegitable session started!' });
});

router.post('/register', async (req, res) => {
  const result = await register(req);
  if (!result) {
    res.status(401).send({
      message: 'Failed to create account.',
    });
  } else {
    const token = jwt.sign({ id: result.id }, 'supertestsecret', {
      expiresIn: 3600,
    });

    result.password = 0;

    res.status(200).send({
      auth: true,
      token,
      message: 'User was created successfully',
      user: result,
    });
  }
});

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).send({
      message: 'Missing authentication details.',
    });
  }
  const result = await login(req);
  if (!result) {
    res.status(401).send({
      message: 'User could not be authorised.',
    });
  } else {
    const token = jwt.sign({ id: result.id }, 'supertestsecret', {
      expiresIn: 3600,
    });

    result.password = 0;

    res.status(200).send({
      auth: true,
      token,
      message: 'User logged in successfully',
      user: result,
    });
  }
});

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

router.get('/auth', async (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).send({
      auth: false,
      message: 'User authenticaton failed.',
    });
  }

  const result = await jwt.verify(token, 'supertestsecret', (err, decoded) => {
    if (err) {
      return null;
    }
    if (!decoded.id) {
      return null;
    }
    return decoded;
  });

  if (result) {
    const user = await auth(result.id);
    user.password = 0;
    res.status(200).send({
      auth: true,
      user,
    });
  } else {
    res.status(401).send({
      auth: false,
      message: 'User authentication failed.',
    });
  }
});

module.exports = router;
