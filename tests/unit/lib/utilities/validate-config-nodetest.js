var assert = require('ember-cli/tests/helpers/assert');

describe('validate-config', function() {
  var subject;
  var config;
  var mockUi;

  before(function() {
    subject = require('../../../../lib/utilities/validate-config');
  });

  beforeEach(function() {
    config = {
      type: 'aaaa',
      filePattern: 'eeee'
    };

    mockUi = {
      messages: [],
      write: function() { },
      writeLine: function(message) {
        this.messages.push(message);
      }
    };
  });

  it('warns about missing optional config', function() {
    delete config.type;
    delete config.filePattern;

    return assert.isFulfilled(subject(mockUi, config))
      .then(function() {
        var messages = mockUi.messages.reduce(function(previous, current) {
          if (/- Missing config:\s.*, using default:\s/.test(current)) {
            previous.push(current);
          }

          return previous;
        }, []);

        assert.equal(messages.length, 2);
      });
  });

  it('adds default config to the config object', function() {
    delete config.type;
    delete config.filePattern;

    assert.isUndefined(config.type);
    assert.isUndefined(config.filePattern);

    return assert.isFulfilled(subject(mockUi, config))
      .then(function() {
        assert.isDefined(config.type);
        assert.isDefined(config.filePattern);
      });
  });

  it('resolves if config is ok', function() {
    return assert.isFulfilled(subject(mockUi, config));
  })
});
