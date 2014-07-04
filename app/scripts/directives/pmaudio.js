'use strict';

angular.module('angularAudioPlaylistApp')
  .directive('pmAudio', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the pmAudio directive');
      }
    };
  });
