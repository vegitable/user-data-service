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
    let profile = new Profile({
      userEmail: req.body.userEmail,
      restaurants: []
    });
    await profile.save();
  }

  let restaurant = {name: req.body.restaurant.name, postcode: req.body.restaurant.postcode};
  let result = await Profile.findOneAndUpdate({userEmail: req.body.userEmail}, {$push: {restaurants: restaurant}});
  console.log(`Result -> ${result}`)
  return result;

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

module.exports = {
  saveRestaurant,
  getRestaurants
}