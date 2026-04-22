# Publishing

Nexus uses Changesets for package versioning and npm publication.

## Local release flow

1. Run `pnpm changeset` and describe the package changes.
2. Run `pnpm version-packages` to update package versions and changelog state.
3. Run `pnpm typecheck && pnpm test && pnpm build`.
4. Publish with `pnpm release:publish` when `NPM_TOKEN` is available.

## GitHub Actions

The release workflow runs on `main` and uses `changesets/action` to either open a versioning pull request or publish packages when pending changesets already exist.

## Repository

- GitHub repository: `https://github.com/fabianofelix521-star/Nexus-Design-Agents`
- Public packages publish from the `main` branch.

## VS Code extension

The VS Code extension is packaged separately as a VSIX.

```bash
pnpm --filter nexus-vscode-extension typecheck
pnpm --filter nexus-vscode-extension build
pnpm --filter nexus-vscode-extension package:vsix
```

To publish the extension, set these values:

- `NEXUS_VSCE_PUBLISHER`: the real Marketplace publisher id
- `VSCE_PAT`: Personal Access Token for `vsce`

The dedicated workflow lives in `.github/workflows/vscode-extension-release.yml`.

## Repository setup notes

- Add `NPM_TOKEN` to repository secrets.
- Add `VSCE_PAT` to repository secrets and `NEXUS_VSCE_PUBLISHER` to repository variables if you want Marketplace publication.
- The VS Code extension is excluded from npm publication and released as a VSIX instead.