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

    if (SessionManager.userIsLogged()) {
        $location.path('/cardholder-home');
    };

    $scope.cardholder = {
        cardNumber: '',
        pinCode: ''
    };
    
    $scope.showVirtualKeyboard = function() {
        $('.pin-code-keyboard-modal').modal('show');
    };

    $scope.hideVirtualKeyboard = function() {
        $('.pin-code-keyboard-modal').modal('hide');
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
            CardholderResource.login($scope.cardholder).$promise
                .then(function (result) {
                    if (!result.error) {
                        SessionManager.startSession(result.cardholder);
                        $location.path('/cardholder-home');
                    } else {
                        $scope.authenticationError = { message: 'Card number or pincode is incorrect' };
                    }
                })
                .catch(function (error) {
                    $scope.formServerError = true;
                    console.log('server error logging in:');
                    console.log(error);
                });

        } else {
            console.log('form invalid!');
        }
    };
}]);
