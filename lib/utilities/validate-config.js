var Promise = require('ember-cli/lib/ext/promise');

var chalk  = require('chalk');
var yellow = chalk.yellow;
var blue   = chalk.blue;

module.exports = function(ui, config) {
  ui.write(blue('|    '));
  ui.writeLine(blue('- validating config'));

  var defaultConfig = {
    filePattern: 'index.html'
  };

  if (!config.filePattern) {
    var value = defaultConfig.filePattern;
    config.filePattern = value;
    ui.write(blue('|    '));
    ui.writeLine(yellow('- Missing config: `filePattern`, using default: `' + value + '`'));
  }

  return Promise.resolve();
}
