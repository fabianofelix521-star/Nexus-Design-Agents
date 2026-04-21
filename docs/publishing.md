# Publishing

Nexus uses Changesets for package versioning and npm publication.

## Local release flow

1. Run `pnpm changeset` and describe the package changes.
2. Run `pnpm version-packages` to update package versions and changelog state.
3. Run `pnpm typecheck && pnpm test && pnpm build`.
4. Publish with `pnpm release:publish` when `NPM_TOKEN` is available.

## GitHub Actions

The release workflow runs on `main` and uses `changesets/action` to either open a versioning pull request or publish packages when pending changesets already exist.

## Repository setup notes

- Add `NPM_TOKEN` to repository secrets.
- Initialize the repository on GitHub before relying on release automation.
- The VS Code extension stays private and is excluded from the public package release pipeline.