'use strict';

function rejectPromise(next) {
  this.errorMessage = 'mock error message';
  this.reject(this.errorMessage);
  this.promise.catch(next);
}

module.exports = rejectPromise;
