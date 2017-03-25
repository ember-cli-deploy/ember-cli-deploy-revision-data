'use strict';

var assert = require('../helpers/assert');

describe('the index', function() {
  var subject, mockUi;

  beforeEach(function() {
    subject = require('../../index');
    mockUi = {
      verbose: true,
      messages: [],
      write: function() { },
      writeLine: function(message) {
        this.messages.push(message);
      }
    };
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

    assert.typeOf(plugin.configure, 'function');
    assert.typeOf(plugin.prepare, 'function');
  });

  describe('configure hook', function() {
    it('resolves if config is ok', function() {
      var plugin = subject.createDeployPlugin({
        name: 'revision-data'
      });

      var context = {
        ui: mockUi,
        config: {
          "revision-data": {
            type: 'file-hash',
            filePattern: 'eeee'
          }
        }
      };

      plugin.beforeHook(context);
      plugin.configure(context);
      assert.ok(true); // it didn't throw
    });
    it('warns about missing optional config', function() {
      var plugin = subject.createDeployPlugin({
        name: 'revision-data'
      });

      var context = {
        ui: mockUi,
        config: {
          "revision-data": {
          }
        }
      };

      plugin.beforeHook(context);
      plugin.configure(context);

      var messages = mockUi.messages.reduce(function(previous, current) {
        if (/- Missing config:\s.*, using default:\s/.test(current)) {
          previous.push(current);
        }

        return previous;
      }, []);

      assert.equal(messages.length, 7);
    });

    it('adds default config to the config object', function() {
      var plugin = subject.createDeployPlugin({
        name: 'revision-data'
      });

      var context = {
        ui: mockUi,
        config: {
          "revision-data": {
          }
        }
      };

      plugin.beforeHook(context);
      plugin.configure(context);

      assert.isDefined(context.config['revision-data'].type);
      assert.isDefined(context.config['revision-data'].filePattern);
      assert.isDefined(context.config['revision-data'].scm);
    });
  });

  describe('prepare hook', function() {
    it('returns the revisionData', function() {
      var plugin = subject.createDeployPlugin({
        name: 'revision-data'
      });

      var context = {
        distDir: 'tests/fixtures',
        distFiles: ['index.html'],
        ui: mockUi,
        config: {
          "revision-data": {
            type: 'file-hash',
            filePattern: 'index.html',
            scm: function(/* context */) {
              return require('../../lib/scm-data-generators')['git'];
            },
            distDir: function(context) {
              return context.distDir;
            },
            distFiles: function(context) {
              return context.distFiles;
            }
          },
        }
      };
      plugin.beforeHook(context);

      return assert.isFulfilled(plugin.prepare(context))
        .then(function(result) {
          assert.equal(result.revisionData.revisionKey, 'ae1569f72495012cd5e8588e0f2f5d49');
          assert.isNotNull(result.revisionData.timestamp);
          assert.isNotNull(result.revisionData.scm.email);
        });
    });
  });
});
