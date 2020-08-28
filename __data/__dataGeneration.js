/* eslint-disable no-console */
const fs = require('fs');
const faker = require('faker');

// RESUME W/ LOOP OF 3, FIGURE OUT WAY TO ADD BRACKETS AND COMMAS LOGICALLY
// TEST WITH 10, 1000, ETC...

console.time('Data Generation');

const writeStream = fs.createWriteStream('./__data.csv');

for (let i = 0; i < 1; i += 1) {
  // Create object to store restaurant data
  const restaurantData = {};
  // Generate random fake restaurant name
  restaurantData.restaurantName = faker.company.companyName();
  // Create array to store photo filenames
  const photos = [];
  // Determine random number of photos for each restaurant (15-25)
  const photosPerRestaurant = Math.floor(Math.random() * 10 + 15 + 1);

  // run while loop until photos length is equal to photosPerRestaurant
  while (photos.length < photosPerRestaurant) {
    // generate file number between 1-52
    const fileNum = Math.floor(Math.random() * 53);
    // create a new filename - example: img0001.jpeg OR img0010.jpeg
    let filename;
    if (fileNum < 10) {
      filename = `img000${fileNum}.jpeg`;
    } else {
      filename = `img00${fileNum}.jpeg`;
    }
    // check if photos array contains filename already, push if not
    if (!photos.includes(filename)) {
      photos.push(filename);
    }
  }

  restaurantData.photos = photos;

  // write restaurant Data to file as a JSON string
  writeStream.write(`${JSON.stringify(restaurantData)},`, 'utf8');
}

writeStream.on('finish', () => {
  console.log('Wrote all data to file');
});

writeStream.end();

console.timeEnd('Data Generation');
