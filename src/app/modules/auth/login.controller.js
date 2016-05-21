(function () {
  'use strict';

  angular
    .module('ta-nsds-ui.auth')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController($state,toastr) {

    var vm = this;

    vm.login = function (obj) {
      if (obj.uname === 'admin' && obj.pwd === 'admin') {
        //toastr.success('You are successfully logged in', 'Success');
        $state.go('home');
      }else{
        toastr.error('Please enter valid credentials and try again', 'Error');
      }
    };
  }

})();
