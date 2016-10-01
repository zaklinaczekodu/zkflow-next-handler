'use strict';

module.exports = function checkNotWatchIgnoringFailures() {

  describe('and promise rejects', function() {

    beforeEach(function(next) {
      this.errorMessage = 'mock error message';
      this.reject(this.errorMessage);
      this.promise.catch(next);
    });

    it('should call next without error message', function() {
      expect(this.nextMock).toHaveBeenCalledWith();
    });

  });

};
