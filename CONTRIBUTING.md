# Contributing

## Branch flow

- `main` is the release branch.
- Create feature branches from `main` using `feature/<scope>` or `fix/<scope>`.
- Open pull requests back into `main`.
- Add a Changeset when a public package changes.

## Validation before merge

Run the full workspace checks before opening a pull request:

```bash
pnpm typecheck
pnpm test
pnpm build
```

If you changed the VS Code extension, also run:

```bash
pnpm --filter nexus-vscode-extension typecheck
pnpm --filter nexus-vscode-extension build
pnpm --filter nexus-vscode-extension package:vsix
```

## Release flow

1. Land changes on `main` with a Changeset.
2. Let the release workflow create or update the versioning pull request.
3. Merge the versioning pull request to publish packages.

## Target demos

Target-specific example scripts live under `examples/` and can be used as smoke tests before merge.