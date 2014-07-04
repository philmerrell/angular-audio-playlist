'use strict';

describe('Directive: pmAudio', function () {

  // load the directive's module
  beforeEach(module('angularAudioPlaylistApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pm-audio></pm-audio>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pmAudio directive');
  }));
});
