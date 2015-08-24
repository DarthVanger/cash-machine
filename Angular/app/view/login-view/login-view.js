'use strict';

angular.module('cashMachine.loginView', [
    'ngRoute',
    'cashMachine.pinCodeKeyboard',
    'cashMachine.resource.cardholderResource',
    'cashMachine.sessionManager',
    'cashMachine.sessionStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'view/login-view/login-view.html',
    controller: 'LoginViewCtrl'
  });
}])

.controller('LoginViewCtrl', ['$scope', '$location', 'CardholderResource', 'SessionStorage', 'SessionManager', function($scope, $location, CardholderResource, SessionStorage, SessionManager) {

    console.log('SessionManager', SessionManager);
    if (SessionManager.userIsLogged()) {
        $location.path('/cardholder-home');
    };

    $scope.cardholder = {
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
        $scope.cardholder.pinCode = pinCode;
    };

    $scope.submitLogin = function() {
        if ($scope.cardholderLoginForm.$valid) {
            console.log('submittting! :)');
            console.log('cardholder info:');
            console.log($scope.cardholder);
            CardholderResource.login($scope.cardholder).$promise
                .then(function (result) {
                    if (!result.error) {
                        console.log('success!');
                        console.log('result:', result);
                        $scope.authenticationError = null;
                        SessionStorage.setItem('cardholder', result.cardholder);
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
