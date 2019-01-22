const express = require('express');
const router = express.Router();
const { saveRestaurant } = require('../models/profile');

router.post('/saveRestaurant', async (req, res) => {
  let result = await saveRestaurant(req);

  res.send(result);
});

module.exports = router;
