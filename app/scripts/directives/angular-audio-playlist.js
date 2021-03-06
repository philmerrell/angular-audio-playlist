
/*
**  TODO:
      - Refactor to override <audio> element and add another directive for a playlist="" attrib
      <audio playlist="myRadPlaylist">

*/
'use strict';

angular.module('com.philmerrell.audioPlaylist', [])


  .directive('audio', ['audioPlaylistService', function (audioPlaylistService) {
    return {
      templateUrl: 'views/audio-playlist.html',
      restrict: 'E',
      replace: true,
      transclude: 'element',
      scope: {
        playlist: '='
      },
      controller: 'audioPlaylistController',
      link: function postLink(scope, element, attrs, audioCtrl) {

        var slider = element.find('input[type="range"]')[0];
        //console.log(slider);

        var audio = element.find('audio')[0];
        //var audio = document.createElement('audio');
        //element.appendChild(audio);
        console.log(audio);
        scope.audio = audio;

        audio.src = scope.currentlyPlaying.src;

        var button = element.find('button');

        button.bind('click', function() {

          audioCtrl.toggleAudio();

        });

        /* AUDIO LISTENERS */

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

        var setSliderProgress = function() {
          var newVal = slider.value / (100 / audio.duration);

          audio.currentTime = newVal;
          //console.log('changed');
        };

        slider.addEventListener('change', setSliderProgress, false);



        slider.addEventListener('input', function() {

          slider.removeEventListener('change', setSliderProgress, false);
          var newValue = slider.value / (100 / audio.duration);
          audio.currentTime = newValue;

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

      playIcon: '<span class="player-play"></span>',
      pauseIcon: '<span class="player-pause"></span>',
      loadingIcon: '<span class="player-circle-o-notch player-spin"></span>'

    };

    $scope.player = {
      buttonIcon: this.playerControls.playIcon
    };
    // END INIT CONTROLLER


    // TODO: Add argument to start playlist at certain index
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

      var nextTrack = $scope.currentlyPlaying.order + 1;


      if($scope.playlist.length > nextTrack) {


        console.log($scope.playlist[nextTrack]);

        $scope.currentlyPlaying = $scope.playlist[nextTrack];
        $scope.audio.src = $scope.playlist[nextTrack].src;
        $scope.audio.load();
        $scope.audio.play();

      } else {

        //window.alert('all done');
        $scope.currentlyPlaying = $scope.playlist[0];
        $scope.audio.src = $scope.playlist[0].src;
        $scope.audio.currentTime = 0;
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
