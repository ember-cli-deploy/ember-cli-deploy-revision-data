var CoreObject  = require('core-object');
var RSVP        = require('rsvp');

module.exports = CoreObject.extend({
  generate: function() {
    var key = process.env.REVISION_KEY;

    if (!key) {
      return RSVP.reject('Could not build revision with REVISION_KEY `' + key + '`');
    }

    return RSVP.resolve({
      revisionKey: key,
      timestamp: new Date().toISOString()
    });
  }
});
