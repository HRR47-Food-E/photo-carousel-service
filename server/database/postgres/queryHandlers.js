const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '54.241.152.75',
  port: 5432,
  database: 'tagaz',
  password: 'zagat',
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

  // Add restaurant to PSQL database
  addRestaurant(restaurantData, callback) {
    // create variables for data from request
    const { name } = restaurantData;
    const { images } = restaurantData;
    // create query string for PSQL insertion
    const queryString = `INSERT INTO restaurants (name, images) VALUES ('${name}', '${images}')`;
    // send query to PSQL
    client.query(queryString, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  // Update existing restaurant in PSQL database
  updateRestaurant(req, callback) {
    // create variables for data from request
    const { id } = req.params;
    const { name } = req.body;
    const { images } = req.body;
    // create query string for PSQL update
    const queryString = `UPDATE restaurants SET name = '${name}', images = '${images}' WHERE id = ${id}`;
    // send query to PSQL
    client.query(queryString, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  // Delete existing restaurant from PSQL database
  deleteRestaurant(req, callback) {
    const { id } = req.params;
    const queryString = `DELETE FROM restaurants where id = ${id}`;
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
// 'EXPLAIN (FORMAT YAML, ANALYZE) SELECT * FROM restaurants WHERE id = 10000000'
