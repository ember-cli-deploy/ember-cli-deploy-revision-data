# ember-cli-deploy-revision-data

> An ember-cli-deploy plugin to generate data about this deploy revision including a unique revision key based on the current build

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-revision-data.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)

This plugin will generate revison data for the current build. This data can be used by other plugins to understand more about the current revision being deployed.
The revision key included in the revison data can be used to uniquely identify the particular version of the application.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Quick Start
To get up and running quickly, do the following:

- Ensure [ember-cli-deploy-build][2] is installed and configured

- Install this plugin

```bash
$ ember install ember-cli-deploy-revision-data
```

- Run the pipeline

```bash
$ ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-revision-data
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `configure`
- `prepare`

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].

### Defaults
```
ENV["revision-data"] = {
  type: 'file-hash',
  scm: function(context) {
    return require('./lib/scm-data-generators')['git'];
  }
}
```
### type

The type of [Data Generator](#data-generators) to be used.

*Default:* `'file-hash'`
*Alternatives:* `'git-tag-commit'`, `'git-commit'`, `'version-commit'`

### scm

The type of the [SCM Data Generator](#scm-data-generator) to be used

*Default:* GitScmDataGenerator

You can set this to `null` if you don't want any Scm Data Generator to be used.

You can also pass your own custom scm generator class.

## Data Generators

Data generators are the strategies used to generate information about the revision being deployed. A data generator must return an object which contains a property called `revisionKey` which uniquely identifies the current revision. A generator can add any other data that it deems relevant to the data object that it returns.

### File Hash generator

This generator contructs a revisionKey from the fingerprint of the `index.html` file.

#### Data fields returned

##### revisionKey

The unique identifier of this build based on the MD5 fingerprint of the `index.html` file. This key is guaranteed to be idempotent. That is, the same revision key will be generated for the same set of project files. If the project files change in any way, this will be reflected by a change in the revision key.

##### timestamp

The timestamp of the current deploy

#### Configuration Options

##### filePattern

A pattern that matches the file you would like to be fingerprinted. This pattern should be relative to `distDir`.

*Default:* `index.html`

##### distDir

The root directory where the file matching `filePattern` will be searched for. By default, this option will use the `distDir` property of the deployment context, provided by [ember-cli-deploy-build][2].

*Default:* `context.distDir`

##### distFiles

The list of built project files. This option should be relative to `distDir` and should include the file that matches `filePattern`. By default, this option will use the `distFiles` property of the deployment context, provided by [ember-cli-deploy-build][2].

*Default:* `context.distFiles`

### Git Tag Commit generator

Constructs a revision key based on the most recent git tag and the currently checked-out commit.

#### Data fields returned

##### revisionKey

The unique identifier of this build based on the git tag, followed by a the separator symbol (`+` by default), followed by the first 8 characters of the current commit hash.

For example, if your most recent git tag is `v2.0.3`, and the current commit is `0993043d49f9e0[...]`, this generator will return a revision of `v2.0.3+0993043d`.

##### timestamp

The timestamp of the current deploy

#### Configuration Options

##### separator

The text used to separate the tag name from the commit sha. By default, `+` is used.

### Git Commit generator

Constructs a revision key based on the most recent git commit.

#### Data fields returned

##### revisionKey

The unique identifier of this build based on the first 7 characters of the current commit hash.

For example, if the current commit is `0993043d49f9e0[...]`, this generator will return a revision of `0993043`.

##### timestamp

The timestamp of the current deploy

### Version Commit generator

Similar to the Git Tag Commit generator but uses the `package.json` version string to construct the revision key instead of the git tag.

#### Data fields returned

##### revisionKey

The unique identifier of this build based on the version in the `package.json`, followed by a the separator symbol (`+` by default), followed by the first 8 characters of the current commit hash.

For example, if your package.json version is `v2.0.3`, and the current commit is `0993043d49f9e0[...]`, this generator will return a revision of `v2.0.3+0993043d`.

`Note:` Some environments (like CircleCI) may return partial git information. If the current commit hash cannot be determined, the generator will return only the package.json version (`v2.0.3`) as the `revisionKey`.

##### timestamp

The timestamp of the current deploy

#### Configuration Options

##### separator

The text used to separate the tag name from the commit sha. By default, `+` is used.

##### versionFile

The file containing your project's version number. Must be a JSON file with a top-level `version` key.

*Default:* `package.json`

## SCM Data Generators

SCM Data generators are the strategies used to collect extra information about the revision being deployed. An scm data generator must return an object which contains properties that it deems relevant to the revision being deployed .

### Git generator

This generator uses the information available from the git repository of your ember-cli application.

#### Data fields returned

##### sha

The SHA of the commit being deployed

##### email

Committer's email

##### name

Committer's name

##### message

The commit message

##### branch

Git branch being deployed

##### timestamp

Commit's timestamp

## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`   (provided by [ember-cli-deploy-build][2])
- `distFiles` (provided by [ember-cli-deploy-build][2])

## Plugins known to work well with this one

[ember-cli-deploy-redis](https://github.com/ember-cli-deploy/ember-cli-deploy-redis)

## Running Tests

* yarn test

## Why `ember build` and `ember test` don't work

Since this is a node-only ember-cli addon, this package does not include many files and dependencies which are part of ember-cli's typical `ember build` and `ember test` processes.

[1]: http://ember-cli-deploy.com/ "Plugin Documentation"
[2]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"
[3]: https://github.com/ember-cli/ember-cli-deploy "ember-cli-deploy"
