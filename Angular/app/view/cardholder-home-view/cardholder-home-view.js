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

    $scope.logout = function() {
        SessionManager.logout();
        $location.path('/login');
    };
}]);
