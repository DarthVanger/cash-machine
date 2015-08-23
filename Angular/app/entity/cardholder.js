'use strict';

angular.module('cashMachine.entity.cardholder', ['ngResource'])
    .factory('Cardholder', function($resource) {
        return $resource('/database/cardholder/:cardNumber', null, {
            login: {
                method: 'POST',
                url: '/database/cardholder/login'
            }
        });
    });
