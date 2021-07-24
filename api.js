const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const today = new Date();

const Accident = require('./models/models');
const { isObject } = require("lodash");
const AccidentStage = require("./models/models");
const { response } = require("express");

require('dotenv').config();

const dbURI = process.env.dbURI;

// the express app
const app = express();


// set up body parser
app.use(bodyParser.json());

// set up morgan for console entries
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT || 4000, function(){
    console.log('app is now listening for requests and is connected to mongodb');
}))
  .catch(err => console.log(err));

  mongoose.Promise = global.Promise;
  

// app.get('/', (request, response)=>{
//   const acc = new Accident({
//     Date: today.getDate(),
//     Type: 'Gas',
//     Location: 'Delhi',
//     Company: 'abc inc',
//     Deaths: 3,
//     Injured: 2,
//     Source: 'source'
//   });
//   acc.save()
//     .then(result => {
//       console.log(result);
//       response.send('done');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });


app.get('/', (request, response)=> {

  var Options = {
    Type: request.query.type || null,
    Location: request.query.location || null,
    Company: request.query.company || null
  };

  var limit = Number(request.query.limit) || 10;
  var offset = Number(request.query.offset) || 0;
  
  var sort = request.query.sortBy || "Date";
  var sortType = request.query.sortType || -1;
  
  var filters = {};

  for(const [key, value] of Object.entries(Options)){
    if(value != null){
      filters[key] = new RegExp(value,'i');
    }
  }

  Accident.find(filters).sort([[sort, sortType]])
  .skip(offset).limit(limit).exec().then(
    (result) =>{
      Accident.find(filters).countDocuments().exec().then(
        (res)=>{
          response.json({data:result,count:res});
          
      }).catch((e)=>{
        console.log("[Error] An error occured");
        console.log(e);
        response.json({'message': 'error occured'});
      })
    }
  ).catch((e) =>{
    console.log("[Error] An error occured");
    console.log(e);
    response.json({'message': 'error occured'});
  });

});


app.post('/', (request, res)=> {

  try{
    var Type = request.body.type || res.send({'message':'invalid data'});
    var Location = request.body.location || res.send({'message':'invalid data'});
    var Company = request.body.company || res.send({'message':'invalid data'});
    var Date = request.body.date || res.send({'message':'invalid data'});
    var Deaths = request.body.deaths || res.send({'message':'invalid data'});
    var Injured = request.body.injured || res.send({'message':'invalid data'});
    var Court = request.body.court || '';
    var News = request.body.news || '';
    var Report = request.body.report || '';
  }
  catch(e){
    console.log(e);
    res.end();
  }
    

  const acc = new Accident({
        Date: Date,
        Type: Type,
        Location: Location,
        Company: Company,
        Deaths: Deaths,
        Injured: Injured,
        Source: [Court, News, Report]
      });
      acc.save()
        .then(result => {
          console.log(result);
          response.send('added record to the database');
        })
        .catch(err => {
          console.log(err);
        });

});

app.get('/group',(req,response)=>{
  var group = req.query.group;
  var startDate = req.query.startDate || "1000-01-01";
  var endDate = req.query.endDate || "3000-01-01";
  startDate = startDate + "T00:00:00.000Z";
  endDate = endDate + "T00:00:00.000Z";
  if(group){
    Accident.aggregate([
      {$match:{
        Date: {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
      }
      }},
      {$group:{_id:`$${group}`, count:{$sum:1}}}
    ]).exec().then(
      (result) =>{
         response.json({data:result});
      }
    ).catch((e) =>{
      console.log("[Error] An error occured");
      console.log(e);
      response.json({'message': 'error occured'});
    });
  }
})


app.post('/form',(req,res)=>{
  try {
    const acc = new AccidentStage(req.body);
    acc.save()
    .then(result => {
      console.log(result);
      res.send('added record to the database');
    })
  }
  catch(e){
    console.log(e);
    res.send('error encountered please check fields');
  }
})