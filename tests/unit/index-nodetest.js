'use strict';

var assert = require('ember-cli/tests/helpers/assert');

describe('the index', function() {
  var subject;

  before(function() {
    subject = require('../../index');
  });

  it('has a name', function() {
    var result = subject.createDeployPlugin({
      name: 'test-plugin'
    });

    assert.equal('test-plugin', result.name);
  });

  it('implements the correct hooks', function() {
    var result = subject.createDeployPlugin({
      name: 'test-plugin'
    });

    assert.equal(typeof result.didBuild, 'function');
  });


  describe('didBuild hook', function() {
    it ('returns the tag data', function() {
      var plugin = subject.createDeployPlugin({
        name: 'test-plugin'
      });

      var context = {
        deployment: {
          config: {}
        },
        indexPath: process.cwd() + '/tests/fixtures/index.html'
      };

      var result = plugin.didBuild.call(plugin, context);

      assert.equal(result.tag, 'ae1569f72495012cd5e8588e0f2f5d49');
    });
  });
});

