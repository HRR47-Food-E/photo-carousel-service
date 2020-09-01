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
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

};

// QUERY FOR TESTING EXECUTION TIME
// client.query('EXPLAIN (FORMAT YAML, ANALYZE) SELECT * FROM restaurants WHERE id = 10000000', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
//   client.end();
// });
