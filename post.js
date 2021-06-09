const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const csv = require('csv-parser');
const fs = require('fs');

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
    fs.createReadStream('loa.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
        const acc = new Accident({
                Date: row.DATE,
                Type: row.ACCIDENT,
                Location: row.Location,
                Company: row['Company/Firm/Association'],
                Deaths: row.Deaths,
                Injured: row.Injured,
                Source: [row['Court Proceedings'],row['News Source'],row['Official Report']]
              });
              acc.save()
                .then(result => {
                  console.log(result);
                  response.send('done');
                })
                .catch(err => {
                  console.log(err);
                });
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
}))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;



  app.get('/', (request, response)=> {

    
  
  });