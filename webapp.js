var express = require('express')
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');


var app = express()
var db;

app.use(bodyParser.json()); // for parsing application/json

/*GET list of bugs*/

app.get('/api/bugs', function(req, res) {
  var filter = {};
  if (req.query.priority)
    filter.priority = req.query.priority;
  if (req.query.status)
    filter.status = req.query.status;
  db.collection("bugs").find(filter).toArray(function(err, docs) {
    if(err){console.log(err)};
    res.json(docs);
  });
});

/* Add a Bug */
app.post('/api/bugs/', function(req, res) {
  var newBug = req.body;
  db.collection("bugs").insertOne(newBug, function(err, result) {
    var newId = result.insertedId;
   db.collection("bugs").find({_id: newId}).next(function(err, doc) {
      res.json(doc);
    });
  });
});

/* GET single bug*/
app.get('/api/bugs/:id', function(req, res) {
  db.collection("bugs").findOne({_id: ObjectId(req.params.id)}, function(err, bug) {
    res.json(bug);
  });
});

/* Modify a bug, given its ID */
app.put('/api/bugs/:id', function(req, res) {
  var bug = req.body;
  console.log("Modifying bug:", req.params.id, bug);
  var id = ObjectId(req.params.id);
  db.collection("bugs").updateOne({_id: id}, bug, function(err, result) {
    db.collection("bugs").find({_id: id}).next(function(err, doc) {
      res.send(doc);
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
