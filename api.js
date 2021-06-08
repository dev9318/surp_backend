const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const today = new Date();

const Accident = require('./models/models');

require('dotenv').config();

const dbURI = process.env.dbURI;

// the express app
const app = express();


// set up body parser
app.use(bodyParser.json());

// set up morgan for console entries
app.use(morgan('dev'));

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.port || 4000, function(){
    console.log('app is now listening for requests and is connected to mongodb');
}))
  .catch(err => console.log(err));

app.get('/', (request, response)=>{
  const acc = new Accident({
    Date: today.getDate(),
    Type: 'Gas',
    Location: 'Delhi',
    Company: 'abc inc',
    Deaths: 3,
    Injured: 2,
    Source: 'source'
  });
  acc.save()
    .then(result => {
      console.log(result);
      response.send('done');
    })
    .catch(err => {
      console.log(err);
    });
});