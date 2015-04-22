/* jshint node: true */
'use strict';

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
