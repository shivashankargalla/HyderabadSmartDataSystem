(function () {
  'use strict';

  angular
    .module('ta-nsds-ui')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 2,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      timeOut: 9000,
      preventOpenDuplicates: false,
      target: 'body',
      progressBar: true
    });

  }

})();
