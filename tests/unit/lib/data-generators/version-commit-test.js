'use strict';

var assert = require('../../../helpers/assert');
var gitRepoInfo = require('git-repo-info');

describe('the version-commit data generator', function() {
  var DataGenerator;
  var cwd;

  before(function() {
    DataGenerator = require('../../../../lib/data-generators/version-commit');
    gitRepoInfo._changeGitDir('dotgit');
  });

  beforeEach(function() {
    cwd = process.cwd();
  });

  afterEach(function() {
    process.chdir(cwd);
  });

  describe('#generate', function() {
    describe('with partial commit data', function() {
      before(function() {
        gitRepoInfo._changeGitDir('dotgit-branch-only');
      });

      after(function() {
        gitRepoInfo._changeGitDir('dotgit');
      });

      it('only adds `+revision` if it can be read', function() {
        process.chdir('tests/fixtures/repo');

        var plugin = {
          stubConfig: {
            versionFile: 'package.json',
            separator: '+'
          },
          readConfig: function(key) { return this.stubConfig[key]; },
          log: function() {}
        };

        var subject = new DataGenerator({
          plugin: plugin
        });

        return assert.isFulfilled(subject.generate())
          .then(function(data) {
            assert.equal(data.revisionKey, '3.2.1');
          });
      });

      it('logs a warning if no git sha found', function() {
        process.chdir('tests/fixtures/repo');

        var expectedMessage = /missing git commit sha/i;
        var plugin = {
          stubConfig: {
            versionFile: 'package.json',
            separator: '+'
          },
          readConfig: function(key) { return this.stubConfig[key]; },
          log: function(message) {
            assert.ok(message.match(expectedMessage));
          }
        };

        var subject = new DataGenerator({
          plugin: plugin
        });

        return assert.isFulfilled(subject.generate())
      })
    });

    it('concatenates the package version and the git commit hash', function() {
      process.chdir('tests/fixtures/repo');

      var plugin = {
        stubConfig: {
          versionFile: 'package.json',
          separator: '+'
        },
        readConfig: function(key) { return this.stubConfig[key]; }
      };

      var subject = new DataGenerator({
        plugin: plugin
      });

      return assert.isFulfilled(subject.generate())
        .then(function(data) {
          assert.equal(data.revisionKey, '3.2.1+41d41f08');
        });
    });

    it('concatenates the package version and the git commit hash with a custom separator', function() {
      process.chdir('tests/fixtures/repo');

      var plugin = {
        stubConfig: {
          versionFile: 'package.json',
          separator: '--'
        },
        readConfig: function(key) { return this.stubConfig[key]; }
      };

      var subject = new DataGenerator({
        plugin: plugin
      });

      return assert.isFulfilled(subject.generate())
        .then(function(data) {
          assert.equal(data.revisionKey, '3.2.1--41d41f08');
        });
    });

    it('has version source file option', function() {
      process.chdir('tests/fixtures/repo');

      var plugin = {
        stubConfig: {
          versionFile: 'version.json',
          separator: '+'
        },
        readConfig: function(key) { return this.stubConfig[key]; }
      };

      var subject = new DataGenerator({
        plugin: plugin
      });

      return assert.isFulfilled(subject.generate())
        .then(function(data) {
          assert.equal(data.revisionKey, '1.2.3+41d41f08');
        });
    });

    it('returns a timestamp', function() {
      process.chdir('tests/fixtures/repo');

      var plugin = {
        stubConfig: {
          versionFile: 'package.json',
          separator: '+'
        },
        readConfig: function(key) { return this.stubConfig[key]; }
      };

      var subject = new DataGenerator({
        plugin: plugin
      });

      return assert.isFulfilled(subject.generate())
        .then(function(data) {
          assert.isNotNull(data.timestamp);
        });
    });

    it('rejects if no repository found', function() {
      process.chdir('tests/fixtures/not-a-repo');

      var plugin = {
        stubConfig: {
          versionFile: 'package.json',
          separator: '+'
        },
        readConfig: function(key) { return this.stubConfig[key]; }
      };

      var subject = new DataGenerator({
        plugin: plugin
      });

      return assert.isRejected(subject.generate())
        .then(function(error) {
          assert.equal(error, 'Could not find git repository');
        });
    });

    it('rejects when the version source file doesn\'t exist', function() {
      process.chdir('tests/fixtures/repo');

      var plugin = {
        stubConfig: {
          versionFile: 'tests/fixtures/missing-version.json',
          separator: '+'
        },
        readConfig: function(key) { return this.stubConfig[key]; }
      };

      var subject = new DataGenerator({
        plugin: plugin
      });

      return assert.isRejected(subject.generate());
    });
  });
});
