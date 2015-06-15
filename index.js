/* jshint node: true */
'use strict';

var Promise = require('ember-cli/lib/ext/promise');

var chalk = require('chalk');
var blue  = chalk.blue;
var red   = chalk.red;

var validateConfig = require('./lib/utilities/validate-config');

module.exports = {
  name: 'ember-cli-deploy-tag',

  createDeployPlugin: function(options) {
    var tags = require('./lib/tags');

    function _beginMessage(ui, type) {
      ui.write(blue('|    '));
      ui.writeLine(blue('- creating tag using `' + type + '`'));

      return Promise.resolve();
    }

    function _successMessage(ui, tag) {
      ui.write(blue('|    '));
      ui.writeLine(blue('- generated tag: `' + tag + '`'));

      return Promise.resolve(tag);
    }

    function _errorMessage(ui, error) {
      ui.write(blue('|    '));
      ui.write(red('- ' + error + '`\n'));

      return Promise.reject(error);
    }

    return {
      name: options.name,

      willDeploy: function(context) {
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

        var Tag = tags[type];
        var tag = new Tag({
          config: config,
          context: context
        });

        return _beginMessage(ui, type)
        .then(tag.generate.bind(tag))
          .then(_successMessage.bind(this, ui))
          .then(function(value) {
            return { tag: value };
          })
          .catch(_errorMessage.bind(this, ui));
      }
    };
  }
};
