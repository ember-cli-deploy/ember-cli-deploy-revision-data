var CoreObject  = require('core-object');
var gitRepoInfo = require('git-repo-info');
var fs          = require('fs');
var Promise     = require('ember-cli/lib/ext/promise');

var denodeify   = require('rsvp').denodeify;
var readFile    = denodeify(fs.readFile);

module.exports = CoreObject.extend({
  init: function(options) {
    this._plugin = options.plugin;
  },

  generate: function() {
    var versionFile = this._plugin.readConfig('versionFile');

    var path = gitRepoInfo._findRepo();

    if (path === null) {
      return Promise.reject('Could not find git repository');
    }

    var info = gitRepoInfo(path);
    var sha = (info.sha || '').slice(0, 8);
    var plugin = this._plugin;

    return readFile(versionFile)
      .then(function(contents) {
        var json = JSON.parse(contents);

        if (!json.version) {
          return Promise.reject('Could not build revision with version `' + json.version + '` and commit hash `' + sha + '`');
        }

        var versionString = json.version;
        if (sha) {
          versionString = versionString + '+' + sha;
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
