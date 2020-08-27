/* eslint-disable no-console */
const fs = require('fs');

const writeStream = fs.createWriteStream('./__data.txt');

for (let i = 0; i < 10000000; i += 1) {
  writeStream.write(`testing ${i},`, 'utf8');
}

writeStream.on('finish', () => {
  console.log('Wrote all data to file');
});

writeStream.end();
