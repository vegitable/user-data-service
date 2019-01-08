const express = require('express');
const router = express.Router();
const { register, login } = require('../models/user');

router.post('/register', async (req, res) => {
  const result = await register(req);
  res.send(result);
});

router.post('/login', async (req, res) => {
  const result = await login(req);
  res.send(result);
})

module.exports = router;