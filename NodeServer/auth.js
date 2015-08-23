var sha1 = require('sha1');

var auth = function() {};

auth.prototype.encryptPinCode = function(pinCode) {
    return sha1(pinCode.toString());
};

auth.prototype.generateToken = function() {
    return sha1(Math.floor(Math.random() * 1000));
};

module.exports = new auth();
