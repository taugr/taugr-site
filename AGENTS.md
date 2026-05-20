# Agent Instructions

## Project

- This is Tom Auger's personal Astro site.
- Use `pnpm` for package scripts.
- The site is statically built and deployed to GitHub Pages.

## Verification

- Run `pnpm format` for formatting checks. Do not use `prettier` directly; this repo uses `oxfmt`.
- Run `pnpm format:fix` when formatting changes are needed.
- Run `pnpm lint` for lint checks when code, scripts, or Astro components change.
- Run `pnpm build` before finishing structural, content, metadata, asset, or deployment workflow changes.

## Environment Variables

- Local-only values belong in `.env`, which is gitignored.
- Public Astro client variables must use the `PUBLIC_` prefix.
- GitHub Pages builds receive repository variables through `.github/workflows/deploy.yml`.

## Commits

- Make commits using Conventional Commits.
- Use the form `<type>(optional-scope): <description>`.
- Prefer common types such as `feat`, `fix`, `docs`, `chore`, `refactor`, and `test`.
