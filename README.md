# ember-cli-deploy-revision-data

> An ember-cli-deploy plugin to generate data about this deploy revision including a unique revision key based on the current build

<hr/>
**WARNING: This plugin is only compatible with ember-cli-deploy versions >= 0.5.0**
<hr/>

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

### type

The type of [Data Generator](#data-generators) to be used.

*Default:* `'file-hash'`
*Alternatives:* `'git-tag-commit'`, `'git-commit'`, `'version-commit'`

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

The unique identifier of this build based on the git tag, followed by a `+` symbol, followed by the first 8 characters of the current commit hash.

For example, if your most recent git tag is `v2.0.3`, and the current commit is `0993043d49f9e0[...]`, this generator will return a revision of `v2.0.3+0993043d`.

##### timestamp

The timestamp of the current deploy

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

The unique identifier of this build based on the version in the `package.json`, followed by a `+` symbol, followed by the first 8 characters of the current commit hash.

For example, if your package.json version is `v2.0.3`, and the current commit is `0993043d49f9e0[...]`, this generator will return a revision of `v2.0.3+0993043d`.

##### timestamp

The timestamp of the current deploy

#### Configuration Options

##### versionFile

The file containing your project's version number. Must be a JSON file with a top-level `version` key.

*Default:* `package.json`

## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`   (provided by [ember-cli-deploy-build][2])
- `distFiles` (provided by [ember-cli-deploy-build][2])

## Plugins known to work well with this one

[ember-cli-deploy-redis](https://github.com/ember-cli-deploy/ember-cli-deploy-redis)

## Running Tests

- `npm test`

[1]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
[2]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"
[3]: https://github.com/ember-cli/ember-cli-deploy "ember-cli-deploy"
