var sha1 = require('sha1');
var _ = require('lodash');

var auth = function() {
    this.activeTokens = [];
};

auth.prototype.encryptPinCode = function(pinCode) {
    return sha1(pinCode.toString());
};

module.exports = new auth();
