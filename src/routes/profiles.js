const express = require('express');
const router = express.Router();

router.post('/saveRestaurant', (req, res) => {
  console.log('HIT')
  res.send('testing');
});

module.exports = router;
