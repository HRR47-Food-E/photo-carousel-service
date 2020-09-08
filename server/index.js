/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const cors = require('cors');
const db = require('./database/postgres/queryHandlers.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/:id', express.static('public'));

// API ROUTES //

// Get restaurant data by ID
app.get('/restaurant/:id', (req, res) => {
  // console.time('GET');
  db.findRestaurant(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(`An internal error occurred: ${err}`);
    } else {
      res.status(200).send(data);
    }
    // console.timeEnd('GET');
  });
});

// Create new restaurant
app.post('/restaurant', (req, res) => {
  // console.time('POST');
  db.addRestaurant(req.body, (err) => {
    if (err) {
      res.status(500).send(`An internal error occurred: ${err}`);
    } else {
      res.sendStatus(201);
    }
    // console.timeEnd('POST');
  });
});

// Update restaurant by ID
app.put('/restaurant/:id', (req, res) => {
  // console.time('PUT');
  db.updateRestaurant(req, (err) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err}`);
    } else {
      res.status(200).send(`Restaurant ${req.params.id} has been updated with the name: ${req.body.name}`);
    }
    // console.timeEnd('PUT');
  });
});

// Delete restaurant by ID
app.delete('/restaurant/:id', (req, res) => {
  // console.time('DELETE');
  db.deleteRestaurant(req, (err) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err}`);
    } else {
      res.status(200).send(`Restaurant ${req.params.id} has been deleted`);
    }
    // console.timeEnd('DELETE');
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${port}`);
});
