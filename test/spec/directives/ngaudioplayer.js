'use strict';

describe('Directive: ngAudioPlayer', function () {

  // load the directive's module
  beforeEach(module('ngAudioPlayerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-audio-player></ng-audio-player>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngAudioPlayer directive');
  }));
});
