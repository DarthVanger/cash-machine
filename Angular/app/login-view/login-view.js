'use strict';

angular.module('cashMachine.loginView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login-view', {
    templateUrl: 'login-view/login-view.html',
    controller: 'LoginViewCtrl'
  });
}])

.controller('LoginViewCtrl', ['$scope', function($scope) {
    console.log('login view!');
    //$scope.cardholderInfo = {
    //    cardNumber: 12,
    //    pinCode: 24
    //};
}]);
