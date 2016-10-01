'use strict';

var rejectPromise = require('./rejectPromise');
var resolvePromise = require('./resolvePromise');

module.exports = function checkWatch() {

  describe('and promise resolves', function() {

    beforeEach(resolvePromise);

    it('should call next', function() {
      expect(this.nextMock).toHaveBeenCalled();
    });

    it('should NOT call logger.finished', function() {
      expect(this.loggerMock.finished).not.toHaveBeenCalled();
    });

  });

  describe('and promise rejects', function() {

    beforeEach(rejectPromise);

    it('should NOT call next', function() {
      expect(this.nextMock).not.toHaveBeenCalled();
    });

    it('should call logger.error with error message', function() {
      expect(this.loggerMock.error).toHaveBeenCalledWith({
        message: this.errorMessage
      });
    });

  });

};
