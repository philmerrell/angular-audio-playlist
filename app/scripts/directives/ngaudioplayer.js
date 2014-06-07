'use strict';

angular.module('ngAudioPlayerApp')

  // .constants('playerSettings', {
  //   playIcon: '<i class="fa fa-play fa-lg"></i>',
  //   pauseIcon: '<i class="fa fa-play fa-lg"></i>',
  //   loadingIcon: ''
  // })

  .controller('AudioController', ['$scope', '$attrs', function($scope, $attrs) {

    var me = this;

    $scope.player = {
      buttonIcon: '<i class="fa fa-play fa-lg"></i>'
    };
    //$scope.player.buttonIcon = playerSettings.playIcon;


    $scope.playlist = [
      {artist: 'Dark Swallows', song: 'Winter 68', src: 'http://reviewstalker.com/wp-content/uploads/2011/10/03-Winter-68.mp3'}
    ];

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
      var audio = $scope.audio;

      if(audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }

    };

  }])
  .directive('ngAudioPlayer', function () {
    return {
      templateUrl: 'views/ng-audio-player.html',
      restrict: 'A',
      scope: true,
      controller: 'AudioController',
      link: function postLink(scope, element, attrs, audioCtrl) {

        var audio = element.find('audio')[0];
        scope.audio = audio;

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
              scope.player.buttonIcon = '<i class="fa fa-pause fa-lg"></i>';
          });

        });

        audio.addEventListener('pause', function() {

          scope.$apply(function() {
            scope.player.buttonIcon = '<i class="fa fa-play fa-lg"></i>'
          });
        });

        audio.addEventListener('progress', function() {
          var d = this.duration;
          var b = this.buffered.end(0);

          scope.$apply(function() {

            scope.percentLoaded = audioCtrl.percentLoaded(d, b);

          });

        });

        var button = element.find('button');

        button.bind('click', function() {

          audioCtrl.toggleAudio();

        });

      }
    };
  });
