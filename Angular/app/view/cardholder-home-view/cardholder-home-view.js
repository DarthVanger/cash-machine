'use strict';

angular.module('cashMachine.cardholderHomeView', [
    'ngRoute',
    'cashMachine.sessionManager',
    'cashMachine.sessionStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cardholder-home', {
    templateUrl: 'view/cardholder-home-view/cardholder-home-view.html',
    controller: 'CardholderHomeViewCtrl'
  });
}])

.controller('CardholderHomeViewCtrl', ['$location', '$scope', 'CardholderResource', 'SessionStorage', 'SessionManager', function($location, $scope, CardholderResource, SessionStorage, SessionManager) {
    if (!SessionManager.userIsLogged()) {
        $location.path('/login');
    } else {
        $scope.cardholder = SessionStorage.getItem('cardholder');
    }

    console.log('CardholderHomeViewCtrl');
    console.log('cardholder:', $scope.cardholder);

    $scope.logout = function() {
        SessionStorage.removeItem('cardholder');
        $location.path('/login');
    };
}]);
