'use strict';

var RSVP = require('rsvp');

var DeployPluginBase = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-revision-data',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      defaultConfig: {
        type: 'file-hash',
        separator: '+',
        filePattern: 'index.html',
        versionFile: 'package.json',
        distDir: function(context) {
          return context.distDir;
        },

        distFiles: function(context) {
          return context.distFiles;
        },

        scm: function(/* context */) {
          return require('./lib/scm-data-generators')['git'];
        }

      },

      prepare: function(/*context*/) {
        var self = this;

        var promises = {
            data: this._getData(),
            scm: this._getScmData()
        };

        return RSVP.hash(promises)
          .then(function(results) {
            var data = results.data;
            data.scm = results.scm;
            self.log('generated revision data for revision: `' + data.revisionKey + '`', { verbose: true });
            return data;
          })
          .then(function(data) {
            return { revisionData: data };
          })
          .catch(this._errorMessage.bind(this));
      },

      _getData: function() {
        var type = this.readConfig('type');
        this.log('creating revision data using `' + type + '`', { verbose: true });
        var DataGenerator = require('./lib/data-generators')[type];
        return new DataGenerator({
          plugin: this
        }).generate();
      },

      _getScmData: function() {
        var ScmDataGenerator = this.readConfig('scm');
        if (ScmDataGenerator) {
          var path = this.readConfig('distDir');
          return new ScmDataGenerator(path).generate();
        } else {
          return RSVP.resolve();
        }
      },

      _errorMessage: function(error) {
        this.log(error, { color: 'red' });
        return RSVP.reject(error);
      }
    });
    return new DeployPlugin();
  }
};
