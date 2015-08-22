'use strict';

angular.module('cashMachine.pincodeKeyboard.pincodeKeyboard-directive', [])

.directive('pincodeKeyboard', ['pincodeKeyboard', function(pincodeKeyboard) {
  return function(scope, elm, attrs) {
    elm.text(pincodeKeyboard);
  };
}]);
