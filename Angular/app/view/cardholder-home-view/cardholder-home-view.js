'use strict';

angular.module('cashMachine.cardholderHomeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cardholder-home', {
    templateUrl: 'view/cardholder-home-view/cardholder-home-view.html',
    controller: 'CardholderHomeViewCtrl'
  });
}])

.controller('CardholderHomeViewCtrl', ['$location', '$scope', 'CardholderResource', 'SessionStorage', function($location, $scope, CardholderResource, SessionStorage) {
    $scope.cardholder = SessionStorage.getItem('cardholder');
    console.log('CardholderHomeViewCtrl');
    console.log('cardholder:', $scope.cardholder);
    if (!$scope.cardholder) {
        $location.path('/login');
    }

    $scope.logout = function() {
        SessionStorage.removeItem('cardholder');
        $location.path('/login');
    };
}]);
