# Release

The following steps should navigate you through the release process to ensure as few issues as possible.

## Steps

### Commit the changelog, bump version, and publish to NPM

1. run `./bin/changelog` and add output to `CHANGELOG.md`
2. edit changelog output to be as user-friendly as possible (drop [INTERNAL] changes etc.)
3. `ember release`
4. `npm publish`

### Create a github release

1. under `Releases` on GitHub choose `Draft New Release`
2. enter the new version number created above as the tag, prefixed with v e.g. (v0.1.12)
3. for release title choose a great name, no pressure.
4. in the description paste the upgrade instructions from the previous release, followed by the new CHANGELOG entry
5. publish the release
