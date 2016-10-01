'use strict';

module.exports = function checkNotWatchNotIgnoringFailures() {

  describe('and promise resolves', function() {

    beforeEach(function(next) {
      this.resolve();
      this.promise.then(next);
    });

    it('should call next', function() {
      expect(this.nextMock).toHaveBeenCalled();
    });

    it('should NOT call logger.finished', function() {
      expect(this.loggerMock.finished).not.toHaveBeenCalled();
    });

    describe('and then promise resolves again ', function() {

      beforeEach(function() {

        var that = this;

        this.otherPromise = new Promise(function (resolve, reject) {
          that.otherResolve = resolve;
          that.otherReject = reject;
        });

        this.nextMock.calls.reset();

        this.nextHandler.handle(this.otherPromise);

        this.otherResolve();

      });

      it('should NOT call next', function(next) {

        var that = this;

        this.otherPromise
          .then(function() {
            expect(that.nextMock).not.toHaveBeenCalled();
            next();
          });

      });

      it('should call logger.finished', function(next) {

        var that = this;

        this.otherPromise
          .then(function() {
            expect(that.loggerMock.finished).toHaveBeenCalled();
            next();
          });

      });

    });

  });

  describe('and promise rejects', function() {

    beforeEach(function(next) {
      this.errorMessage = 'mock error message';
      this.reject(this.errorMessage);
      this.promise.catch(next);
    });

    it('should call next with error message', function() {
      expect(this.nextMock).toHaveBeenCalled();
    });

    it('should call logger.error with error messageand then logger.finished', function() {
      expect(this.loggerMock.error).toHaveBeenCalledWith({
        message: this.errorMessage
      });
    });

  });

};
