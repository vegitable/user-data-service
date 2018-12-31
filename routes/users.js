const express = require('express');
const router = express.Router();
const { register } = require('../models/user');

router.post('/', async (req, res) => {
  const result = await register(req);
  console.log(result);
  res.send(result);
});

module.exports = router;