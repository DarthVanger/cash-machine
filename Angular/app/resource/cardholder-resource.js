'use strict';

angular.module('cashMachine.resource.cardholderResource', ['ngResource'])
    .factory('CardholderResource', ['ServerConfig', '$resource', function(ServerConfig, $resource) {
        return $resource(ServerConfig.siteBaseUrl + '/database/cardholder/:cardNumber', null, {
            update: {
                method: 'PUT'
            },
            login: {
                method: 'POST',
                url: ServerConfig.siteBaseUrl + '/database/cardholder/login'
            }
        });
    }]);
