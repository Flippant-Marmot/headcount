angular.module('headcount.AppController', [])

.controller('AppController', function($scope, Auth, $http, $window, $timeout, $mdSidenav, $mdUtil, $rootScope) {
  var buildToggler = function(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle()
        },300);
    return debounceFn;
  };
  $scope.toggleLeft = buildToggler('left');
  $rootScope.toggleRight = function(event){
    $scope.event = event;
    $scope.localRight();
  }
  $scope.localRight = buildToggler('right');


  $scope.close = function () {
    $mdSidenav('left').close()
    $mdSidenav('right').close()    
  };

  $scope.signout = function(){

    Auth.signout();
    return $http({
      method: 'GET',
      url: '/auth/logout'
    })
  };

  /**
   * Checks if user has already authorized his/her Venmo account
   */
  $scope.checkVenmoDetails = function(){

    var currentUser = sessionStorage.getItem('user');
    return $http({
      method: 'POST',
      url : '/users/checkUser',
      data : {'username': currentUser}
    })
    .then(function(resp){
      var hasVenmoInfo = resp.data.hasVenmoInfo;
      $scope.shouldNotBeClickable = !hasVenmoInfo;
    });
  };

  $scope.checkVenmoDetails();

  /**
   * Handles Venmo button submittal.
   * Gets Connect account creation redirect url from server and manually sets href.
   */
  $scope.authorize = function() {
    var currentUser = sessionStorage.getItem('user');

    return $http({
      method: 'POST',
      url: '/authorize',
      data: {
        username: currentUser,
      }
    })
    .then(function (resp) {
      $window.location.href = resp.data;
    });
  };

  $scope.newEventNav = function() {
    $scope.close();
    $window.location.href = "#/app/newevent";
  };

  $scope.eventsNav = function() {
    $scope.close();
    $window.location.href = "#/app/events";
  };

  $scope.accountNav = function() {
    $window.location.href = "#/app/accounts";
    $scope.close();
  };
})
