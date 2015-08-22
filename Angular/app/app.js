'use strict';

// Declare app level module which depends on views, and components
angular.module('cashMachine', [
  'ngRoute',
  'cashMachine.loginView',
  'cashMachine.cardholderHomeView',
  'cashMachine.pinCodeKeyboard',
  'cashMachine.entity.cardholder'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login-view'});
}]);
