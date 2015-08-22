var express = require('express');
//var bodyParser = require('body-parser'); // body parser for parsing POST data from request body
var fs = require('fs');
var config = require('./config');

// use file database
var low = require('lowdb')
var db = low('db.json')

var app = express();
var cashMachine = express();
var databaseApi = express();

// express will serve static files from 'Angular/app' dir
cashMachine.use(express.static('../Angular/app'));

// parsing body as application/json
//databaseApi.use(bodyParser.json());

// mount the interface and the database api servers
app.use(config.serverBaseUrl + '/', cashMachine);
app.use(config.serverBaseUrl + '/bank-database', databaseApi);

app.listen(config.serverPort);
console.log('Listening to port ' + config.serverPort);

// ---------------------------------

// serve index.html for cashMachine
cashMachine.get('/', function(req, res) {
    var indexHtmlPath =  __dirname + '/../Angular/app/index.html';
    fs.readFile(indexHtmlPath, 'utf8', function (err, data) {
        res.type('text/html');
        res.send(data);
    });
});

// Retrieve card holder by card number
databaseApi.get('/:cardNumber', function(req, res) {
    var cardHolder = db('card-holder').find({ 'card-number': cardNumber });
    res.json(cardHolder);
    res.end();
});

/*

// Create item
databaseApi.post('/:entityName', function(req, res) {
    var entityName = req.params.entityName;
    var entityObject = req.body.entity; // bodyParser have already parsed json string to object
    JsonFileDb.save(entityName, entityObject)
        .then(function(id) {
            res.status(200);
            var jsonResponse = {'id': id};
            res.end(JSON.stringify(jsonResponse));
        })
        .fail(function(error) {
            res.status(500);
            var jsonResponse = {'error': error};
            res.end(JSON.stringify(jsonResponse));
        });
});
*/
