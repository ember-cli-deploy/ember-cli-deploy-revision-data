var CoreObject  = require('core-object');
var gitRepoInfo = require('git-repo-info');
var RSVP        = require('rsvp');

module.exports = CoreObject.extend({
  generate: function() {
    var info = gitRepoInfo();

    if (info === null || info.root === null) {
      return RSVP.reject('Could not find git repository');
    }

    var sha = info.sha.slice(0, 7);

    if (!sha) {
      return RSVP.reject('Could not build revision with commit hash `' + sha + '`');
    }

    return RSVP.resolve({
      revisionKey: sha,
      timestamp: new Date().toISOString()
    });
  }
});
