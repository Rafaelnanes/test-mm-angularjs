angular.module('myApp').directive('uiNavigation', mhNavigation);

function mhNavigation() {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/navigation/ui-navigation.html'
  };
}