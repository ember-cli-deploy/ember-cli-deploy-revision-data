/* jshint node: true */
'use strict';

var Promise = require('ember-cli/lib/ext/promise');

var chalk = require('chalk');
var blue  = chalk.blue;
var red   = chalk.red;

var validateConfig = require('./lib/utilities/validate-config');

module.exports = {
  name: 'ember-cli-deploy-revision-key',

  createDeployPlugin: function(options) {
    var generators = require('./lib/key-generators');

    function _beginMessage(ui, type) {
      ui.write(blue('|    '));
      ui.writeLine(blue('- generating revision key using `' + type + '`'));

      return Promise.resolve();
    }

    function _successMessage(ui, key) {
      ui.write(blue('|    '));
      ui.writeLine(blue('- generated revision key: `' + key + '`'));

      return Promise.resolve(key);
    }

    function _errorMessage(ui, error) {
      ui.write(blue('|    '));
      ui.write(red('- ' + error + '`\n'));

      return Promise.reject(error);
    }

    return {
      name: options.name,

      configure: function(context) {
        var deployment = context.deployment;
        var ui         = deployment.ui;
        var config     = deployment.config[this.name] = deployment.config[this.name] || {};

        return validateConfig(ui, config)
          .then(function() {
            ui.write(blue('|    '));
            ui.writeLine(blue('- config ok'));
          });
      },

      didBuild: function(context) {
        var deployment = context.deployment;
        var ui         = deployment.ui;
        var config     = deployment.config[this.name] || {};
        var type       = config.type;

        var KeyGenerator = generators[type];
        var keyGenerator = new KeyGenerator({
          config: config,
          context: context
        });

        return _beginMessage(ui, type)
        .then(keyGenerator.generate.bind(keyGenerator))
          .then(_successMessage.bind(this, ui))
          .then(function(value) {
            return { revision: value };
          })
          .catch(_errorMessage.bind(this, ui));
      }
    };
  }
};
