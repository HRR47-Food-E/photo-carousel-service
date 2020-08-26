const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'zagatPhotoCarousel',
});

connection.connect();

const insertRestaurant = function insertRestaurantIntoDb(name, restaurantID) {
  const insertString = `INSERT into Restaurants (Restaurant_Name, Restaurant_id) values ("${name}", ${restaurantID})`;
  connection.query(insertString, (err) => {
    if (err) {
      throw err;
    }
  });
};

const insertImage = function insertImageIntoDb(imageURL, restaurantID) {
  const insertString = `INSERT into Images (Image_url, Restaurant_id) values ('${imageURL}', ${restaurantID})`;
  connection.query(insertString, (err) => {
    if (err) {
      throw err;
    }
  });
};

const retrieveImages = function retrieveImagesByRestaurantId(restaurantID, req, res) {
  const responseData = {};
  const retrieveString = `SELECT Image_url FROM Images WHERE Restaurant_id = ${restaurantID}`;
  connection.query(retrieveString, (photoErr, result) => {
    if (photoErr) {
      res.send('Photos not found for that restaurant');
      // I'll update error handling once I decide what my front end should do in this situation
      return;
    }
    // lint doesn't like it if you try to assign new values to result directly (no-param-reassign)
    const s3Prefix = 'https://tagaz.s3-us-west-1.amazonaws.com/';
    const photoArray = result;
    for (let i = 0; i < photoArray.length; i += 1) {
      photoArray[i].Image_id = i + 1;
      photoArray[i].Image_url = s3Prefix.concat(photoArray[i].Image_url);
    }
    responseData.photoArray = photoArray;
    const retrieveNameString = `SELECT Restaurant_Name from Restaurants WHERE Restaurant_id = ${restaurantID}`;
    connection.query(retrieveNameString, (nameErr, name) => {
      if (nameErr) {
        res.send('Error retrieving restaurant name');
        return;
      }
      responseData.name = name[0].Restaurant_Name;
      res.send(responseData);
    });
  });
};

module.exports.insertRestaurant = insertRestaurant;
module.exports.insertImage = insertImage;
module.exports.retrieveImages = retrieveImages;
