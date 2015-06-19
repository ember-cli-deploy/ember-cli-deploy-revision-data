var CoreObject  = require('core-object');
var fs          = require('fs');
var path        = require('path');
var minimatch   = require('minimatch');
var Fingerprint = require('broccoli-asset-rev/lib/fingerprint');
var Promise     = require('ember-cli/lib/ext/promise');

var denodeify   = require('rsvp').denodeify;
var readFile    = denodeify(fs.readFile);

module.exports = CoreObject.extend({
  init: function(options) {
    this._context = options.context || {};
    this._config = options.config || {};
  },

  generate: function() {
    var filePattern = this._config.filePattern;
    var distDir     = this._context.distDir;
    var distFiles   = this._context.distFiles;
    var fingerprint;

    var filePaths = distFiles.filter(minimatch.filter(filePattern, { matchBase: true }));

    if (!filePaths.length) {
      return Promise.reject('`' + filePattern + '` does not exist in distDir `' + distDir + '`');
    }

    var filePath = path.join(distDir, filePaths[0]);

    return readFile(filePath)
      .then(function(contents) {
        fingerprint = new Fingerprint();
        return fingerprint.hashFn(contents.toString());
      })
  }
});
