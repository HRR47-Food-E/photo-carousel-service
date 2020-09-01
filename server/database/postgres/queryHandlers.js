/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'gracekathryn',
  database: 'tagaz',
});

client.connect();

module.exports = {

  // Fetch restaurant data by ID
  findRestaurant(restaurantId, callback) {
    const queryString = `SELECT * FROM restaurants WHERE id = ${restaurantId}`;
    client.query(queryString, (err, data) => {
      // if DB error occurs, send error back to client
      if (err) {
        callback(err, null);
      } else {
        // create response data object
        // this will create the data shape the client expects
        const resData = {};
        // pull restaurant name from DB data
        let { name } = data.rows[0];
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
        const photos = data.rows[0].images.split(':');
        // S3 URL
        const s3 = 'https://tagaz.s3-us-west-1.amazonaws.com/img';
        // for each photo, build an object that has:
        // 1) concatenated S3 image URL
        // 2) image ID number starting at 1 (for layout purposes)
        for (let i = 0; i < photos.length; i += 1) {
          const photo = {};
          photo.Image_url = `${s3}${photos[i]}.jpeg`;
          photo.Image_id = i + 1;
          resData.photoArray.push(photo);
        }
        // send response data object to server/client
        callback(null, resData);
      }
    });
  },

};

// QUERY FOR TESTING EXECUTION TIME
// 'EXPLAIN (FORMAT YAML, ANALYZE) SELECT * FROM restaurants WHERE id = 10000000'
