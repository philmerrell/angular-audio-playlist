'use strict';

angular.module('ngAudioPlayerApp')
  .controller('MainCtrl', function ($scope, audioPlaylistService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.playThisList = function() {
      audioPlaylistService.setPlaylist([
        {order: 0, name: 'Prince', song: 'John, I\'m only dancing', src: 'audio/bowie.mp3', url: '', twitter: '',},
        {order: 1, name: 'The Gap Band', song: 'Winter 68', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'},
        {order: 2, name: 'Roy Orbison', song: 'Winter 68', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'}
      ]);
    };
  });
