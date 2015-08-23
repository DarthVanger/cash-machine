'use strict';

angular.module('cashMachine.sessionStorage', [])
    .factory('SessionStorage', [function() {
        return {
            setItem: function(key, value) {
                sessionStorage.setItem(key, JSON.stringify(value));
            },
            getItem: function(key) {
                return JSON.parse(sessionStorage.getItem(key));
            }
        };
    }]);
