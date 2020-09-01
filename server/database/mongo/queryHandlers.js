/* eslint-disable no-console */
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost/tagaz';

// connect to Tagaz database
const db = mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

db
  .then(() => console.log(`Connected to: ${mongoURI}`))
  .catch((err) => {
    console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
    console.log(err);
  });

const restaurantSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  images: String,
});

const Restaurants = mongoose.model('Restaurants', restaurantSchema);

module.exports = {

  // Fetch restaurant data by ID
  findRestaurant(restaurantId, callback) {
    Restaurants.find({ id: restaurantId }, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
      mongoose.disconnect();
    });
  },

};

// QUERY FOR TESTING EXECUTION TIME
// chain command below to view MongoDB execution stats
// .explain('executionStats')
console.time('Find Restaurant by ID');
Restaurants.find({ id: 10000000 }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
  console.timeEnd('Find Restaurant by ID');
  mongoose.disconnect();
});
