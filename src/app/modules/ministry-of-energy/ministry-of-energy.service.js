(function () {
  'use strict';

  angular
    .module('ta-nsds-ui.ministry-of-energy')
    .service('MinistryOfEnergyService', MinistryOfEnergyService);

  /** @ngInject */
  function MinistryOfEnergyService($timeout, toastr) {

    this.loadBarChart = function (ipData) {

      var monthList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var monthIpList = [];

      angular.forEach(ipData.xAxis.categories, function (val, key) {
        monthIpList.push(new Date(val).getDate() + " " + monthList[new Date(val).getMonth()]);
      });

      $('#container1').highcharts({

        chart: {
          type: 'column',
          /*options3d: {
            enabled: true,
            alpha: 5,
            beta: 5,
            viewDistance: 25,
            depth: 40
          },*/
          marginTop: 50,
          marginRight: 40
        },

        title: {
          text: 'Bimonthly Average Energy Consumed By Sectors'
        },

        xAxis: {
          categories: monthIpList
        },

        yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
            text: 'Energy Consumed'
          }
        },

        tooltip: {
          headerFormat: '<b>{point.key}</b><br>',
          //pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
          pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
        },

        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: function () {
                  //console.log('Category: ' + this.category + ', value: ' + this.y + ', value: ' + this.x);
                }
              }
            }
          },
          column: {
            stacking: null,
            depth: 40
          }
        },

        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2],
            stack: 'male'
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5],
            stack: 'male'
        }, {
            name: 'Jane',
            data: [2, 5, 6, 2, 1],
            stack: 'female'
        }, {
            name: 'Janet',
            data: [3, 0, 4, 4, 3],
            stack: 'female'
        }]
      });

    };

    this.loadLineChart = function (ipData) {

      var monthList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var monthIpList = [];

      angular.forEach(ipData.xAxis.categories, function (val, key) {
        monthIpList.push(new Date(val).getDate() + " " + monthList[new Date(val).getMonth()]);
      });

      $(function () {
        $('#container2').highcharts({
          title: {
            text: 'Bimonthly Average Energy Consumer Count By Sector',
            x: -20 //center
          },
          subtitle: {
            text: 'Source: Ministry of Energy',
            x: -20
          },
          xAxis: {
            categories: monthIpList
          },
          yAxis: {
            title: {
              text: 'Consumer Count'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip: {
            //valueSuffix: '°C'
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: ipData.series
        });
      });

    };

  }


})();
