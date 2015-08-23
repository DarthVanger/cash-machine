/**
 * Create initial card-holder database
 */

var low = require('lowdb')
var db = low('db.json')
var auth = require('./auth');

var cardHolders = [
    {
        'cardNumber': 1234,
        'pinCode': auth.encryptPinCode(1234),
        'name': 'John Doe',
        'balance': 2000
    },
    {
        'cardNumber': 2345,
        'pinCode': auth.encryptPinCode(2345),
        'name': 'Alan Smith',
        'balance': 5000
    },
    {
        'cardNumber': 3456,
        'pinCode': auth.encryptPinCode(3456),
        'name': 'Chuck Morris',
        'balance': 10000
    }
];

for (var i=0; i<cardHolders.length; i++) {
    db('card-holder').push(cardHolders[i]);
}
