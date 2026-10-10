# Jev essay charts

Run `python3 scripts/jev-charts/generate.py` from the blog root. This regenerates the three chart embeds in the research article and twelve transparent SVG exports in `src/assets/essays/jev-moderation/`: desktop and mobile, each with light and dark variants. No API calls, inference or external dependencies are used.

`chart-data.json` preserves the 36 full-precision values from the recorded aggregate results, their original displayed labels, dataset order, units and denominators. Its source hash identifies the aggregate result used by the original PNGs. The original PNGs remain untouched as reference evidence. Do not substitute the content-focused Jev results into these baseline charts.

The inline figures inherit the site's CSS variables and fonts, including explicit theme toggles. They have transparent backgrounds. Jev uses a solid green bar, GPT-5.6 Luna a striped purple bar and GPT-6 Luna a dotted neutral bar. All values and model names appear directly. Each SVG also supplies a title and full text description. Mobile rearranges each model label above its bar rather than shrinking the desktop chart. All scales are linear with a shared zero baseline: F1 0–100, historical cost 0–0.08 USD per 1,000 requests, and median recorded successful-request time 0–800 milliseconds.

The paired exported SVGs have fixed theme colors for use outside the site. Use a dark variant on a dark background. The article embeds are enclosed in `jev-chart:<id>:start/end` HTML comments so regeneration replaces only the figures. Article prose, tables, captions and metadata must remain unchanged.

The research route filters generated chart markup from its reading-time calculation. The article lives in `src/content/research/` and is built at `/research/evaluating-jev-for-content-moderation/`. Artwork is imported through Astro assets, so production builds emit optimized image paths. The original PNGs and SVG exports remain source evidence. Regenerating charts is an offline operation and must preserve article prose and metadata.

The 4 October audit corrected Figure 3’s titles, axes and descriptions to name the recorded successful-request timer. Jev stops at HTTP return, while Luna also includes JSON parsing, response-file writing and label/cost processing. Client queue and rate-limit waiting are excluded. The saved measurements cannot isolate these local costs or establish controlled inference speed. All recorded values remain unchanged, including the historical Aegis workload described above.

## Decisions comparison

Run `python3 scripts/jev-charts/generate-decisions.py` to regenerate Figure 4 and its four theme/viewport SVG exports. This is a separate offline generator and does not regenerate or change the original three figures or `chart-data.json`.

`decisions-data.json` records full-precision F1, confusion counts, saved nominal 95% grouped-bootstrap intervals, and Decisions probability-coverage counts from the completed `decisions-comparison-results.json`. Source artifact hashes are retained. Its `jev_original` and `luna6` metrics were cross-checked against `results/benchmark.json`. The Chat prompt hash matches `prompts/luna-baseline.txt` and the frozen Decisions manifest’s historical GPT-6 prompt hash. The original GPT-6 benchmark prompt was reused after a later development search chose the same baseline, with zero new benchmark calls.

The chart shows four series across the same 9,155 scored rows. GPT-6 Luna Chat and each Decisions policy used 9,035 distinct API payloads. The series are: selected Jev baseline at 0.54, unchanged GPT-6 Luna Chat baseline, Decisions original, and Decisions policy variant at 0.5. Decisions refusals count as blocks. Coverage denotes the fraction of full scored rows that received a probability and is shown separately for each Decisions variant. No answered-row or matched-subset metric is substituted. No dataset average is computed. Whiskers are the recorded nominal intervals conditional on saved predictions, without multiple-comparison adjustment, and interval overlap is not a paired significance test.

The SVG has a shared zero-based 0–100 F1 scale, directly labeled series/values, color plus texture, and accessible titles/descriptions containing values, interval bounds and coverage. The mobile layout places model labels above marks and keeps coverage visible. The figure uses site fonts/colors and introduces no client chart dependency, interaction, animation or remote data fetch.
