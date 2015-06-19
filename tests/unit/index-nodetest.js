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

    assert.equal(result.name, 'test-plugin');
  });

  it('implements the correct hooks', function() {
    var result = subject.createDeployPlugin({
      name: 'test-plugin'
    });

    assert.equal(typeof result.didBuild, 'function');
  });

  describe('willDeploy hook', function() {
    it('resolves if config is ok', function() {
      var plugin = subject.createDeployPlugin({
        name: 'revision-key'
      });

      var context = {
        deployment: {
          ui: {
            write: function() {},
            writeLine: function() {}
          },
          config: {
            'revision-key': {
              type: 'file-hash',
              filePattern: 'eeee'
            }
          }
        }
      };

      return assert.isFulfilled(plugin.configure.call(plugin, context))
    });
  });

  describe('didBuild hook', function() {
    it ('returns the revision key data', function() {
      var plugin = subject.createDeployPlugin({
        name: 'revision-key'
      });

      var context = {
        distDir: 'tests/fixtures',
        distFiles: ['index.html'],
        deployment: {
          ui: {
            write: function() {},
            writeLine: function() {}
          },
          config: {
            'revision-key': {
              type: 'file-hash',
              filePattern: 'index.html'
            },
          }
        }
      };

      return assert.isFulfilled(plugin.didBuild.call(plugin, context))
        .then(function(result) {
          assert.equal(result.revision, 'ae1569f72495012cd5e8588e0f2f5d49');
        });
    });
  });
});

