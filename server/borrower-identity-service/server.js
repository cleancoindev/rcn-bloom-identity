// server.js
'use strict';

require('dotenv').config();
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  helmet = require('helmet');

/* APP */
const app = express();
const port = process.env.PORT || 3001;
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* BLOOM */

app.post('/api/receiveData', async (req, res) => {
  try {
    console.log(`Attempting to verify ${JSON.stringify(req.body.data)}`)

    return res.status(200).json({
      success: true,
      body: JSON.stringify(req.body),
    })
  } catch (error) {
    console.log('Encountered an error while receiving data', {
      error,
    })
    return renderError(req, res)(new ClientFacingError('Encountered an error while receiving data'))
  }
})

const server = app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log('Server running on port:', port);
});

module.exports = server;
