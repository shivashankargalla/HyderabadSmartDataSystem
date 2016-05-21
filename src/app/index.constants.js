/* global malarkey:false, moment:false */
(function () {
  'use strict';

  angular
    .module('ta-nsds-ui')
    .constant('urls', {
      apiUrl: 'http://52.4.29.55:8080/',
      //apiUrl: 'http://172.168.1.233:8080/',
      //apiUrl: 'http://172.168.1.31:8080/',
      piechart: 'piechart',
      linechart: 'linechart',
      metric: 'metric',
      search: 'search',
      searchpremise: 'searchpremise'
    });

})();
