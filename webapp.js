var express = require('express')
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


var app = express()
var db;

app.get('/api/bugs', function(req, res) {
  db.collection("bugs").find().toArray(function(err, docs) {
    if(err){console.log(err)};
    res.json(docs);
  });
});

app.use(bodyParser.json()); // for parsing application/json
app.post('/api/bugs/', function(req, res) {
  var newBug = req.body;
  db.collection("bugs").insertOne(newBug, function(err, result) {
    var newId = result.insertedId;
   db.collection("bugs").find({_id: newId}).next(function(err, doc) {
      res.json(doc);
    });
  });
});



MongoClient.connect('mongodb://localhost/bugsdb', function(err, dbConnection) {
  db = dbConnection;
  assert.equal(null, err);
  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
})

app.use(express.static('static'))
