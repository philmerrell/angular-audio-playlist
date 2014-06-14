'use strict';

angular.module('audioPlaylistApp')
  .controller('MainCtrl', function ($scope, audioPlaylistService) {
    $scope.myRadPlaylist = [
        {order: 0, name: 'David Bowie', song: 'John, I\'m only dancing', src: 'audio/bowie.mp3', url: '', twitter: '',},
        {order: 1, name: 'The Black Angels', song: 'Winter 68', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'},
        {order: 2, name: 'The Beatles', song: 'Winter 68', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'}
    ];

    $scope.playlists = [
      {
        name: 'Playlist One',
        list: [
          {order: 0, name: 'David Bowie', song: 'John, I\'m only dancing', src: 'audio/bowie.mp3', url: '', twitter: '',},
          {order: 1, name: 'The Black Angels', song: 'Winter 68', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'},
          {order: 2, name: 'The Beatles', song: 'Winter 68', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'}
        ]
      },
      {
        name: 'Playlist Two',
        list: [
          {order: 0, name: 'Prince', song: 'Raspberry Baret', src: 'audio/bowie.mp3', url: '', twitter: '',},
          {order: 1, name: 'The Gap Band', song: 'You Dropped a Bomb on Me', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'},
          {order: 2, name: 'Roy Orbison', song: 'Only the Lonely', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'}
        ]
      }
    ];

    $scope.playThisList = function() {
      audioPlaylistService.setPlaylist([
        {order: 0, name: 'Prince', song: 'Raspberry Baret', src: 'audio/bowie.mp3', url: '', twitter: '',},
        {order: 1, name: 'The Gap Band', song: 'You Dropped a Bomb on Me', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'},
        {order: 2, name: 'Roy Orbison', song: 'Only the Lonely', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'}
      ]);
    };
  });
