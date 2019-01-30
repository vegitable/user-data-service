const express = require('express');
const { saveRestaurant, getRestaurants, removeRestaurant } = require('../models/profile');

const router = express.Router();

router.post('/saveRestaurant', async (req, res) => {
  const result = await saveRestaurant(req);
  if (result === 'restaurant exists') {
    res.status(409).send({
      message: 'Restaurant already saved to users profile.',
    });
  } else {
    res.status(200).send({
      message: 'Restaurant added to profile.',
    });
  }
});

router.get('/getRestaurants', async (req, res) => {
  const result = await getRestaurants(req);
  console.log(`result: ${result}`);
  if (!result) {
    res.status(401).send({
      message: 'Unable to find restaurants.',
    });
  } else {
    res.status(200).send({
      restaurants: result,
    });
  }
});

router.post('/removeRestaurant', async (req, res) => {
  const result = await removeRestaurant(req);
  if (result) {
    res.status(200).send({
      message: 'Restaurant has been removed from favourites.',
      result,
    });
  } else {
    res.status(401).send({
      message: 'Failed to remove restaurant.',
    });
  }
});

module.exports = router;
