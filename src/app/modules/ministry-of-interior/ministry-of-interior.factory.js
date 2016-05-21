(function () {
  'use strict';

  angular
    .module('ta-nsds-ui.ministry-of-interiors')
    .factory('MinistryOfInteriorsFactory', MinistryOfInteriorsFactory);

  /** @ngInject */
  function MinistryOfInteriorsFactory($resource, $q, urls) {

    var getPieChartData = function (ipObj) {
      var defer = $q.defer();

      $resource(urls.apiUrl + urls.piechart, null)
        .save({index: 'interior'}, ipObj, function (data) {
          defer.resolve(data);
        }, function (error) {
          defer.reject(error);
        });

      return defer.promise;
    };

    var getLineChartData = function (ipObj) {
      var defer = $q.defer();
      $resource(urls.apiUrl + urls.linechart, null)
        .save({index: 'interior'}, ipObj, function (response) {
          defer.resolve(response);
        }, function (error) {
          defer.reject(error);
        });
      return defer.promise;
    };

    var getMetricData = function (ipObj) {
      var defer = $q.defer();
      $resource(urls.apiUrl + urls.metric + '?index=:type', {type: 'interior'}, null)
        .save('', ipObj, function (response) {
          defer.resolve(response);
        }, function (error) {
          defer.reject(error);
        });
      return defer.promise;
    };

    return {
      getPieChartData: getPieChartData,
      getLineChartData: getLineChartData,
      getMetricData: getMetricData
    }
  }

})();
