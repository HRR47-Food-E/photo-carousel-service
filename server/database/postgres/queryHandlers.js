/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'gracekathryn',
  database: 'tagaz',
});

client.connect();

const queryHandlers = {

  addRestaurant: function addRestaurant(name, photos) {
    const queryString = `INSERT INTO restaurants (name, images) values ('${name}', '${photos}')`;
    client.query(queryString, (err) => {
      if (err) {
        console.log(`An error occurred: ${err.stack}`);
      } else {
        console.log('Data loaded successfully');
      }
    });
  },

};

module.exports = queryHandlers;
