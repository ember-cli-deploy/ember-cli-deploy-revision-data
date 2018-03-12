'use strict';

var assert = require('../../../helpers/assert');
var gitRepoInfo = require('git-repo-info');
var ScmDataGenerator = require('../../../../lib/scm-data-generators/git');

describe('the git scm data generator', function() {
  var cwd;

  before(function() {
    gitRepoInfo._changeGitDir('dotgit');
  });

  beforeEach(function() {
    cwd = process.cwd();
  });

  afterEach(function() {
    process.chdir(cwd);
  });

  describe('#generate', function() {
    it('returns the correct data', function() {
      process.chdir('tests/fixtures/repo');

      var subject = new ScmDataGenerator('dotgit');

      return assert.isFulfilled(subject.generate())
        .then(function(data) {
          assert.equal(data.sha, '41d41f081b45ad50935c08b1203220737d9739b4');
          assert.equal(data.email, 'alisdair@mcdiarmid.org');
          assert.equal(data.name, 'Alisdair McDiarmid');
          assert.equal(data.message, 'Initial commit')
          assert.isNotNull(data.timestamp);
          assert.equal(data.branch, 'master');
          assert.equal(data.tag, '2.3.4');
        });
    });
  });
});
