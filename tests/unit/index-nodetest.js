'use strict';

var assert = require('ember-cli/tests/helpers/assert');

function hooks(plugin) {
  return Object.keys(plugin).filter(function(key) {
    return (key !== 'name') && (key.charAt(0) !== '_') && (typeof plugin[key] === 'function');
  });
}

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
    var plugin = subject.createDeployPlugin({
      name: 'test-plugin'
    });

    assert.equal(hooks(plugin).length, 2);
    assert.sameMembers(hooks(plugin), ['configure', 'didBuild']);
  });

  describe('configure hook', function() {
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

    describe('resolving data from the pipeline', function() {
      it('resolves the config data from the context', function() {
        var plugin = subject.createDeployPlugin({
          name: 'revision-key'
        });

        var config = {
          type: 'file-hash',
          filePattern: 'eeee'
        };
        var context = {
          deployment: {
            ui: {
              write: function() {},
              writeLine: function() {}
            },
            config: {
              'revision-key': config
            }
          },

          distDir: 'some-dir',
          distFiles: ['a.js', 'b.css']
        };

        return assert.isFulfilled(plugin.configure.call(plugin, context))
          .then(function() {
            assert.typeOf(config.distDir, 'function');
            assert.typeOf(config.distFiles, 'function');
            assert.equal(config.distDir(context), 'some-dir');
            assert.sameMembers(config.distFiles(context), ['a.js', 'b.css']);
          });
      });
    });
  });

  describe('didBuild hook', function() {
    it ('returns the revision key data', function() {
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
              filePattern: 'index.html',
              distDir: 'tests/fixtures',
              distFiles: ['index.html'],
            },
          }
        }
      };

      return assert.isFulfilled(plugin.didBuild.call(plugin, context))
        .then(function(result) {
          assert.equal(result.revisionKey, 'ae1569f72495012cd5e8588e0f2f5d49');
        });
    });
  });
});

