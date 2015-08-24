'use strict';

angular.module('cashMachine.getCashView', [
    'ngRoute',
    'cashMachine.sessionManager',
    'cashMachine.sessionStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/get-cash', {
    templateUrl: 'view/get-cash-view/get-cash-view.html',
    controller: 'GetCashViewCtrl'
  });
}])

.controller('GetCashViewCtrl', ['$scope', '$location','CardholderResource', 'SessionStorage', 'SessionManager', function($scope, $location, CardholderResource,  SessionStorage, SessionManager) {
    var cardholder;

    if (!SessionManager.userIsLogged()) {
        $location.path('/login');
    } else {
        cardholder = SessionStorage.getItem('cardholder');
    }

    $scope.withdrawCash = function(withdrawalAmount) {
        if (withdrawalAmount > cardholder.balance) {
            $scope.notEnoughMoneyError = true;
        } else { // enough money
            $scope.notEnoughMoneyError = false;
            if ($scope.getCashForm.$valid) {
                cardholder.balance -= withdrawalAmount;
                CardholderResource.update({ cardNumber: cardholder.cardNumber }, cardholder).$promise
                    .then(function (result) {
                        if (!result.error) {
                            SessionStorage.setItem('cardholder', cardholder);
                            $scope.withdrawalServerError = false;
                            $scope.withdrawalSuccess = true;
                            $('.cash-withdraw-success-modal').modal('show');
                        } else {
                            console.log('Error saving entity to database. Server error: ', error);
                            $scope.withdrawalServerError = true;
                        }
                    })
                    .catch(function (error) {
                        console.log('Error saving entity. Server error: ', error)
                        $scope.withdrawalServerError = true;
                    });
            }
        }
    };

    // redirect user to 'cardholder-home' view when he closes withdraw success modal
    $('.cash-withdraw-success-modal').on('hidden.bs.modal', function(event) {
        $location.path('/cardholder-home');
        $scope.$apply();
    });
}]);
