/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');

console.time('Data Generation');

const writeStream = fs.createWriteStream('./__data.csv');

const target = 10000000;

for (let i = 1; i <= target; i += 1) {
  // Create object to store restaurant data
  let restaurantData = '';
  // Generate random fake restaurant name
  let name = faker.company.companyName();
  name = name.split('');
  if (name.includes(',')) {
    name.splice(name.indexOf(','), 1);
  }
  name = name.join('');
  restaurantData += `${name},`;
  // Create array to store photo filenames
  let photos = [];
  // Determine random number of photos for each restaurant (15-25)
  const photosPerRestaurant = Math.floor(Math.random() * 10 + 15 + 1);

  // run while loop until photos length is equal to photosPerRestaurant
  while (photos.length < photosPerRestaurant) {
    // generate file number between 0-332
    const fileNum = Math.floor(Math.random() * 333);
    // create a new filename - example: img0001.jpeg OR img0010.jpeg OR img0100.jpeg
    let filename;
    if (fileNum < 10) {
      filename = `000${fileNum}`;
    } else if (fileNum < 100) {
      filename = `00${fileNum}`;
    } else {
      filename = `0${fileNum}`;
    }
    // check if photos array contains filename already, push if not
    if (!photos.includes(filename)) {
      photos.push(filename);
    }
  }

  // attach photos to restaurant data object
  photos = photos.join(':');
  restaurantData += `${photos}\n`;

  // write restaurant Data to file as a JSON string
  writeStream.write(restaurantData, 'utf8');
}

writeStream.on('finish', () => {
  console.log(`Wrote ${target} records to ./__data.csv`);
});

writeStream.end();

console.timeEnd('Data Generation');
