var fs          = require('fs');
var Fingerprint = require('broccoli-asset-rev/lib/fingerprint');

function IndexHashTag(options) {
  this.options = options || {};
}

IndexHashTag.prototype.generate = function() {
  var indexPath = this.options.indexPath;

  if (!fs.existsSync(indexPath)) {
    return '';
  }

  var contents    = fs.readFileSync(indexPath);
  var fingerprint = new Fingerprint();

  return fingerprint.hashFn(contents);
};

module.exports = IndexHashTag;
