---
name: add-project-entry
description: Add or update project entries for this Astro personal site. Use when the user asks to add a GitHub repo/project to the projects page, feature or unfeature a project on the homepage, fetch project metadata or README assets such as logos, update src/content/projects/*.md, verify the Astro build, and visually check the homepage/projects page.
---

# Add Project Entry

## Workflow

1. Inspect existing project entries in `src/content/projects/` and match their frontmatter style.
2. Resolve the GitHub repository:
   - Prefer `gh repo view <owner>/<repo>` when available.
   - Use the GitHub API or README raw URLs as fallback.
   - If the repo name is ambiguous, ask for clarification before inventing metadata.
3. Create or update a project markdown file in `src/content/projects/`.
4. For README logos:
   - Read the README.
   - Resolve relative image paths against the GitHub raw URL.
   - Download the logo into `src/content/projects/`.
   - Add `image` and `imageAlt` frontmatter.
5. Homepage featured behavior:
   - Set `featured: true` for projects that should appear on the homepage.
   - Set `featured: false` for projects to remove from the homepage.
   - Do not delete old project entries unless explicitly asked.
6. Run `pnpm build`.
7. Run the app and visually verify.

## Verification

Use this order:

1. Run `pnpm build`.
2. Start a clean local server:
   - Check `lsof -ti tcp:4321`.
   - Stop stale Astro processes if needed.
   - Run `pnpm dev --host 127.0.0.1`.
3. Confirm rendered HTML with `curl`/`rg` for:
   - Project name.
   - Featured inclusion or exclusion.
   - Image alt text or generated image URL.
4. Visual check:
   - Use the built-in Browser plugin first.
   - If Browser is unavailable or its required execution tool is not exposed, use Chrome as fallback.
   - When using Chrome fallback, save screenshots with a new filename to avoid stale preview confusion.
5. Stop the dev server before finishing.

## Commit Hygiene

If asked to commit:

- Stage only content/assets needed for the project change.
- Do not stage generated screenshots unless explicitly requested.
- Run `git status --short` before and after committing.
