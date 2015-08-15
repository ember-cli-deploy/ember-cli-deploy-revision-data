# ember-cli-deploy-revision-key

> An ember-cli-deploy plugin to generate a unique revision key based on the current build

<hr/>
**WARNING: This plugin is only compatible with ember-cli-deploy versions >= 0.5.0**
<hr/>

This plugin will generate a unique revision key for the current build. The revision key can be used to uniquely identify the particular version of the application.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Quick Start
To get up and running quickly, do the following:

- Ensure [ember-cli-deploy-build][2] is installed and configured

- Install this plugin

```bash
$ ember install ember-cli-deploy-revision-key
```

- Run the pipeline

```bash
$ ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-revision-key
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `configure`
- `didBuild`

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].

### type

The type of [Key Generator](#key-generators) to be used.

*Default:* `'file-hash'`
*Alternatives:* `'git-tag-commit'`, `'version-commit'`

## Key Generators

Key generators are the strategies used to generate the unique revision key. Currently there is only one Key Generator implementation but we will add more as needed. Some examples of other potential key generators are `GitHash` or `DateTime` generators.

### File Hash generator

This key generator will fingerprint the `index.html` and return an MD5 hash. The generation of the revision key, using this generator, is guaranteed to be idempotent. That is, the same revision key will be generated for the same set of project files. If the project files change in any way, this will be reflected by a change in the revision key.

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

Creates a key based on the most recent git tag and the currently checked-out commit. The tag is the tag identifier, followed by a `+` symbol, followed by the first 8 characters of the commit hash.

For example, if your most recent git tag is `v2.0.3`, and the current commit is `0993043d49f9e0[...]`, this generator will return a revision of `v2.0.3+0993043d`.

### Version Commit generator

Similar to the Git Tag Commit generator, but uses the `package.json` version string instead of the git tag. The JSON file containing the version string can be configured with the `versionFile` option.

#### Configuration Options

##### versionFile

The file containing your project's version number. Must be a JSON file with a top-level `version` key. Only used by the `version-commit` key generator.

*Default:* `package.json`

## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`   (provided by [ember-cli-deploy-build][2])
- `distFiles` (provided by [ember-cli-deploy-build][2])

## Plugins known to work well with this one

[ember-cli-deploy-redis](https://github.com/zapnito/ember-cli-deploy-redis)

## Running Tests

- `npm test`

[1]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
[2]: https://github.com/zapnito/ember-cli-deploy-build "ember-cli-deploy-build"
[3]: https://github.com/ember-cli/ember-cli-deploy "ember-cli-deploy"
