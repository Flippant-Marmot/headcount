angular.module('headcount.accounts', [])

.controller('AccountsController', function ($scope, $window, $location, $http) {

  $scope.initialize = function() {
    var currentUser = localStorage.getItem('user');
    console.log(currentUser);
    return $http({
      method: 'POST',
      url: 'https://young-tundra-9275.herokuapp.com/users/accountinfo', //http://young-tundra-9275.herokuapp.com/users/accountinfo
      data: {
        username: currentUser,
      }
    })
    .then(function (resp) {
      user = resp.data;
      $scope.username = user.username || '';
      $scope.firstname = user.firstName || '';
      $scope.lastname = user.lastName || '';
      $scope.email = user.email || '';
    });
  };
  $scope.initialize();

  $scope.accountUpdate = function() {
    console.log('updating account');
    var currentUser = localStorage.getItem('user');
    var data = {};
    data.username = $scope.username;
    data.firstName = $scope.firstname;
    data.lastName = $scope.lastname;
    data.email = $scope.email;
    return $http({
      method: 'POST',
      url: 'https://young-tundra-9275.herokuapp.com/users/accountupdate',
      data: data
    })
    .then(function (resp) {
      $window.location.href = "#/app/events";
    });
  };

  /**
   * Checks if user has already authorized his/her Venmo account
   */

});