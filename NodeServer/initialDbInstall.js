/**
 * Create initial card-holder database
 */

var low = require('lowdb')
var db = low('db.json')

var cardHolders = [
    {
        'card-number': 1234123412341234,
        'pin-code': 1234,
        'name': 'John Doe',
        'balance': 2000
    },
    {
        'card-number': 2345234523452345,
        'pin-code': 2345,
        'name': 'Alan Smith',
        'balance': 5000
    },
    {
        'card-number': 3456345634563456,
        'pin-code': 3456,
        'name': 'Chuck Morris',
        'balance': 10000
    }
];

for (var i=0; i<cardHolders.length; i++) {
    db('card-holder').push(cardHolders[i]);
}
