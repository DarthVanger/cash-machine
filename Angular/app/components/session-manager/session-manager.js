'use strict';

angular.module('cashMachine.sessionManager', [
    'cashMachine.sessionStorage'
])

.factory('SessionManager', ['SessionStorage', function(SessionStorage) {
    return {
        startSession: function(cardholder) {
            SessionStorage.setItem('cardholder', cardholder);
        },
        userIsLogged: function() {
            return !!SessionStorage.getItem('cardholder');
        },
        logout: function() {
            SessionStorage.removeItem('cardholder');
        }
    };
}]);
