const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.dbURI;

// the express app
const app = express();


// set up body parser
app.use(bodyParser.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.port || 4000, function(){
    console.log('app is now listening for requests and is connected to mongodb');
}))
  .catch(err => console.log(err));

