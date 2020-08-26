const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const cors = require('cors');
const db = require('./database/database.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/:id', express.static('public'));

// API ROUTES
app.get('/api/photos/:restaurantID', (req, res) => {
  db.retrieveImages(req.params.restaurantID, req, res);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${port}`);
});
