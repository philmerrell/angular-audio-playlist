'use strict';

angular.module('audioPlaylistApp')
  .controller('MainCtrl', function ($scope, audioPlaylistService) {
    $scope.myRadPlaylist = [
        {order: 0, name: 'Dustin Wong', song: 'Talking Walking Cloud', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/dustinwong.mp3'},
        {order: 1, name: 'Delicate Steve', song: 'Butterfly', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/delicatesteve.mp3'},
        {order: 2, name: 'Holiday Friends', song: 'Asteral Observations', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/holidayfriends.mp3'},
        {order: 3, name: 'Janka Nabay', song: 'Eh Congo', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/jankanabay.mp3', url: ''},
        {order: 4, name: 'Mr. Gnome', song: 'Vampires', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/mrgnome.mp3', url: 'http://s3.amazonaws.com/Treefort-Music-Fest/jankanabay.mp3'},
        {order: 5, name: 'Why?', song: 'The Vowels, Pt. 2', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/why.mp3', url: '', twitter: ''},
        {order: 6, name: 'Talk Demonic', song: 'Shattered Into Dyes', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/talkdemonic.mp3'},
        {order: 7, name: 'Soft White Sixties', song: 'Queen of the Press Club', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/thesoftwhitesixties.mp3'},
        {order: 8, name: 'Pictureplane', song: 'Real is a Feeling', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/pictureplane.mp3'},
        {order: 9, name: 'Blitzen Trapper', song: 'Might Find it Cheap', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/blitzentrapper.mp3'}
      ];

    $scope.playlists = [
      {
        name: 'Treefort Music Fest 2012 - Thursday',
        list: [
          {order: 0, name: 'Dustin Wong', song: 'Talking Walking Cloud', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/dustinwong.mp3'},
          {order: 1, name: 'Delicate Steve', song: 'Butterfly', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/delicatesteve.mp3'},
          {order: 2, name: 'Holiday Friends', song: 'Asteral Observations', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/holidayfriends.mp3'},
          {order: 3, name: 'Janka Nabay', song: 'Eh Congo', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/jankanabay.mp3', url: ''},
          {order: 3, name: 'Mr. Gnome', song: 'Vampires', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/mrgnome.mp3', url: 'http://s3.amazonaws.com/Treefort-Music-Fest/jankanabay.mp3'},

        ]
      },
      {
        name: 'Treefort Music Fest 2012 - Friday',
        list: [
          {order: 0, name: 'Why?', song: 'The Vowels, Pt. 2', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/why.mp3', url: '', twitter: ''},
          {order: 1, name: 'Talk Demonic', song: 'Shattered Into Dyes', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/talkdemonic.mp3'},
          {order: 2, name: 'Soft White Sixties', song: 'Queen of the Press Club', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/thesoftwhitesixties.mp3'},
          {order: 3, name: 'Pictureplane', song: 'Real is a Feeling', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/pictureplane.mp3'},
          {order: 4, name: 'Blitzen Trapper', song: 'Might Find it Cheap', src: 'http://s3.amazonaws.com/Treefort-Music-Fest/blitzentrapper.mp3'}
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
