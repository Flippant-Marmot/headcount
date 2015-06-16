angular.module('headcount.auth', [])

.controller('AuthController', function ($scope, $window, $location, $http, Auth, $state) {

  /**
   * $scope.user holds onto any input on the signin.html and signup.html input
   * fields.
   */

  $scope.user = {};

  /**
   * $scope.signin & $scope.signup both make a POST request to the routes/auth.js file
   * with the attempted login information from $scope.user. On successful authentication,
   * it sets the session item 'user' to the username, so that we can render the content
   * specifically to the user that's currently signed in.
   */
  $scope.signupNav = function() {
   $state.go('signup');
  }

  $scope.signinNav = function() {
    $state.go('signin');
  }

  $scope.signin = function () {

    console.log("signing in before POST request to auth/local");
    var user = JSON.stringify($scope.user);

    return $http({
      method: 'POST',
      url: 'http://young-tundra-9275.herokuapp.com/auth/local',
      data: user,
      headers : {"Content-Type": 'application/json'}
    })
    .then(function (resp) {
      
      console.log("$window.localStorage: ", $window.localStorage);

      $window.localStorage.setItem('user', resp.config.data.username);

      $state.go('app.events');
      // $window.location.href = "/"; // for use when in web browser without Ionic

    })
    .catch(function(error) {
      console.log("error is signin: ", error);

      $window.alert("Incorrect login, please try again!");
    });
  };

  $scope.signup = function () {

    return $http({
      method: 'POST',
      url: 'https://young-tundra-9275.herokuapp.com/auth/local-signup',
      data: $scope.user,
      headers : {"Content-Type": 'application/json'}
    })
    .then(function (resp) {
        console.log("resp in auth signup: ", resp);

        $window.localStorage.setItem('user', resp.config.data.username);
        console.log("$window.sesstionStorage: ", $window.localStorage);

        $state.go('signin');
    })
    .catch(function(error) {
      console.log("error: ", error);
      console.log("$window: ", $window);
      $window.alert("Username already exists, please try again!");
    });
  };

  /**
  * $scope.signout calls Auth.signout on the 'Auth' factory, under the services.js
  * file. It destroys the session item 'user', and then resets the view to the sign-in
  * page. It also makes a GET request to routes/auth.js's logout route, which will also
  * destroy the express-session token on the backend, then alerts the user on a
  * successful request.
  */

  $scope.signout = function(){

    Auth.signout();
    return $http({
      method: 'GET',
      url: 'https://young-tundra-9275.herokuapp.com/auth/logout'
    })
    .then(function(resp) {
      $window.alert("You've signed up for all of the things!!");
    });
  };

});