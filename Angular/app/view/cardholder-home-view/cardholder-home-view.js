'use strict';

angular.module('cashMachine.cardholderHomeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cardholder-home', {
    templateUrl: 'view/cardholder-home-view/cardholder-home-view.html',
    controller: 'CardholderHomeViewCtrl'
  });
}])

.controller('CardholderHomeViewCtrl', ['CardholderResource', 'SessionStorage', function(CardholderResource, SessionStorage) {
    var cardholder = SessionStorage.getItem('cardholder');
    console.log('CardholderHomeViewCtrl');
    console.log('cardholder:', cardholder);
    console.log('cardholder.cardNumber:', cardholder.cardNumber);
    //CardholderResource.get({ cardNumber: Cardholder.cardNumber }).$promise
    //    .then(function (result) {
    //        console.log('cardholder get succes!');
    //        console.log('result:');
    //        console.log(result);
    //    })
    //    .catch(function (error) {
    //        console.log('error getting cardholder:');
    //        console.log(error);
    //    });
}]);
