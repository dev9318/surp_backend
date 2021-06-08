const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbURI = process.env.dbURI;

// the express app
const app = express();


// set up body parser
app.use(bodyParser.json());


app.listen(process.env.port || 4000, function(){
    console.log('app is now listening for requests');
});