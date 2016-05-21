(function () {
  'use strict';

  angular
    .module('ta-nsds-ui.ministry-of-energy')
    .factory('MinistryOfEnergyFactory', MinistryOfEnergyFactory);

  /** @ngInject */
  function MinistryOfEnergyFactory($resource, $q, urls,$log) {

    var getBarChartData = function (ipObj) {
      var defer = $q.defer();
      $resource(urls.apiUrl + urls.linechart, null)
        .save({index: 'energy'}, ipObj, function (response) {
          defer.resolve(response);
        }, function (error) {
          defer.reject(error);
        });
      return defer.promise;
    };

    var getMetricData = function (ipObj) {
      var defer = $q.defer();
      $resource(urls.apiUrl + urls.metric, null)
        .save({index: 'energy'}, ipObj, function (response) {
          defer.resolve(response);
        }, function (error) {
          defer.reject(error);
        });
      return defer.promise;
    };

    var getSearchData = function (ipObj) {
      var defer = $q.defer();
      $resource(urls.apiUrl + urls.search, null)
        .save({index: 'energy'}, ipObj, function (response) {
          defer.resolve(response);
        }, function (error) {
          defer.reject(error);
        });
      return defer.promise;
    };

    var getSearchPremiseData = function (premiseNo) {
      var defer = $q.defer();
      $resource(urls.apiUrl + urls.searchpremise, null)
        .get({premise: premiseNo}, {}, function (response) {
          defer.resolve(response);
        }, function (error) {
          defer.reject(error);
        });
      return defer.promise;
    };

    return {
      getBarChartData: getBarChartData,
      getMetricData: getMetricData,
      getSearchData: getSearchData,
      getSearchPremiseData: getSearchPremiseData
    }
  }

})();
