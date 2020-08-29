/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'gracekathryn',
  database: 'tagaz',
});

client.connect();

const queryHandlers = {

  addRestaurant: function addRestaurant(name, photoArray) {
    const queryString = `INSERT INTO restaurants (name, images) values ('${name}', '${JSON.stringify(photoArray)}')`;
    client.query(queryString, (err) => {
      if (err) {
        console.log(`An error occurred: ${err}`);
      } else {
        console.log('Data loaded successfully');
      }
      client.end();
    });
  },

};

module.exports = queryHandlers;
