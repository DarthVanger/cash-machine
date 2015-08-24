var low = require('lowdb')
var db = low('db.json')


//var cardholder = db('card-holder').find({ 'cardNumber': 1234 });
var cardholder =  {
  cardNumber: 1234,
  pinCode: '7110eda4d09e062aa5e4a390b0a572ac0d2c0220',
  name: 'John Doe',
  balance: 3000 
}

db('card-holder').find({ cardNumber: cardholder.cardNumber }); 

db('card-holder').chain()
  .find({ cardNumber: cardholder.cardNumber })
  .assign(cardholder)
  .value();
