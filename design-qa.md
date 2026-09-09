# Homepage hero design QA

final result: passed

## Evidence

- Source visual truth: `/Users/tomauger/.codex/generated_images/01a0863e-f104-7981-85ef-74bfdb31d2bb/exec-642ca877-85b8-41a5-b89c-26e4054df05c.png`.
- Implementation: `http://127.0.0.1:4321/`, built Astro preview.
- Screenshots and measurements: `/Users/tomauger/.codex/visualizations/2026/09/09/01a0863e-f104-7981-85ef-74bfdb31d2bb/home-hero/`.
- Full-view comparison: approved mockup and `desktop.png` opened together in one image comparison tool response. Source 1487 × 1058 pixels; implementation and CSS viewport 1488 × 1056. Approximately 1:1 image density; no resampling. The negligible canvas difference does not affect the comparison.
- State: English homepage, top of page, light theme, menus closed. Additional captures: 390 × 844 mobile, settled desktop dark theme, Armenian desktop.
- Focused crop unnecessary: the complete hero, name, portrait, and action labels were legible in the full-view comparison; DOM measurements independently confirmed 128px portrait, 28px name, and 620px heading column.

## Findings and fidelity surfaces

No actionable P0, P1, or P2 findings.

- Typography: existing Manrope and Armenian font retained. The name is 28px semibold, with one large two-line English heading. Mobile uses a 24px name and existing responsive headline sizing. Armenian wraps naturally to accommodate longer copy.
- Spacing/layout: portrait beside the desktop headline, name above it, paragraph and actions aligned to the text column. The repeated subtitle and standalone profile block are removed. Existing 780px page width retained, rather than expanding the whole site to the generated mockup's roughly 866px column; headline, portrait, buttons, and project rows therefore use the established site scale. This is an intentional scope constraint, not an unresolved visual defect.
- Colors/tokens: existing cream, forest green, dark-theme tokens, separators, and button treatments preserved. Dark capture was repeated after the existing color transition settled to #111915.
- Image quality: original 640px portrait asset used with circular object-fit at 128px desktop and 64px mobile. Original project icons retained. The mockup's regenerated face and project artwork were not substituted for source assets.
- Copy/content: original headline, TUMO description, action labels, projects, metadata, and routes retained. Duplicate tagline and unused profile labels removed in all three locales.

## Verification

- English: no document or hero horizontal overflow at 320, 390, 639, 640, 641, and 1488px.
- Spanish and Armenian: no document or hero horizontal overflow at 320, 640, and 1488px.
- Explore my work reached #selected-projects with section top approximately 24px from viewport top.
- About Tom opened the About page; language menu navigated to Spanish.
- Theme toggle changed to dark and back to light.
- Browser console error log empty when checked.
- pnpm format, pnpm lint, and pnpm build passed; build checked 14 translated routes.

## Comparison history

First implementation comparison passed. No visual fixes were required. Initial mobile capture during rapid viewport changes and dark capture during the theme transition were replaced by settled captures; these were capture timing issues, not layout defects.

## Implementation checklist

- [x] Implement approved smaller-portrait hierarchy across all homepages.
- [x] Preserve mobile readability and existing site assets and metadata.
- [x] Validate desktop, mobile, translated pages, actions, theme, and build.
- [x] Leave local preview running for user review.
- [x] Do not deploy or push.

## Follow-up polish

None required before local review. This is a focused homepage check, not a full-site accessibility audit.
