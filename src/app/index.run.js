(function() {
  'use strict';

  angular
    .module('ta-nsds-ui')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
