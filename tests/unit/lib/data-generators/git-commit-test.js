'use strict';

var assert = require('../../../helpers/assert');
var gitRepoInfo = require('git-repo-info');

describe('the git-commit data generator', function() {
  var DataGenerator;
  var cwd;

  before(function() {
    DataGenerator = require('../../../../lib/data-generators/git-commit');
    gitRepoInfo._changeGitDir('dotgit');
  });

  beforeEach(function() {
    cwd = process.cwd();
  });

  afterEach(function() {
    process.chdir(cwd);
  });

  describe('#generate', function() {
    it('revision key contains first 7 characters of git commit hash', function() {
      process.chdir('tests/fixtures/repo');

      var subject = new DataGenerator();

      return assert.isFulfilled(subject.generate())
        .then(function(data) {
          assert.equal(data.revisionKey, '41d41f0');
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
  });
});
