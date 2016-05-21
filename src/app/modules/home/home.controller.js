(function () {
  'use strict';

  angular
    .module('ta-nsds-ui.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $rootScope, $state) {

    var vm = this;
    $rootScope.headerTitle = '';
    $scope.changeState = function (toState) {
      $state.go(toState);
    };

  }

})();
