'use strict';

var assert = require('../../../helpers/assert');

describe('the file-hash data generator', function() {
  var DataGenerator;

  before(function() {
    DataGenerator = require('../../../../lib/data-generators/file-hash');
  });

  describe('#generate', function() {
    describe('revisionData', function() {
      var subject;

      before(function() {
        var plugin = {
          stubConfig: {
            distDir: 'tests/fixtures',
            distFiles: ['index.html'],
            filePattern: 'index.html'
          },
          readConfig: function(key) { return this.stubConfig[key]; }
        };

        subject = new DataGenerator({
          plugin: plugin
        });
      });

      it('includes the revisonKey', function() {
        return assert.isFulfilled(subject.generate())
          .then(function(revisionData) {
            assert.equal(revisionData.revisionKey, 'ae1569f72495012cd5e8588e0f2f5d49');
          });
      });

      it('includes a timestamp', function() {
        return assert.isFulfilled(subject.generate())
          .then(function(revisionData) {
            assert.isNotNull(revisionData.timestamp);
          });
      });
    });

    it('rejects when the filePattern doesn\'t exist in distFiles', function() {
      var plugin = {
        stubConfig: {
          distDir: 'tests/fixtures',
          distFiles: ['index.html'],
          filePattern: 'some-file-that-does-not-exist'
        },
        readConfig: function(key) { return this.stubConfig[key]; }
      };

      var subject = new DataGenerator({
        plugin: plugin
      });

      return assert.isRejected(subject.generate())
        .then(function(error) {
          assert.equal(error, '`some-file-that-does-not-exist` does not exist in distDir `tests/fixtures`');
        });
    });

    it('rejects when the file doesn\'t exist', function() {
      var plugin = {
        stubConfig: {
          distDir: 'tests/fixtures',
          distFiles: ['index.xxx'],
          filePattern: 'index.xxx'
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
