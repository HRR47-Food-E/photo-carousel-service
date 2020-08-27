/* eslint-disable no-console */
const fs = require('fs');

console.time('Data Generation');

const writeStream = fs.createWriteStream('./__data.csv');

for (let i = 0; i < 100; i += 1) {
  writeStream.write(`testing ${i},`, 'utf8');
}

writeStream.on('finish', () => {
  console.log('Wrote all data to file');
});

writeStream.end();

console.timeEnd('Data Generation');
