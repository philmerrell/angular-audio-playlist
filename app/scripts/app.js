'use strict';

angular
  .module('audioPlaylistApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'com.philmerrell.audioPlaylist',
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
