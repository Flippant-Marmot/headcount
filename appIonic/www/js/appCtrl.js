angular.module('headcount.AppController', [])

.controller('AppController', function($scope, $rootScope, Auth, $http, $window) {

  $scope.signout = function(){

    Auth.signout();
    return $http({
      method: 'GET',
      url: $rootScope.host + '/auth/logout'
    })
    .then(function(resp) {
      console.log("You've signed out!");
    });
  };
})
