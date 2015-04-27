var CoreObject  = require('core-object');
var fs          = require('fs');
var Fingerprint = require('broccoli-asset-rev/lib/fingerprint');

module.exports = CoreObject.extend({
  init: function(options) {
    this._context = options.context || {};
    this._config = options.config || {};
  },

  generate: function() {
    var filePattern = this._config.filePattern;
    var distFiles   = this._context.distFiles;
    var index       = distFiles.indexOf(filePattern);
    var indexPath;
    var contents;
    var fingerprint;

    if (index === -1) {
      return '';
    }

    indexPath = distFiles[index];

    if (!fs.existsSync(indexPath)) {
      return '';
    }

    contents    = fs.readFileSync(indexPath);
    fingerprint = new Fingerprint();

    return fingerprint.hashFn(contents);
  }
});
