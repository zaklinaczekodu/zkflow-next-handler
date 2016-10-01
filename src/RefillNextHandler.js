'use strict';

var once = require('once');
var defaults = require('lodash.defaults');

function RefillNextHandler(options) {
  this.options = options;
  this.onceNext = once(options.next);
}

RefillNextHandler.prototype.handle = function(promise, options) {

  var that = this;
  var computedOptions = defaults({}, options, this.options, {
    handleSuccess: true,
    ignoreFailures: false,
    quickFinish: false,
    watch: false
  });

  if (computedOptions.quickFinish && computedOptions.watch) {
    that.onceNext();
  }

  promise.catch(function(error) {

    if (computedOptions.ignoreFailures) {
      computedOptions.logger.info(error);
      finished();
      that.onceNext();
      return;
    }

    computedOptions.logger.error({
      message: error
    });

    if (computedOptions.watch) {
      computedOptions.logger.finished();
      return;
    }

    finished();
    that.onceNext(error);

  });

  if (!computedOptions.handleSuccess) {
    return promise;
  }

  promise.then(function() {
    finished();
    that.onceNext();
  });

  return promise;

  function finished() {
    if (!that.onceNext.called) {
      return;
    }
    computedOptions.logger.finished();
  }

};

module.exports = RefillNextHandler;
