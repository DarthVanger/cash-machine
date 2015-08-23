'use strict';

angular.module('cashMachine.resource.cardholderResource', ['ngResource'])
    .factory('CardholderResource', ['ServerConfig', '$resource', function(ServerConfig, $resource) {
        return $resource('/database/cardholder/:cardNumber', null, {
            login: {
                method: 'POST',
                url: ServerConfig.siteBaseUrl + '/database/cardholder/login'
            },
            checkAuthToken: {
                method: 'POST',
                url: ServerConfig.siteBaseUrl + '/database/cardholder/check-auth-token'
            }
        });
    }]);
