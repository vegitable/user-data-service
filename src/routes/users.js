const express = require('express');
const router = express.Router();
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
    req.session.user = req.body.name;
    req.session.email = req.body.email;
    res.status(200).send(result);

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

module.exports = router;