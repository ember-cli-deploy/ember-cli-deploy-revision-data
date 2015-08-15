'use strict';

var assert = require('ember-cli/tests/helpers/assert');
var gitRepoInfo = require('git-repo-info');

describe('the git-tag-commit key generator', function() {
  var KeyGenerator;
  var cwd;

  before(function() {
    KeyGenerator = require('../../../../lib/key-generators/git-tag-commit');
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

      var subject = new KeyGenerator();

      return assert.isFulfilled(subject.generate())
        .then(function(revision) {
          assert.equal(revision, '2.3.4+41d41f08');
        });
    });

    it('rejects if no repository found', function() {
      process.chdir('tests/fixtures/not-a-repo');

      var subject = new KeyGenerator();

      return assert.isRejected(subject.generate())
        .then(function(error) {
          assert.equal(error, 'Could not find git repository');
        });
    });

    it('rejects if no git tag found', function() {
      process.chdir('tests/fixtures/tagless-repo');

      var subject = new KeyGenerator();

      return assert.isRejected(subject.generate())
        .then(function(error) {
          assert.equal(error, 'Could not build revision with tag `null` and commit hash `9138ef99`');
        });
    });
  });
});
