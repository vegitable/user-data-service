const mongoose = require('mongoose');

const profileShema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  restaurants: [{ name: String, postcode: String }],
});

const Profile = mongoose.model('Profile', profileShema);

const searchRestaurants = (restaurantsArray, restaurant) => {
  for (let i = 0; i < restaurantsArray.length; i += 1) {
    const testRestaurant = restaurantsArray[i];
    if (testRestaurant.name === restaurant.name
      && testRestaurant.postcode === restaurant.postcode) {
      return i;
    }
  }
  return -1;
};

const saveRestaurant = async (req) => {
  console.log(req.body);

  let profile = await Profile.findOne({ userEmail: req.body.userEmail })
    .catch((err) => {
      console.log(err);
      return null;
    })
    .then((result) => {
      console.log(result);
      return result;
    });

  if (!profile) {
    profile = new Profile({
      userEmail: req.body.userEmail,
      restaurants: [],
    });
    await profile.save();
  }

  const restaurant = { name: req.body.restaurant.name, postcode: req.body.restaurant.postcode };
  const restaurantExists = searchRestaurants(profile.restaurants, restaurant);
  console.log(restaurantExists);
  if (restaurantExists === -1) {
    const result = await Profile.findOneAndUpdate(
      { userEmail: req.body.userEmail },
      { $push: { restaurants: restaurant } },
    );
    console.log(`Result -> ${result}`);
    return result;
  }
  return 'restaurant exists';
};

const getRestaurants = async (req) => {
  const profile = await Profile.findOne({ userEmail: req.body.userEmail })
    .catch((err) => {
      console.log(err);
      return null;
    })
    .then((result) => {
      console.log(result);
      return result;
    });

  if (!profile) {
    return null;
  }
  return profile.restaurants;
};

const removeRestaurant = async (req) => {
  const profile = await Profile.findOne({ userEmail: req.body.userEmail })
    .catch((err) => {
      console.log(err);
      return null;
    })
    .then((result) => {
      console.log(`Result -> ${result}`);
      return result;
    });

  const index = searchRestaurants(profile.restaurants, req.body.restaurant);
  if (index > -1) {
    profile.restaurants.splice(index, 1);
    const result = await profile.save();
    return result;
  }
  return null;
};

module.exports = {
  saveRestaurant,
  getRestaurants,
  removeRestaurant,
};
