'use strict';

angular
  .module('ngAudioPlayerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'com.mountcrystal.audioPlaylist',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
