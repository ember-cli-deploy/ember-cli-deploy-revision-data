/* jshint node: true */
'use strict';

var Promise = require('ember-cli/lib/ext/promise');

var DeployPluginBase = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-revision-data',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      defaultConfig: {
        type: 'file-hash',
        filePattern: 'index.html',
        distDir: function(context) {
          return context.distDir;
        },
        distFiles: function(context) {
          return context.distFiles;
        },
        versionFile: 'package.json',
      },
      prepare: function(context) {
        var self = this;
        var type = this.readConfig('type');
        var DataGenerator = require('./lib/data-generators')[type];
        var dataGenerator = new DataGenerator({
          plugin: this
        });

        this.log('creating revision data using `' + type + '`');
        return dataGenerator.generate()
          .then(function(data) {
            self.log('generated revision data for revision: `' + data.revisionKey + '`');
            return data;
          })
          .then(function(data) {
            return { revisionData: data };
          })
          .catch(this._errorMessage.bind(this));
      },
      _errorMessage: function(error) {
        this.log(error, { color: 'red' });
        return Promise.reject(error);
      }
    });
    return new DeployPlugin();
  }
};
