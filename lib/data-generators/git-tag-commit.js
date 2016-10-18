var CoreObject  = require('core-object');
var gitRepoInfo = require('git-repo-info');
var Promise     = require('ember-cli/lib/ext/promise');

module.exports = CoreObject.extend({
  generate: function() {
    var info = gitRepoInfo();

    if (info === null || info.root === null) {
      return Promise.reject('Could not find git repository');
    }

    var tag = info.tag;
    var sha = info.sha.slice(0, 8);

    if (!info.tag || !sha) {
      return Promise.reject('Could not build revision with tag `' + tag + '` and commit hash `' + sha + '`');
    }

    return Promise.resolve({
      revisionKey: info.tag + '+' + sha,
      timestamp: new Date().toISOString()
    });
  }
});
