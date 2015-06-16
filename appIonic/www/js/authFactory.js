angular.module('headcount.services', [])

.factory('Auth', function ($http, $location, $window) {

  var isAuth = function () {
    console.log('USERFOUND!!!!!!!!!!!');
    return !!$window.localStorage.getItem('user');
  };

  var signout = function () {
    $window.localStorage.removeItem('user');
    $location.path('/signin');
  };

  return {
    isAuth: isAuth,
    signout: signout
  };
});