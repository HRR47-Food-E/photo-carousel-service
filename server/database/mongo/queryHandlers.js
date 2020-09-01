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
        // create response data object
        // this will create the data shape the client expects
        const resData = {};
        // pull restaurant name from DB data
        let { name } = data[0];
        // replace any slashes with commas
        if (name.includes('/')) {
          name = name.split('/');
          name = name.join(',');
        }
        // attach name to response data object
        resData.name = name;
        // attach photo array to response data object
        resData.photoArray = [];
        // split photo string from DB data into array of filenames
        const photos = data[0].images.split(':');
        // S3 URL
        const s3 = 'https://tagaz.s3-us-west-1.amazonaws.com/img';
        // for each photo, build an object that has:
        // 1) concatenated S3 image URL
        // 2) image ID number starting at 1 (for layout purposes)
        for (let i = 0; i < photos.length; i += 1) {
          const photo = {};
          photo.Image_url = `${s3}${photos[i]}.jpeg`;
          photo.Image_id = i + 1;
          // push each photo onto response data object
          resData.photoArray.push(photo);
        }
        // send response data object to server/client
        callback(null, resData);
      }
    });
  },

};

// QUERY FOR TESTING EXECUTION TIME
// chain command below to view MongoDB execution stats
// .explain('executionStats')
// console.time('Find Restaurant by ID');
// Restaurants.find({ id: 10000000 }, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
//   console.timeEnd('Find Restaurant by ID');
//   mongoose.disconnect();
// });
