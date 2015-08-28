'use strict';

var assert = require('ember-cli/tests/helpers/assert');
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
    it('concatenates the package version and the git commit hash', function() {
      process.chdir('tests/fixtures/repo');

      var plugin = {
        stubConfig: {
          versionFile: 'package.json'
        },
        readConfig: function(key) { return this.stubConfig[key]; }
      };

      var subject = new DataGenerator({
        plugin: plugin
      });

      return assert.isFulfilled(subject.generate())
        .then(function(revision) {
          assert.equal(revision, '3.2.1+41d41f08');
        });
    });

    it('rejects if no repository found', function() {
      process.chdir('tests/fixtures/not-a-repo');

      var plugin = {
        stubConfig: {
          versionFile: 'package.json'
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

    it('has version source file option', function() {
      process.chdir('tests/fixtures/repo');

      var plugin = {
        stubConfig: {
          versionFile: 'version.json'
        },
        readConfig: function(key) { return this.stubConfig[key]; }
      };

      var subject = new DataGenerator({
        plugin: plugin
      });

      return assert.isFulfilled(subject.generate())
        .then(function(revision) {
          assert.equal(revision, '1.2.3+41d41f08');
        });
    });

    it('rejects when the version source file doesn\'t exist', function() {
      process.chdir('tests/fixtures/repo');

      var plugin = {
        stubConfig: {
          versionFile: 'tests/fixtures/missing-version.json'
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
