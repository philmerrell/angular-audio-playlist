
/*
**  IDEAS:
      - make directive attribs that control width and height

*/
'use strict';

angular.module('com.mountcrystal.audioPlaylist', [])

  .directive('audioPlaylist', ['audioPlaylistService', function (audioPlaylistService) {
    return {
      templateUrl: 'views/audio-playlist.html',
      restrict: 'E',
      replace: true,
      scope: {
        playlist: '='
      },
      controller: 'audioPlaylistController',
      link: function postLink(scope, element, attrs, audioCtrl) {

        var audio = element.find('audio')[0];
        scope.audio = audio;

        audio.src = scope.currentlyPlaying.src;

        audio.addEventListener('timeupdate', function() {

          var ct = this.currentTime;
          var d = this.duration;

          scope.$apply(function() {

            scope.currentTime = audioCtrl.timeElapsed(ct);
            scope.remainingTime = audioCtrl.timeRemaining(d, ct);
            scope.percentElapsed = audioCtrl.percentElapsed(d, ct);

          });
        });

        audio.addEventListener('playing', function() {

          scope.$apply(function() {
              scope.player.buttonIcon = audioCtrl.playerControls.pauseIcon;
          });

        });

        audio.addEventListener('pause', function() {

          scope.$apply(function() {
            scope.player.buttonIcon = audioCtrl.playerControls.playIcon;
          });
        });

        audio.addEventListener('ended', function() {

          audioCtrl.nextTrack();

        });

        audio.addEventListener('progress', function() {
          var d = this.duration;
          var b = this.buffered.end(0);

          scope.$apply(function() {

            scope.percentLoaded = audioCtrl.percentLoaded(d, b);

          });

        });

        audio.addEventListener('waiting', function() {
          scope.$apply(function() {
            scope.player.buttonIcon = audioCtrl.playerControls.loadingIcon;
          });
        });

        var button = element.find('button');

        button.bind('click', function() {

          audioCtrl.toggleAudio();

        });
        //TODO: More research on third parameter, "objectEquality": http://stackoverflow.com/questions/13594732/maxing-out-on-digest-iterations
        scope.$watch(function () { return audioPlaylistService.getPlaylist(); },
          function (newPlaylist) {
            if (typeof newPlaylist !== 'undefined') {

              audioCtrl.loadPlaylist(newPlaylist);

            }
          }, true
        );



      }
    };
  }])

  .controller('audioPlaylistController', ['$scope', '$attrs', 'audioPlaylistService', function($scope, $attrs, audioPlaylistService) {

    /* Init Controller Values */
    $scope.currentlyPlaying = $scope.playlist[0];


    this.playerControls = {

      playIcon: '<i class="fa fa-play fa-lg"></i>',
      pauseIcon: '<i class="fa fa-pause fa-lg"></i>',
      loadingIcon: '<i class="fa fa-circle-o-notch fa-spin fa-lg"></i>'

    };

    $scope.player = {
      buttonIcon: this.playerControls.playIcon
    };


    this.loadPlaylist = function() {

      $scope.playlist = audioPlaylistService.getPlaylist();

      $scope.audio.src = $scope.playlist[0].src;
      $scope.currentlyPlaying = $scope.playlist[0];
      $scope.audio.load();
      $scope.audio.play();

    };

    this.timeElapsed = function (currentTime) {

      var t = currentTime;

      var seconds = Math.floor(t % 60),
          elapsedSeconds = seconds < 10 ? '0'+seconds : seconds,
          minutes = Math.floor((t / 60) % 60),
          elapsedMinutes = minutes < 10 ? '0'+minutes : minutes,
          elapsedHours = Math.floor(((t / 60) / 60) % 60);

			if (elapsedHours === 0) {
				return elapsedMinutes+':'+elapsedSeconds;
			} else {
				return elapsedHours+':'+elapsedMinutes+':'+elapsedSeconds;
			}
    };

    this.timeRemaining = function (duration, currentTime) {

      var d = duration,
          t = currentTime;

      var timeLeft = d - t,
          seconds = Math.floor(timeLeft % 60) || 0,
          remainingSeconds = seconds < 10 ? '0'+seconds : seconds,
          minutes = Math.floor((timeLeft / 60) % 60) || 0,
          remainingMinutes = minutes < 10 ? '0'+minutes : minutes,
          hours = Math.floor(((timeLeft / 60) / 60) %60) || 0;

			if (hours === 0) {
				return '-'+remainingMinutes+':'+remainingSeconds;
			} else {
				return '-'+hours+':'+remainingMinutes+':'+remainingSeconds;
			}

    };

    this.percentLoaded = function(duration, progressBuffer) {

      return parseInt(((progressBuffer / duration) * 100), 10);

    };

    this.percentElapsed = function(duration, currentTime) {

      return (Math.floor((100 / duration) * currentTime)) || 0;

    };

    this.toggleAudio = function() {

      if($scope.audio.paused) {
        $scope.audio.play();
      } else {
        $scope.audio.pause();
      }

    };

    this.nextTrack = function() {


      if($scope.playlist.length >= $scope.currentlyPlaying.order) {

        var nextTrack = $scope.currentlyPlaying.order + 1;

        $scope.currentlyPlaying = $scope.playlist[nextTrack];
        $scope.audio.load();
        $scope.audio.play();

      } else {

        alert('all done');
        $scope.currentlyPlaying = $scope.playlist[0];
        $scope.audio.pause();

      }


    };

    $scope.previousTrack = function() {

      var previousTrack = $scope.currentlyPlaying.order - 1;

      if(previousTrack < 0) {
        $scope.currentlyPlaying = $scope.playlist[0];
      } else {

        $scope.audio.src = $scope.playlist[previousTrack].src;
        $scope.currentlyPlaying = $scope.playlist[previousTrack];
        $scope.audio.load();
        $scope.audio.play();
      }
    };

    $scope.playTrack = function(track) {
      $scope.audio.src = track.src;
      $scope.currentlyPlaying = track;
      $scope.audio.load();
      $scope.audio.play();
    };

  }])

  .factory('audioPlaylistService', function(){
    var me = this;

    this.playlist = null;

    return {

      setPlaylist: function(newPlaylist) {
        me.playlist = newPlaylist;
      },
      getPlaylist: function() {
        if(me.playlist !== null) {
          return me.playlist;
        } else {
          return;
        }

      }
    };
  });
