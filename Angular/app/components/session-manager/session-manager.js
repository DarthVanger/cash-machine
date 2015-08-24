'use strict';

angular.module('cashMachine.sessionManager', [
    'cashMachine.sessionStorage'
])

.factory('SessionManager', ['SessionStorage', function(SessionStorage) {
    return {
        userIsLogged: function() {
            return !!SessionStorage.getItem('cardholder');
        }
    };
}]);
