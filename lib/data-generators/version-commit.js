var CoreObject  = require('core-object');
var gitRepoInfo = require('git-repo-info');
var fs          = require('fs');
var RSVP        = require('rsvp');

var denodeify   = require('rsvp').denodeify;
var readFile    = denodeify(fs.readFile);

module.exports = CoreObject.extend({
  init: function(options) {
    this._super();
    this._plugin = options.plugin;
  },

  generate: function() {
    var separator = this._plugin.readConfig('separator');
    var versionFile = this._plugin.readConfig('versionFile');

    var info = gitRepoInfo();

    if (info === null || info.root === null) {
      return RSVP.reject('Could not find git repository');
    }

    var sha = (info.sha || '').slice(0, 8);
    var plugin = this._plugin;

    return readFile(versionFile)
      .then(function(contents) {
        var json = JSON.parse(contents);

        if (!json.version) {
          return RSVP.reject('Could not build revision with version `' + json.version + '` and commit hash `' + sha + '`');
        }

        var versionString = json.version;
        if (sha) {
          versionString = versionString + separator + sha;
        } else {
          plugin.log('Missing git commit sha, using package version as revisionKey', { color: 'yellow', verbose: true });
        }

        return {
          revisionKey: versionString,
          timestamp: new Date().toISOString()
        };
      });
  }
});
