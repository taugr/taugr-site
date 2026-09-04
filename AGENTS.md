# Agent Instructions

## Codex workflow

This project's `.codex/config.toml` selects GPT-6 Astra (`gpt-6-astra`) with medium reasoning. Explicit user model choices take precedence. This configures Codex development work; application model selections remain separate.

- Complete authorized work through implementation and relevant verification. Use existing project patterns for routine, reversible decisions; ask when missing information materially changes scope or outcome.
- Preserve unrelated working-tree changes and existing application behavior. Follow explicit boundaries on planning, commits, pushes, releases, and deployment.
- Prepare a concrete, reviewable result before requesting any additional authorization that is actually needed. Continue independent authorized work while awaiting clarification.
- Follow explicit user instructions over skill guidelines, subject to system and developer requirements. If a skill blocks progress, link to the exact instruction and explain why it applies.
- Keep progress updates and final reports concise: explain what changed, what was verified, and any remaining blocker.
- Run checks proportional to the change and complete required project gates. Instruction-only changes need a diff, Markdown formatting, and configuration validation; behavior changes need relevant tests. Do not repeat successful checks without new evidence.
- Use subagents when requested by the user or required by applicable instructions. Give each a bounded responsibility and preserve other agents' changes.
- Use `pnpm` and check `package.json` for current scripts. Keep generated files and local artifacts out of the commit unless explicitly requested.

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
