'use strict';

if (typeof serverConfig === 'undefined') {
    throw 'serverConfig is undefined. You need to edit "/server-config.example.js" and rename it to "/server-config.js"';
}

// Declare app level module which depends on views, and components
angular.module('cashMachine', [
  'ngRoute',
  'cashMachine.loginView',
  'cashMachine.cardholderHomeView',
  'cashMachine.pinCodeKeyboard',
  'cashMachine.entity.cardholder',
  'cashMachine.resource.cardholderResource',
  'cashMachine.sessionStorage'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]).
value('AuthToken', '').
constant('ServerConfig', serverConfig);
