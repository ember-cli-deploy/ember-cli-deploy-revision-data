'use strict';

var assert = require('../../../helpers/assert');
var gitRepoInfo = require('git-repo-info');

describe('the git-tag-commit data generator', function() {
  var DataGenerator;
  var cwd;

  before(function() {
    DataGenerator = require('../../../../lib/data-generators/git-tag-commit');
    gitRepoInfo._changeGitDir('dotgit');
  });

  beforeEach(function() {
    cwd = process.cwd();
  });

  afterEach(function() {
    process.chdir(cwd);
  });

  describe('#generate', function() {
    it('concatenates the git tag and the git commit hash', function() {
      process.chdir('tests/fixtures/repo');

      var subject = new DataGenerator();

      return assert.isFulfilled(subject.generate())
        .then(function(data) {
          assert.equal(data.revisionKey, '2.3.4+41d41f08');
        });
    });

    it('returns a timestamp', function() {
      process.chdir('tests/fixtures/repo');

      var subject = new DataGenerator();

      return assert.isFulfilled(subject.generate())
        .then(function(data) {
          assert.isNotNull(data.timestamp);
        });
    });

    it('rejects if no repository found', function() {
      process.chdir('tests/fixtures/not-a-repo');

      var subject = new DataGenerator();

      return assert.isRejected(subject.generate())
        .then(function(error) {
          assert.equal(error, 'Could not find git repository');
        });
    });

    it('rejects if no git tag found', function() {
      process.chdir('tests/fixtures/tagless-repo');

      var subject = new DataGenerator();

      return assert.isRejected(subject.generate())
        .then(function(error) {
          assert.equal(error, 'Could not build revision with tag `null` and commit hash `9138ef99`');
        });
    });
  });
});
