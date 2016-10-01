'use strict';

function resolvePromise(next) {
  this.resolve();
  this.promise.then(next);
}

module.exports = resolvePromise;
