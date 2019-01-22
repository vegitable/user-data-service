const express = require('express');
const router = express.Router();
const { saveRestaurant } = require('../models/profile');

router.post('/saveRestaurant', async (req, res) => {
  let result = await saveRestaurant(req);
  if (!result) {
    res.status(401).send({
      message: 'Unable to add restaurant to profile.'
    });
  } else {
    res.status(200).send({
      message: 'Restaurant added to profile.'
    });
  }
});

router.get('/getRestaurants', (req, res) => {
  res.send('end point working');
})

module.exports = router;
