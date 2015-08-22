'use strict';

angular.module('cashMachine.loginView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login-view', {
    templateUrl: 'login-view/login-view.html',
    controller: 'LoginViewCtrl'
  });
}])

.controller('LoginViewCtrl', ['$scope', function($scope) {

    $scope.cardholderInfo = {
        cardNumber: '',
        pinCode: '' 
    };
    
    console.log('login view!');
    $scope.showVirtualKeyboard = function() {
        $('.pin-code-keyboard-modal').show();
    };

    $scope.hideVirtualKeyboard = function() {
        $('.pin-code-keyboard-modal').hide();
    };

    /**
     * Is called from pin-code-keyboard directive
     */
    $scope.pinCodeWasEntered = function(pinCode) {
        $scope.hideVirtualKeyboard();
        $scope.cardholderInfo.pinCode = pinCode;
    };

    $scope.submitLogin = function() {
        if ($scope.cardholderLoginForm.$valid) {
            console.log('submittting! :)');
            console.log('cardholder info:');
            console.log($scope.cardholderInfo);
        } else {
            console.log('form invalid! :)');
        }
    };
}]);
