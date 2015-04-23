/* jshint node: true */
'use strict';

var chalk = require('chalk');
var blue  = chalk.blue;

var validateConfig = require('./lib/utilities/validate-config');

module.exports = {
  name: 'ember-cli-deploy-tag',

  createDeployPlugin: function(options) {
    var tags = require('./lib/tags');

    function tagFor(type) {
      var defaultType = 'index-hash';
      return tags[type] || tags[defaultType];
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
        var config     = deployment.config[this.name] || {};

        var Tag = tagFor(config.type);
        var tag = new Tag(context);

        return { tag: tag.generate() };
      }
    };
  }
};
