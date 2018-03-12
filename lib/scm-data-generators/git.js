var CoreObject  = require('core-object');
var RSVP        = require('rsvp');
var gitRepoInfo = require('git-repo-info');
var simpleGit   = require('simple-git');

module.exports = CoreObject.extend({
  init: function(path) {
    this._super();
    this.path = path;
  },

  generate: function() {
    var _this = this;
    return new RSVP.Promise(function(resolve/*, reject */) {
      simpleGit(_this.path).log({
        format: {
          hash: '%H',
          date: '%ai',
          commit_message: '%s',
          author_name: '%aN',
          author_email: '%ae'
        }
      }, function(err, log) {
        if(!log || !log.latest) {
          resolve();
        } else {
          var info = log.latest;
          
          resolve({
            sha: info.hash.replace("'",''),
            email: info.author_email.replace("'",''),
            name: info.author_name,
            message: info.commit_message,
            timestamp: new Date(info.date).toISOString(),
            branch: gitRepoInfo().branch,
            tag: gitRepoInfo().tag
          });
        }
      });
    });
  }
});
