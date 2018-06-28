var VersionCommit = require('./version-commit');

module.exports = VersionCommit.extend({
    generate() {
        return this._super().then(function(results) {
            var separator = this._plugin.readConfig('separator');
            var circleBuild = process.env.CIRCLE_BUILD_NUM;
            var revision = results.revisionKey;

            if (isFinite(circleBuild)) {
                revision = [revision, circleBuild].join(separator);
            }

            return {
                revisionKey: revision,
                timestamp: results.timestamp
            };
        });
    }
});
