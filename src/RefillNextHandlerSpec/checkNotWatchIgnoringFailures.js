'use strict';

var rejectPromise = require('./rejectPromise');

module.exports = function checkNotWatchIgnoringFailures() {

  describe('and promise rejects', function() {

    beforeEach(rejectPromise);

    it('should call next without error message', function() {
      expect(this.nextMock).toHaveBeenCalledWith();
    });

  });

};
