'use strict';

angular.module('cashMachine.cardholderHomeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cardholder-home', {
    templateUrl: 'cardholder-home-view/cardholder-home-view.html',
    controller: 'CardholderHomeViewCtrl'
  });
}])

.controller('CardholderHomeViewCtrl', [function() {

}]);
