# ember-cli-deploy-revision-data Changelog

## [0.2.1](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/tree/0.2.1) (2016-04-06)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/compare/v0.2.0...v0.2.1)

- \[BUGFIX\] Remove ' from commit hash if needed [\#31](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/31) ([ghedamat](https://github.com/ghedamat))

## [0.2.0](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/tree/0.2.0) (2016-04-01)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/compare/v0.1.1...v0.2.0)

Capture data about the current git revision (with abstraction for support for other SCM tools) and return it for storage in the deployment context's `revisionData.scm` node.

- add scm-data-generators and git scm generator [\#29](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/29) ([ghedamat](https://github.com/ghedamat))

## [v0.1.1](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/tree/v0.1.1) (2016-02-06)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/compare/v0.1.0...v0.1.1)

- update ember-cli-deploy-plugin [\#26](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/26) ([ghedamat](https://github.com/ghedamat))
- Update README.md [\#25](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/25) ([lcpriest](https://github.com/lcpriest))

## [v0.1.0](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/tree/v0.1.0) (2015-10-25)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/compare/v0.1.0-beta.4...v0.1.0)

- Update to use new verbose option for logging [\#20](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/20) ([lukemelia](https://github.com/lukemelia))

## [v0.1.0-beta.4](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/tree/v0.1.0-beta.4) (2015-10-23)
[Full Changelog](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/compare/v0.1.0-beta.3...v0.1.0-beta.4)

Package is now called ember-cli-deploy-revision-data.

#### Community Contributions

- [#19](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/19) Add git-commit data generator [@jrowlingson](https://github.com/jrowlingson)

Thank you to all who took the time to contribute!

## 0.1.0-beta.3

The following changes are required if you are upgrading from the previous version:
- Users
  + In package.json, rename `ember-cli-deploy-revision-key` to `ember-cli-deploy-revision-data` and change
    version to `0.1.0-beta.3`

#### Community Contributions

- [#16](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/16) Return revision metadata instead of just revisionKey [@achambers](https://github.com/achambers)

Thank you to all who took the time to contribute!

## 0.1.0-beta.2

#### Community Contributions

- [#13](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/13) Add git-tag-commit and version-commit key generators [@alisdair](https://github.com/alisdair)
- [#15](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/15) [BUGFIX] Remove dependency on broccoli-asset-rev [@achambers](https://github.com/achambers)

Thank you to all who took the time to contribute!

## 0.1.0-beta.1

#### Community Contributions

- [#1](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/1) Create a tag form the hash of the index.html [@achambers](https://github.com/achambers)
- [#3](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/3) Updated to be in line with how ember-cli-deploy handles context data [@achambers](https://github.com/achambers)
- [#4](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/4) Remove dependency on index path [@achambers](https://github.com/achambers)
- [#5](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/5) Now filePattern is relative to the dist dir stored in `context.distDir` [@achambers](https://github.com/achambers)
- [#6](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/6) Rename index-hash to file-hash [@lukemelia](https://github.com/lukemelia)
- [#7](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/7) Change to use `configure` hook instead of `willDeploy` [@achambers](https://github.com/achambers)
- [#8](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/8) Renamed project and all references to `tags` [@achambers](https://github.com/achambers)
- [#9](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/9) `configure` primes the config with data from the deployment context [@achambers](https://github.com/achambers)
- [#10](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/10) Restructure to use ember-cli-deploy-plugin, and complete rename to em… [@lukemelia](https://github.com/lukemelia)
- [#12](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/pull/12) Update README for v0.5.0 [@achambers](https://github.com/achambers)

Thank you to all who took the time to contribute!
