var sha1 = require('sha1');
var _ = require('lodash');

var auth = function() {
    this.activeTokens = [];
};

auth.prototype.encryptPinCode = function(pinCode) {
    return sha1(pinCode.toString());
};

auth.prototype.getToken = function() {
    var token = sha1(Math.floor(Math.random() * 1000));
    this.activeTokens.push(token);
    // TODO: setTimeout for token expiration
    return token;
};

auth.prototype.tokenIsActive = function(token) {
    return typeof _.find(this.activeTokens, token) !== 'undefined';
};

module.exports = new auth();
