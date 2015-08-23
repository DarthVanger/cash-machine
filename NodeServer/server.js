var express = require('express');
var bodyParser = require('body-parser'); // body parser for parsing POST data from request body
var fs = require('fs');
var serverConfig = require('../server-config');
var auth = require('./auth');

// use file database
var low = require('lowdb')
var db = low('db.json')

var app = express();
var cashMachine = express();
var databaseApi = express();

// express will serve static files from 'Angular/app' dir
cashMachine.use(express.static('../Angular/app'));

// parsing body as application/json
databaseApi.use(bodyParser.json());

// mount the interface and the database api servers
app.use(serverConfig.siteBaseUrl + '/', cashMachine);
app.use(serverConfig.siteBaseUrl + '/database/cardholder', databaseApi);

app.listen(serverConfig.port);
console.log('Listening to port ' + serverConfig.port);

// ---------------------------------

// serve index.html for cashMachine
cashMachine.get('/', function(req, res) {
    var indexHtmlPath =  __dirname + '/../Angular/app/index.html';
    fs.readFile(indexHtmlPath, 'utf8', function (err, data) {
        if (err) console.log(err);
        res.type('text/html');
        res.send(data);
    });
});

// serve 'server-config.js' for Angular to know what server base-url is
cashMachine.get('/server-config.js', function(req, res) {
    var serverConfigFilePath =  __dirname + '/../server-config.js';
    fs.readFile(serverConfigFilePath, 'utf8', function (err, data) {
        if (err) console.log(err);
        res.type('application/javascript');
        res.send(data);
    });
});

// Login
databaseApi.post('/login', function(req, res) {
    console.log('trying to login carholder');
    var cardholderLoginInfo = req.body;

    if (!cardholderLoginInfo.cardNumber || !cardholderLoginInfo.pinCode) {
        res.json({'error': 'login or pincode is empty'});
        res.end();
        return;
    }

    var cardholder = db('card-holder').find({ 'cardNumber': cardholderLoginInfo.cardNumber });
    if (typeof cardholder !== 'undefined') {
        console.log('cardholder: ', cardholder);
        console.log('cardholder.pinCode = ' + cardholder.pinCode);
        if (cardholder.pinCode == auth.encryptPinCode(cardholderLoginInfo.pinCode)) {
            res.json({'token': auth.generateToken()});
            res.end();
        } else {
            res.json({'error': 'login or pass incorrect'});
            res.end();
        }
    } else {
        res.json({'error': 'cardholder not found'});
        res.end();
    }
});

// Retrieve card holder by card number
databaseApi.get('/:cardNumber', function(req, res) {
    console.log('trying to find carholder with cardNumber = ' + req.params.cardNumber);
    var cardNumber = parseInt(req.params.cardNumber);
    var cardholder = db('card-holder').find({ 'cardNumber': cardNumber });
    if (typeof cardholder !== 'undefined') {
        res.json(cardholder);
        res.end();
    } else {
        res.json({error: 'can\'t find cardholder with cardNumber = ' + cardNumber});
        res.end();
    }
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
