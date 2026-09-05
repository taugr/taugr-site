# Agent Instructions

## Codex workflow

Codex uses `gpt-6-astra` with medium reasoning in `.codex/config.toml`. Preserve that effort and explicit user model choices. This workflow applies the [Astra prompting guidance](https://developers.openai.com/api/docs/guides/latest-model#prompting-best-practices).

- Carry action requests through the authorized implementation and verification. Resolve routine choices from the project; ask only when the answer changes the result materially, and continue independent work while waiting. Keep the original goal when the user adds corrections or side questions.
- Preserve unrelated edits and the user's boundaries for commits, publishing, and deployment. Reuse authorization already given; prepare the reviewable result before requesting any additional permission.
- Read applicable project skills for the affected area. User instructions take precedence over skill guidelines, subject to system and developer rules. If a skill blocks progress, link to the skill, quote the exact instruction, and explain whether the restriction is explicit or inferred.
- Report the outcome, evidence, and remaining limits in concise, plain prose. Use lists for steps or comparisons; avoid stock summaries and unnecessary jargon.
- Run checks proportional to the change and required project gates. Once they pass, repeat or broaden them only for new edits, failures, or unresolved concerns. Add tests for meaningful behavior, not to mirror low-impact documentation or configuration edits.
- Delegate only when the user or governing instructions authorize it. Then assign independent, bounded work with clear ownership and readable handoffs; avoid duplicate investigation.
- Preserve project metadata, featured ordering, asset paths, and locale routes. Use source evidence for project facts and keep existing content conventions unless the user asks for a redesign.
- Build once after the final content or structural edit; `pnpm build` includes translated-route checks. Reuse that result for visual verification and rebuild only after relevant changes or a failure.

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
