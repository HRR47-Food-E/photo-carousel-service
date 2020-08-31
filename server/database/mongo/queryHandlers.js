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
  id: Number,
  name: String,
  images: String,
});

const Restaurants = mongoose.model('Restaurants', restaurantSchema);

// console.time('find');
Restaurants.find({ id: 10000000 }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    // console.timeEnd('find');
  }
});
