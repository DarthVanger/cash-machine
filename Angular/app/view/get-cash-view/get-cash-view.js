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
            cardholder.balance -= withdrawalAmount;
            console.log('trying to save cardholder: ', cardholder);
            CardholderResource.save(cardholder).$promise
                .then(function (result) {
                    console.log('success saving entity! Result:', result)
                })
                .catch(function (error) {
                    console.log('error saving entity: ', error)
                });
        }
    };
}]);
