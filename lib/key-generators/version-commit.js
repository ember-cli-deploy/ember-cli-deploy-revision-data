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
    var sha = info.sha.slice(0, 8);

    return readFile(versionFile)
      .then(function(contents) {
        var json = JSON.parse(contents);

        if (!json.version || !sha) {
          return Promise.reject('Could not build revision with version `' + json.version + '` and commit hash `' + sha + '`');
        }

        return json.version + '+' + sha;
      });
  }
});
