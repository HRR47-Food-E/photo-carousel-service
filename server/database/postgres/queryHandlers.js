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
// add line below to beginning of query string to view PSQL execution stats
// EXPLAIN (FORMAT YAML, ANALYZE)
client.query('SELECT * FROM restaurants WHERE id = 10000000', (err, data) => {
  console.time('Find Restaurant by ID');
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
  console.timeEnd('Find Restaurant by ID');
  client.end();
});
