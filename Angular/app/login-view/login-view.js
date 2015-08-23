'use strict';

angular.module('cashMachine.loginView', [
    'ngRoute',
    'cashMachine.entity.cardholder'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login-view', {
    templateUrl: 'login-view/login-view.html',
    controller: 'LoginViewCtrl'
  });
}])

.controller('LoginViewCtrl', ['$scope', '$location', 'Cardholder', 'AuthToken', function($scope, $location, Cardholder, AuthToken) {

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
            Cardholder.login($scope.cardholderInfo).$promise
                .then(function (result) {
                    if (!result.error) {
                        console.log('success!');
                        console.log('result:', result);
                        AuthToken = result.token;
                        $scope.authenticationError = null;
                        $location.path('/cardholder-home');
                    } else {
                        console.log(result.error);
                        $scope.authenticationError = { message: 'Card number or pincode is incorrect' };
                    }
                })
                .catch(function (error) {
                    console.log('error logging in:');
                    console.log(error);
                });

        } else {
            console.log('form invalid! :)');
        }
    };
}]);
