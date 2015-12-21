(function() {
  'use strict';
  angular.module('tcUIComponents').directive('challengeLinks', function() {
    return {
      restrict: 'E',
      transclude: false,
      replace: true,
      template: require('./challenge-links')(),
      scope: {
        challenge: '=',
        view: '='
      },
      controller: ['$log', '$scope', '$element', '$window',
        function($log, $scope, $element, $window) {

          activate();

          function activate() {
            //nothing to do as of now
          }
      }]
    };
  });
})();
