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

// ------------------------------------

// Login
databaseApi.post('/login', function(req, res) {
    var cardholderLoginInfo = req.body;

    if (!cardholderLoginInfo.cardNumber || !cardholderLoginInfo.pinCode) {
        res.json({'error': 'login or pincode is empty'});
        res.end();
        return;
    }

    var cardholder = db('card-holder').find({ 'cardNumber': cardholderLoginInfo.cardNumber });
    if (typeof cardholder !== 'undefined') {
        if (cardholder.pinCode == auth.encryptPinCode(cardholderLoginInfo.pinCode)) {
            // authentication success
            res.json({'cardholder': cardholder});
            res.end();
        } else {
            // authentication fail: login or pass incorrect
            res.json({'error': 'login or pass incorrect'});
            res.end();
        }
    } else {
        res.json({'error': 'cardholder not found'});
        res.end();
    }
});

// Retrieve cardholder by card number
databaseApi.get('/:cardNumber', function(req, res) {
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

// Update cardholder
databaseApi.put('/:cardNumber', function(req, res) {
    var cardNumber = parseInt(req.params.cardNumber);
    var updatedCardholder = req.body; // bodyParser have already parsed json string to object
    var existingCardholder = db('card-holder').find({ 'cardNumber': cardNumber});
    if (!existingCardholder) {
        res.end({ error: 'Trying to update non-existing cardholder with cardNumber = ' + cardNumber });
    } else {
        // update cardholder in db
        db('card-holder').chain()
          .find({ cardNumber: cardNumber })
          .assign(updatedCardholder)
          .value();

        res.end();
    }
});
