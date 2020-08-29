/* eslint-disable no-console */
const fs = require('fs');
const readline = require('readline');

console.time('Read Data');

// setup read stream to read file by line
const readStream = readline.createInterface({
  input: fs.createReadStream('./__dataTest.csv'),
});

// console.log each line
readStream.on('line', (line) => {
  console.log(JSON.parse(line));
});

console.timeEnd('Read Data');
