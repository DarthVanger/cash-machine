'use strict';

angular.module('cashMachine.entity.cardholder', ['ngResource'])
    .factory('Cardholder', function($resource) {
        return $resource('/database/cardholder/:cardNumber');
    });
