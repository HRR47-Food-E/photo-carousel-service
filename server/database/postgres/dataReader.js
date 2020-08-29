/* eslint-disable no-console */
const fs = require('fs');
const readline = require('readline');
const psql = require('./queryHandlers.js');

console.time('Read Data');

// setup read stream to read file by line
const readStream = readline.createInterface({
  input: fs.createReadStream('../__data/__dataTest.csv'),
});

// console.log each line
readStream.on('line', (line) => {
  const restaurant = JSON.parse(line);
  const { name } = restaurant;
  const images = JSON.stringify(restaurant.photos);
  psql.addRestaurant(name, images);
});

console.timeEnd('Read Data');
