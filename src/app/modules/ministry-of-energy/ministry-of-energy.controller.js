(function () {
  'use strict';

  angular
    .module('ta-nsds-ui.ministry-of-energy')
    .controller('MinistryOfEnergyController', MinistryOfEnergyController);


  /** @ngInject */
  function MinistryOfEnergyController($scope, $rootScope, $timeout, MinistryOfEnergyService, MinistryOfEnergyFactory, $uibModal, $log) {
    var vm = this;
    $rootScope.headerTitle = 'Department of Energy';

    $(function () {

      var barChart = {
        "size": 0,
        "query": {
          "filtered": {
            "query": {
              "query_string": {
                "query": "*",
                "analyze_wildcard": true
              }
            },
            "filter": {
              "bool": {
                "must": [
                  {
                    "range": {
                      "timestamp": {
                        "gte": 1439707204899,
                        "lte": 1447483204899,
                        "format": "epoch_millis"
                      }
                    }
                  }
                ],
                "must_not": []
              }
            }
          }
        },
        "aggs": {
          "2": {
            "date_histogram": {
              "field": "timestamp",
              "interval": "15d",
              "time_zone": "Asia/Kolkata",
              "min_doc_count": 1,
              "extended_bounds": {
                "min": 1439707204899,
                "max": 1447483204899
              }
            },
            "aggs": {
              "3": {
                "terms": {
                  "field": "consumer",
                  "size": 5,
                  "order": {
                    "1": "desc"
                  }
                },
                "aggs": {
                  "1": {
                    "avg": {
                      "field": "consumption"
                    }
                  }
                }
              }
            }
          }
        }
      };

      var lineChart = {
        "size": 0,
        "query": {
          "filtered": {
            "query": {
              "query_string": {
                "query": "*",
                "analyze_wildcard": true
              }
            },
            "filter": {
              "bool": {
                "must": [
                  {
                    "range": {
                      "timestamp": {
                        "gte": 1439712601345,
                        "lte": 1447488601345,
                        "format": "epoch_millis"
                      }
                    }
                  }
                ],
                "must_not": []
              }
            }
          }
        },
        "aggs": {
          "2": {
            "date_histogram": {
              "field": "timestamp",
              "interval": "15d",
              "time_zone": "Asia/Kolkata",
              "min_doc_count": 1,
              "extended_bounds": {
                "min": 1439712601343,
                "max": 1447488601344
              }
            },
            "aggs": {
              "3": {
                "terms": {
                  "field": "consumer",
                  "size": 5,
                  "order": {
                    "_term": "desc"
                  }
                },
                "aggs": {
                  "1": {
                    "cardinality": {
                      "field": "meterNumber"
                    }
                  }
                }
              }
            }
          }
        }
      };

      MinistryOfEnergyFactory
        .getBarChartData(barChart)
        .then(function (data) {
          MinistryOfEnergyService.loadBarChart(data)
        },
        function (error) {
          console.log(error);
        });

      MinistryOfEnergyFactory
        .getBarChartData(lineChart)
        .then(function (data) {
          MinistryOfEnergyService.loadLineChart(data)
        },
        function (error) {
          console.log(error);
        });

      var metricDataResidential = {
        "input": ["avg$consumption"],
        "filter": ["consumer$residential$string"],
        "range": []
      };

      $scope.metric = {};

      MinistryOfEnergyFactory
        .getMetricData(metricDataResidential)
        .then(function (data) {
          $scope.metric.residential = data.avg$consumption;
        },
        function (error) {
          console.log(error);
        });

      var metricDataGovt = {
        "input": ["avg$consumption"],
        "filter": ["consumer$government$string"],
        "range": []
      };

      MinistryOfEnergyFactory
        .getMetricData(metricDataGovt)
        .then(function (data) {
          $scope.metric.govt = data.avg$consumption;
        },
        function (error) {
          console.log(error);
        });

      var metricDataIndustrial = {
        "input": ["avg$consumption"],
        "filter": ["consumer$industrial$string"],
        "range": []
      };

      MinistryOfEnergyFactory
        .getMetricData(metricDataIndustrial)
        .then(function (data) {
          $scope.metric.industrial = data.avg$consumption;
        },
        function (error) {
          console.log(error);
        });

      var metricDataCommercial = {
        "input": ["avg$consumption"],
        "filter": ["consumer$commercial$string"],
        "range": []
      };
      MinistryOfEnergyFactory
        .getMetricData(metricDataCommercial)
        .then(function (data) {
          $scope.metric.commercial = data.avg$consumption;
        },
        function (error) {
          console.log(error);
        });

      var searchObj = {
        "terms": ["consumption$true"],
        "filter": ["consumer$residential$string"],
        "range": ["timestamp$1441126757514$1442422757515$long"],
        "size": "10"
      };

      console.log('called');
      MinistryOfEnergyFactory
        .getSearchData(searchObj)
        .then(function (data) {
          $scope.allSearchData = data;
        },
        function (error) {
          console.log(error);
        });

      $scope.openDetailsModal = function (size) {
        var modalInstance = $uibModal.open({

          animation: true,
          templateUrl: 'app/modules/ministry-of-energy/tenancy-certificate.html',
          controller: ['$scope', '$uibModalInstance', 'tenantDetails', function ($scope, $uibModalInstance, tenantDetails) {
            $scope.tenantDetails = tenantDetails;
            $scope.ok = function () {
              $uibModalInstance.close();
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
          }],
          size: size || 'lg',
          resolve: {
            tenantDetails: function () {
              return $scope.tenantDetails;
            }
          }
        });

        modalInstance.result.then(function () {
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.showDetails = function (obj) {
        MinistryOfEnergyFactory
          .getSearchPremiseData(obj.PremiseNumber)
          //.getSearchPremiseData('36432524')
          .then(function (response) {
            $scope.tenantDetails = response;
            $scope.openDetailsModal();
          },
          function (error) {
            console.log(error);
          });
      };


    });

  }
})();
