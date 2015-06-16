// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('headcount', [
  'ionic',
  'headcount.AppController',
  'headcount.services',
  'headcount.events',
  'headcount.accounts',
  'headcount.auth',
  'ngMaterial'
])
.run(function($ionicPlatform, $rootScope, Auth, $state) {
  $rootScope.host = ''; //http://young-tundra-9275.herokuapp.com';
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if(window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

    if (toState && toState.authenticate && !Auth.isAuth()) {
      setTimeout(function(){
        $state.go('signin');
      });

    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

    .state('app', {
      url: '/app',    
      templateUrl: '../www/templates/app.html',
      // for development on phone add www/ as beginning route path
      // for development on web browser, take out www/
      controller: 'AppController'
    })    
    .state('signin', {
      url: '/signin',  
      templateUrl: '../www/templates/signin.html',
      controller: 'AuthController',
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '../www/templates/signup.html',
      controller: 'AuthController'
    })
    .state('app.event', {
      url: '/event',
      views: {
        'menuContent': {
          templateUrl: '../www/templates/event.html',
          controller: 'EventsController'
        }
      },
      authenticate: true,
    })
    .state('app.events', {
      url: '/events',
      views: {
        'menuContent': {
          templateUrl: '../www/templates/eventslist.html',
          controller: 'EventsController'
        }
      },
      authenticate: true
    })
    .state('app.newevent', {
      url: '/newevent',
      views: {
        'menuContent': {
          templateUrl: '../www/templates/newevent.html',
          controller: 'EventsController'
        }
      },
      authenticate: true          
    })
    .state('app.accounts', {
      url: '/accounts',
      views: {
        'menuContent': {
          templateUrl: '../www/templates/accounts.html',
          controller: 'AccountsController'
        }
      },
      authenticate: true          
    });

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('blue', {
    //     'default': '900',
    //     'hue-1': '700',
    //     'hue-2': '200',
    //     'hue-3': 'A100'
    //   })
    //   .accentPalette('indigo', {
    //     'default': '900'
    //   })
    //   .backgroundPalette('grey');
    
    

    $urlRouterProvider.otherwise('/signin');
})
.factory('EventsFactory', function ($rootScope) {
  var eventServices = {};

  eventServices.shouldNotBeCreatable = false;
  eventServices.shouldNotBeClickable = false;

  eventServices.currentEvent = {};
  return eventServices;
})
.factory('AttachTokens', function ($window, $location) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  // TODO: Make this more secure, use passport or bcrypt.
  var attach = {
    request: function (object) {
      var username = $window.localStorage.getItem('user');
      if (username) {
        object.headers['x-access-token'] = username;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
