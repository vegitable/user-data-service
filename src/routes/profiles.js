const express = require('express');
const router = express.Router();
const { saveRestaurant, getRestaurants } = require('../models/profile');

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

router.post('/getRestaurants', async (req, res) => {
  console.log('get api endpoint hit');
  let result = await getRestaurants(req);
  console.log('result: ' + result);
  if (!result) {
    res.status(401).send({
      message: 'Unable to find restaurants.'
    });
  } else {
    res.status(200).send({
      restaurants: result
    });
  }
});

router.post('/removeRestaurant', (req, res) => {
  res.send('remove endpoint working');
});

module.exports = router;
