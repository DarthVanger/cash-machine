'use strict';

angular.module('cashMachine.entity.cardholder', ['ngResource'])
    .factory('Cardholder', ['ServerConfig', '$resource', function(ServerConfig, $resource) {
        return $resource('/database/cardholder/:cardNumber', null, {
            login: {
                method: 'POST',
                url: ServerConfig.siteBaseUrl + '/database/cardholder/login'
            }
        });
    }]);
