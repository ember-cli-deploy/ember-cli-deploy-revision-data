var CoreObject  = require('core-object');
var fs          = require('fs');
var path        = require('path');
var minimatch   = require('minimatch');
var crypto      = require('crypto');
var RSVP        = require('rsvp');

var denodeify   = require('rsvp').denodeify;
var readFile    = denodeify(fs.readFile);

module.exports = CoreObject.extend({
  init: function(options) {
    this._super();
    this._plugin = options.plugin;
  },

  generate: function() {
    var filePattern = this._plugin.readConfig('filePattern');
    var distDir     = this._plugin.readConfig('distDir');
    var distFiles   = this._plugin.readConfig('distFiles');

    var filePaths = distFiles.filter(minimatch.filter(filePattern, { matchBase: true }));

    if (!filePaths.length) {
      return RSVP.reject('`' + filePattern + '` does not exist in distDir `' + distDir + '`');
    }

    var filePath = path.join(distDir, filePaths[0]);

    return readFile(filePath)
      .then(function(contents) {
        return {
          revisionKey: md5Hash(contents.toString()),
          timestamp: new Date().toISOString()
        };
      })
  }
});

function md5Hash(buf) {
  var md5 = crypto.createHash('md5');
  md5.update(buf);
  return md5.digest('hex');
}
