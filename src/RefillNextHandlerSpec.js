'use strict';

describe('RefillNextHandler', function () {

  var q = require('q');
  var checkNotWatchNotIgnoringFailures = require('./RefillNextHandlerSpec/checkNotWatchNotIgnoringFailures');
  var checkNotWatchIgnoringFailures = require('./RefillNextHandlerSpec/checkNotWatchIgnoringFailures');
  var checkWatch = require('./RefillNextHandlerSpec/checkWatch');

  beforeEach(function () {

    this.deferred = q.defer();

    this.nextMock = jasmine.createSpy('nextMock');
    this.loggerMock = jasmine.createSpyObj('loggerMock', ['finished', 'error', 'info']);

    this.RefillNextHandler = require('./RefillNextHandler');

  });

  describe('when NOT in watch mode', function () {

    describe('and NOT ignoring failures', function () {

      beforeEach(function () {

        this.nextHandler = new this.RefillNextHandler({
          next: this.nextMock,
          logger: this.loggerMock,
          watch: false
        });

        this.nextHandler.handle(this.deferred.promise);
        expect(this.nextMock).not.toHaveBeenCalled();

      });

      checkNotWatchNotIgnoringFailures();

    });

    describe('and ignoring failures', function () {

      beforeEach(function () {

        this.nextHandler = new this.RefillNextHandler({
          next: this.nextMock,
          logger: this.loggerMock,
          watch: false,
          ignoreFailures: true
        });

        this.nextHandler.handle(this.deferred.promise);
        expect(this.nextMock).not.toHaveBeenCalled();

      });

      checkNotWatchIgnoringFailures();

    });

    it('and quick finish is enabled should NOT call next', function () {

      this.nextHandler = new this.RefillNextHandler({
        next: this.nextMock,
        logger: this.loggerMock,
        watch: false,
        quickFinish: true
      });

      this.nextHandler.handle(this.deferred.promise);
      expect(this.nextMock).not.toHaveBeenCalled();

    });

  });

  describe('when in watch mode and quick finish is disabled', function () {

    beforeEach(function () {
      this.nextHandler = new this.RefillNextHandler({
        next: this.nextMock,
        logger: this.loggerMock,
        watch: true
      });

      this.nextHandler.handle(this.deferred.promise);
      expect(this.nextMock).not.toHaveBeenCalled();
    });

    checkWatch();

  });

  it('when in watch mode and quick finish is enabled should call next', function () {

    this.nextHandler = new this.RefillNextHandler({
      next: this.nextMock,
      logger: this.loggerMock,
      watch: true,
      quickFinish: true
    });

    this.nextHandler.handle(this.deferred.promise);
    expect(this.nextMock).toHaveBeenCalled();

  });


});
