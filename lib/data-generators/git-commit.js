var CoreObject  = require('core-object');
var gitRepoInfo = require('git-repo-info');
var Promise     = require('ember-cli/lib/ext/promise');

module.exports = CoreObject.extend({
  generate: function() {
    var info = gitRepoInfo();

    if (info === null || info.root === null) {
      return Promise.reject('Could not find git repository');
    }

    var sha = info.sha.slice(0, 7);

    if (!sha) {
      return Promise.reject('Could not build revision with commit hash `' + sha + '`');
    }

    return Promise.resolve({
      revisionKey: sha,
      timestamp: new Date().toISOString()
    });
  }
});
