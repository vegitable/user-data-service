const express = require('express');
const router = express.Router();
const { saveRestaurant, getRestaurants, removeRestaurant } = require('../models/profile');

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

router.post('/removeRestaurant', async (req, res) => {
  let result = await removeRestaurant(req);
  if (result) {
    res.status(200).send({
      message: 'Restaurant has been removed from favourites.',
      result: result
    });
  } else {
    res.status(401).send({
      message: 'Failed to remove restaurant.'
    })
  }
});

module.exports = router;
