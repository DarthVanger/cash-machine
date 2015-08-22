'use strict';

angular.module('cashMachine.pinCodeKeyboard.pinCodeKeyboard-directive', [])

.directive('pinCodeKeyboard', [function() {
    return {
        templateUrl: 'components/pin-code-keyboard/pin-code-keyboard.html',
        link: function(scope, element, attrs) {
            scope.pinCode = '';
            console.log('element:');
            element.find('.js-keyboard-number-btn').on('click', function() {
                scope.pinCode++;
                scope.$apply();
            });

            scope.numberButtonPress = function(number) {
                scope.pinCode += number;
            };

            scope.deleteCharacter = function() {
                scope.pinCode = scope.pinCode.substring(0, scope.pinCode.length - 1);
            }
        }
    };
}]);
