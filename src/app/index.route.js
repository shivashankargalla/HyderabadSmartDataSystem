(function () {
  'use strict';

  angular
    .module('ta-nsds-ui')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/modules/auth/login.html',
        controller: 'AuthController',
        controllerAs: 'auth'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/modules/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('ministry-of-interior', {
        url: '/ministry-of-interior',
        templateUrl: 'app/modules/ministry-of-interior/ministry-of-interior.html',
        controller: 'MinistryOfInteriorController',
        controllerAs: 'interior'
      })
      .state('ministry-of-energy', {
        url: '/ministry-of-energy',
        templateUrl: 'app/modules/ministry-of-energy/ministry-of-energy.html',
        controller: 'MinistryOfEnergyController',
        controllerAs: 'energy'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
