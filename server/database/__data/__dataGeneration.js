/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');

console.time('Data Generation');

const writeStream = fs.createWriteStream('./__data.csv');

const target = 10000000;

// Create CSV column header line
writeStream.write('name, images\n');

for (let i = 1; i <= target; i += 1) {
  // status logs
  if (i === 1) {
    console.log('Starting process...');
  } else if (i === 10) {
    console.log('10');
  } else if (i === 50) {
    console.log('50');
  } else if (i === 100) {
    console.log('100');
  } else if (i === 1000) {
    console.log('1000');
  } else if (i === 10000) {
    console.log('10000');
  } else if (i === 100000) {
    console.log('100000');
  } else if (i === 1000000) {
    console.log('1000000');
  } else if (i === 2000000) {
    console.log('2000000');
  } else if (i === 3000000) {
    console.log('3000000');
  } else if (i === 4000000) {
    console.log('4000000');
  } else if (i === 5000000) {
    console.log('5000000');
  } else if (i === 6000000) {
    console.log('6000000');
  } else if (i === 7000000) {
    console.log('7000000');
  } else if (i === 8000000) {
    console.log('8000000');
  } else if (i === 9000000) {
    console.log('9000000');
  } else if (i === 10000000) {
    console.log('10000000');
  }
  // Create string to store restaurant data
  let restaurantData = '';
  // Generate random fake restaurant name
  let name = faker.company.companyName();
  name = name.split('');
  if (name.includes(',')) {
    name.splice(name.indexOf(','), 1, '/');
  }
  name = name.join('');
  restaurantData += `${name},`;
  // Create array to store photo filenumbers
  let photos = [];
  // Determine random number of photos for each restaurant (15-25)
  const photosPerRestaurant = Math.floor(Math.random() * 10 + 15 + 1);
  // run while loop until photo array's length is equal to photosPerRestaurant
  while (photos.length < photosPerRestaurant) {
    // generate file number between 0-332
    const fileNum = Math.floor(Math.random() * 333);
    // create a new filename string - example: '0001' OR '0010' OR '0100'
    const filename = fileNum.toString().padStart(4, '0');
    if (!photos.includes(filename)) {
      photos.push(filename);
    }
  }

  // join photo array into string, each photo separated by a colon
  photos = photos.join(':');
  // add photos to restaurant data string
  restaurantData += `${photos}\n`;

  // write restaurant data to file
  writeStream.write(restaurantData, 'utf8');
}

writeStream.on('finish', () => {
  console.log(`Wrote ${target} records to ./__data.csv`);
});

writeStream.end();

console.timeEnd('Data Generation');
