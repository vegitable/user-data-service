const mongoose = require('mongoose');

const profileShema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  restaurants: [{name: String, postcode: String}]
});

const Profile = mongoose.model('Profile', profileShema);

saveRestaurant = async (req) => {
  console.log(req.body);

  let profile = await Profile.findOne({userEmail: req.body.userEmail})
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
      restaurants: []
    });
    await profile.save();
  }

  let restaurant = {name: req.body.restaurant.name, postcode: req.body.restaurant.postcode};
  let restaurantExists = searchRestaurants(profile.restaurants, restaurant);
  console.log(restaurantExists);
  if (restaurantExists === -1) {
    let result = await Profile.findOneAndUpdate({userEmail: req.body.userEmail}, {$push: {restaurants: restaurant}});
    console.log(`Result -> ${result}`)
    return result;
  } else {
    return null;
  }

}

getRestaurants = async (req) => {
  let profile = await Profile.findOne({userEmail: req.body.userEmail})
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
  } else {
    return profile.restaurants;
  } 
}

removeRestaurant = async (req) => {
  let profile = await Profile.findOne({userEmail: req.body.userEmail})
  .catch((err) => {
    console.log(err);
    return null;
  })
  .then((result) => {
    console.log(`Result -> ${result}`);
    return result;
  });

  let index = searchRestaurants(profile.restaurants, req.body.restaurant);
  if (index > -1) {
    profile.restaurants.splice(index, 1);
    let result = await profile.save();
    return result;
  } else {
    return null;
  }
} 

searchRestaurants = (restaurantsArray, restaurant) => {
  for (let i = 0; i < restaurantsArray.length; i++) {
    let testRestaurant = restaurantsArray[i];
    if (testRestaurant.name === restaurant.name && 
      testRestaurant.postcode === restaurant.postcode) {
      return i;
    }
  }
  return -1;
}

module.exports = {
  saveRestaurant,
  getRestaurants,
  removeRestaurant
}