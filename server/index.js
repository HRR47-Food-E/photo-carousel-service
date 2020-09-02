/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const cors = require('cors');
const db = require('./database/postgres/queryHandlers.js');
// const db = require('./database/mongo/queryHandlers.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/:id', express.static('public'));

// API ROUTES
app.get('/restaurant/:id', (req, res) => {
  console.time('GET');
  db.findRestaurant(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(`An internal error occurred: ${err}`);
    } else {
      res.status(200).send(data);
    }
    console.timeEnd('GET');
  });
});

app.post('/restaurant', (req, res) => {
  db.addRestaurant(req.body, (err, data) => {
    if (err) {
      res.status(500).send(`An internal error occurred: ${err}`);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on ${port}`);
});
