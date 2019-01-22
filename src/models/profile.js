const mongoose = require('mongoose');

const profileShema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  restaurants: {
    type: Array,
    required: false,
  }
});

const Profile = mongoose.model('Profile', profileShema);

saveRestaurant = async (req) => {
  let profile = await Profile.findOne({userEmail: req.body.userEmail})
    .catch((err) => {
      console.log(err);
      return null;
    })
    .then((result) => {
      console.log(`Result: ${result}`);
      return result;
    });

  if (!profile) {
    profile = new Profile({
      userEmail: req.body.userEmail,
      restaurants: req.body.restaurants,
    })
  } else {
    profile.restaurants = req.body.restaurants
  }
  
  return await profile.save()
    .catch((err) => {
      console.log(err);
      return null;
    }).then((result) => {
      console.log(result);
      return result;
    })
}

module.exports = {
  saveRestaurant
}