'use strict';

var assert = require('ember-cli/tests/helpers/assert');

describe('the index-hash tag', function() {
  var Tag;

  before(function() {
    Tag = require('../../../../lib/tags/index-hash');
  });

  describe('#generate', function() {
    it ('generates a hash of the supplied index file', function() {
      var subject = new Tag({
        indexPath: process.cwd() + '/tests/fixtures/index.html'
      });

      var hash = subject.generate();

      assert.equal(hash, 'ae1569f72495012cd5e8588e0f2f5d49');
    });

    it('returns an empty string when the file doesn\'t exist', function() {
      var subject = new Tag({
        indexPath: 'non-existent-file.xml'
      });

      var hash = subject.generate();

      assert.equal(hash, '');
    });
  });
});
