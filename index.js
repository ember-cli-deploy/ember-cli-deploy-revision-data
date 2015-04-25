/* jshint node: true */
'use strict';

var Promise = require('ember-cli/lib/ext/promise');

var chalk = require('chalk');
var blue  = chalk.blue;

var validateConfig = require('./lib/utilities/validate-config');

module.exports = {
  name: 'ember-cli-deploy-tag',

  createDeployPlugin: function(options) {
    var tags = require('./lib/tags');

    function _beginMessage(ui, type) {
      ui.write(blue('|      '));
      ui.writeLine(blue('- creating tag using `' + type + '`'));

      return Promise.resolve();
    }

    function _successMessage(ui, tag) {
      ui.write(blue('|      '));
      ui.writeLine(blue('- generated tag: `' + tag + '`'));

      return Promise.resolve(tag);
    }

    return {
      name: options.name,

      willDeploy: function(context) {
        var deployment = context.deployment;
        var ui         = deployment.ui;
        var config     = deployment.config[this.name] || {};

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
          .then(function() {
            return Promise.resolve(tag.generate());
          })
          .then(_successMessage.bind(this, ui))
          .then(function(value) {
            return { tag: value };
          });
      }
    };
  }
};
