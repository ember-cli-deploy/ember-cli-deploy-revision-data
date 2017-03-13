var CoreObject  = require('core-object');
var gitRepoInfo = require('git-repo-info');
var RSVP        = require('rsvp');

module.exports = CoreObject.extend({
  init: function(options) {
    this._super();
    this._plugin = options.plugin;
  },

  generate: function() {
    var separator = this._plugin.readConfig('separator');
    var info = gitRepoInfo();

    if (info === null || info.root === null) {
      return RSVP.reject('Could not find git repository');
    }

    var tag = info.tag;
    var sha = info.sha.slice(0, 8);

    if (!info.tag || !sha) {
      return RSVP.reject('Could not build revision with tag `' + tag + '` and commit hash `' + sha + '`');
    }

    return RSVP.resolve({
      revisionKey: info.tag + separator + sha,
      timestamp: new Date().toISOString()
    });
  }
});
