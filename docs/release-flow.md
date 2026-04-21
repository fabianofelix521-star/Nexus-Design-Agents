# Release Flow

Nexus uses a single release branch plus short-lived feature branches.

## Branching model

- `main`: stable integration branch and source of release automation.
- `feature/*`: new work.
- `fix/*`: targeted fixes.

## Package publishing

- Public packages are versioned with Changesets.
- Merging versioned changes to `main` triggers the release workflow.
- The VS Code extension is packaged separately as a VSIX and is not part of npm publication.

## Local bootstrap

If the repository is newly cloned or initialized locally:

```bash
git checkout -b main
pnpm install
pnpm typecheck && pnpm test && pnpm build
```