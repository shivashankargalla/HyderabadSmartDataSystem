(function () {
  'use strict';

  angular
    .module('ta-nsds-ui.ministry-of-interiors')
    .controller('MinistryOfInteriorController', MinistryOfInteriorController);

  /** @ngInject */
  function MinistryOfInteriorController($scope, $rootScope, MinistryOfInteriorsService, MinistryOfInteriorsFactory) {
    var vm = this;
    $rootScope.headerTitle = 'Citizen Services';

    $(function () {


      $scope.changePieTab = function (tabNo, str) {
        $scope.activePieTab = tabNo;

        var pieChart = {
          "terms": "Country$8",
          "metric": "count$",
          "filter": ["ServiceType$" + str + "$string"],
          "range": []
        };

        MinistryOfInteriorsFactory
          .getPieChartData(pieChart)
          .then(function (data) {
            MinistryOfInteriorsService.loadPieChart(data.series[0], str)
          },
          function (error) {
            console.log(error);
          });
      };

      $scope.changePieTab(1, 'EID');


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
                        "gte": 1439626373477,
                        "lte": 1447402373477,
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
              "interval": "10d",
              "time_zone": "Asia/Kolkata",
              "min_doc_count": 1,
              "extended_bounds": {
                "min": 1439626373477,
                "max": 1447402373477
              }
            },
            "aggs": {
              "3": {
                "terms": {
                  "field": "ServiceType",
                  "size": 5,
                  "order": {
                    "1": "desc"
                  }
                },
                "aggs": {
                  "1": {
                    "avg": {
                      "field": "ProcessTime"
                    }
                  }
                }
              }
            }
          }
        }
      };

      MinistryOfInteriorsFactory
        .getLineChartData(lineChart)
        .then(function (data) {
          MinistryOfInteriorsService.loadLineChart(data);
        },
        function (error) {
          console.log(error);
        });

      var metricDataEID = {
        "input": ["avg$ProcessTime"],
        "filter": ["ServiceType$EID$string"],
        "range": []
      };

      $scope.metric = {};

      MinistryOfInteriorsFactory
        .getMetricData(metricDataEID)
        .then(function (data) {
          $scope.metric.eid = data.avg$ProcessTime;
        },
        function (error) {
          console.log(error);
        });

      var metricDatREP = {
        "input": ["avg$ProcessTime"],
        "filter": ["ServiceType$Residency Entry Permit$string"],
        "range": []
      };

      MinistryOfInteriorsFactory
        .getMetricData(metricDatREP)
        .then(function (data) {
          $scope.metric.residencyEntry = data.avg$ProcessTime;
        },
        function (error) {
          console.log(error);
        });

      var metricDatWEP = {
        "input": ["avg$ProcessTime"],
        "filter": ["ServiceType$Work Entry Permit$string"],
        "range": []
      };

      MinistryOfInteriorsFactory
        .getMetricData(metricDatWEP)
        .then(function (data) {
          $scope.metric.workEntry = data.avg$ProcessTime;
        },
        function (error) {
          console.log(error);
        });

      var metricDatTP = {
        "input": ["avg$ProcessTime"],
        "filter": ["ServiceType$Telephone$string"],
        "range": []
      };
      MinistryOfInteriorsFactory
        .getMetricData(metricDatTP)
        .then(function (data) {
          $scope.metric.telephone = data.avg$ProcessTime;
        },
        function (error) {
          console.log(error);
        });

    });

  }
})();
