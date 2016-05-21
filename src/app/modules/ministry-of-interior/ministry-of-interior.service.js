(function () {
  'use strict';

  angular
    .module('ta-nsds-ui.ministry-of-interiors')
    .service('MinistryOfInteriorsService', MinistryOfInteriorsService);

  /** @ngInject */
  function MinistryOfInteriorsService($timeout, toastr) {

    this.loadLineChart = function (ipData) {
      var monthList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var monthIpList = [];

      angular.forEach(ipData.xAxis.categories, function (val, key) {
        monthIpList.push(new Date(val).getDate() + " " + monthList[new Date(val).getMonth()]);
      });

      angular.forEach(ipData.series, function (val, key) {
        if (val.name == 'EID') val.name = 'EIDA Application';
      });

      $('#container1').highcharts({
        title: {
          text: 'Monthly Average Response Time for Service',
          x: -20 //center
        },
        subtitle: {
          text: 'Source: Ministry of Interior',
          x: -20
        },
        xAxis: {
          categories: monthIpList
        },
        yAxis: {
          title: {
            text: 'Days'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          valueSuffix: ' Days'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: ipData.series
      });
    };

    this.loadPieChart = function (ipData, str) {
      console.log(str)
      if (str == 'EID') str = 'EIDA Application';
      $('#container2').highcharts({
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        title: {
          text: 'Emirate Wise ' + str + '\s Registered - 2015'
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            events: {
              click: function (event) {
                console.log('event : ', event);
                console.log('Category: ' + this.category + ', value: ' + this.y);
              }
            },
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        },
        series: [{
          type: 'pie',
          name: ipData.Country,
          data: ipData.data
        }]
      });
    }
  }

})();
