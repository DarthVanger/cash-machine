'use strict';

/**
 * NOT USED
 * TODO: delete this if turns out that it's not going to be used in future
 */

angular.module('cashMachine.entity.cardholder', [])
    .factory('Cardholder', [function() {
        return {
            cardNumber: null,
            pinCode: null,
            balance: null
        };
    }]);
