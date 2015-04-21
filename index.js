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

      build: function(context) {
        var config = context.config.get(this.name);
        var data   = context.data;

        var Tag = tagFor(config.type);
        var tag = new Tag(data);

        context.data.tag = tag.generate();
      }
    };
  }
};
