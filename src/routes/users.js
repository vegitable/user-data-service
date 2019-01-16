const express = require('express');
const router = express.Router();
const { register, login } = require('../models/user');

router.get('/', (req, res) => {
  res.send('vegitable session started!')
});

router.post('/register', async (req, res) => {
  const result = await register(req);
  res.send(result);
});

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send({
      code: 200,
      message: 'Missing details'
    });
  }
  const result = await login(req);
  if (result.message === 'User logged in successfully.') {
    req.session.user = result.name;
    req.session.email = result.email;
  }
  console.log(result);
  res.send(result);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  console.log(req.session);
  res.send({
    code: 200,
    message: 'User logged out successfully'
  });
});

module.exports = router;