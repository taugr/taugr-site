"""Render recorded aggregate Decisions comparisons offline. Never calls a model."""
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = Path(__file__).with_name('decisions-data.json')
ARTICLE = ROOT / 'src/content/research/evaluating-jev-for-content-moderation.md'
ASSETS = ROOT / 'src/assets/essays/jev-moderation'

CSS = '''
.decisions-chart { display: block; width: 100%; height: auto; color: var(--color-text, #17231f); font-family: var(--font-sans, 'Manrope', sans-serif); }
.decisions-chart--mobile { display: none; max-width: 440px; margin-inline: auto; }
.decisions-chart .heading { fill: currentColor; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; }
.decisions-chart .label { fill: currentColor; }
.decisions-chart .muted { fill: var(--color-text-secondary, #59645f); }
.decisions-chart .number { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-variant-numeric: tabular-nums; }
.decisions-chart .grid { stroke: var(--color-border-light, #dde3df); stroke-width: 0.75; vector-effect: non-scaling-stroke; shape-rendering: crispEdges; }
.decisions-chart .zero { stroke: var(--color-text-tertiary, #69756e); stroke-width: 1; vector-effect: non-scaling-stroke; shape-rendering: crispEdges; }
.decisions-chart .jev { fill: var(--color-accent, #246654); }
.decisions-chart .luna6 { fill: var(--color-text-secondary, #59645f); }
.decisions-chart .decisions-original { fill: var(--color-tag-purple-text, #7056b8); }
.decisions-chart .decisions-policy { fill: var(--color-tag-blue-text, #3372a8); }
.decisions-chart .texture { stroke: var(--color-bg, #f8f8f3); fill: var(--color-bg, #f8f8f3); opacity: 0.65; }
.decisions-chart .interval { stroke: currentColor; stroke-width: 1.25; fill: none; vector-effect: non-scaling-stroke; }
.decisions-chart .interval-halo { stroke: var(--color-bg, #f8f8f3); stroke-width: 3.5; fill: none; vector-effect: non-scaling-stroke; }
.decisions-chart-pair figcaption { margin-top: 1rem; color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.625; }
@media (max-width: 720px) { .decisions-chart-pair .decisions-chart--desktop { display: none; } .decisions-chart-pair .decisions-chart--mobile { display: block; } }
'''.strip()
PALETTES = {
    'light': {'bg': '#f8f8f3', 'text': '#17231f', 'text-secondary': '#59645f', 'text-tertiary': '#69756e', 'border-light': '#dde3df', 'accent': '#246654', 'tag-purple-text': '#7056b8', 'tag-blue-text': '#3372a8'},
    'dark': {'bg': '#111915', 'text': '#f4f3ef', 'text-secondary': '#abb2b9', 'text-tertiary': '#89958e', 'border-light': '#232d35', 'accent': '#79dbc5', 'tag-purple-text': '#b9a9ee', 'tag-blue-text': '#87badf'},
}
CAPTION = ('Figure 4. Unsafe-positive F1 on the same full scored rows, with Decisions refusals blocked. '
           'GPT-6 Luna Chat uses the unchanged Boolean baseline prompt. Jev uses its selected baseline prompt and 0.54 cutoff. '
           'Decisions uses the original and policy-variant prompts at 0.5. Whiskers show recorded nominal 95% grouped-bootstrap '
           'intervals for the saved predictions, without correction for multiple comparisons. These are not equally tuned systems, '
           'and interval overlap is not a paired significance test.')


def text(x, y, value, size=13, cls='label', anchor='start', weight=None):
    extra = f' font-weight="{weight}"' if weight else ''
    return f'<text x="{x}" y="{y}" font-size="{size}" class="{cls}" text-anchor="{anchor}"{extra}>{escape(str(value))}</text>'


def svg(data, mobile=False, theme=None):
    width = 350 if mobile else 780
    height = 1220 if mobile else 1020
    key = f"decisions-f1-{'mobile' if mobile else 'desktop'}" + (f'-{theme}' if theme else '')
    classes = 'decisions-chart' + ((' decisions-chart--mobile' if mobile else ' decisions-chart--desktop') if theme is None else '')
    palette = '' if theme is None else ' style="' + ''.join(f'--color-{k}:{v};' for k, v in PALETTES[theme].items()) + '"'
    names = {m['id']: m for m in data['models']}
    descriptions = []
    for ds in data['datasets']:
        descriptions.append(f'{ds["label"]}, {ds["rows"]:,} scored rows: ' + ', '.join(
            f'{names[s["model"]]["label"]} {s["display"]}, nominal 95% interval {s["interval_95"][0]:.2f} to {s["interval_95"][1]:.2f}' for s in ds['series']) + '.')
        descriptions.append('Decisions probability coverage: ' + ', '.join(
            f'{policy} {coverage["display"]}, {coverage["answered_rows"]:,} of {coverage["total_rows"]:,} rows' for policy, coverage in ds['decisions_probability_coverage'].items()) + '.')
    desc = ' '.join(descriptions) + ' ' + CAPTION
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" class="{classes}" viewBox="0 0 {width} {height}" width="{width}" height="{height}" role="img" aria-labelledby="{key}-title {key}-desc"{palette}>',
             f'<title id="{key}-title">{escape(data["title"])}</title>', f'<desc id="{key}-desc">{escape(desc)}</desc>',
             '<style>' + CSS + '</style>', '<defs>',
             f'<pattern id="{key}-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>',
             f'<pattern id="{key}-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>',
             f'<pattern id="{key}-cross" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0L8 8 M8 0L0 8" class="texture" stroke-width="1" fill="none" /></pattern>', '</defs>',
             text(0, 14, 'Figure 4', 12.5, 'muted number')]
    if mobile:
        parts += [text(0, 46, 'Decisions, Jev and', 23, 'heading'), text(0, 74, 'baseline Luna', 23, 'heading'),
                  text(0, 104, 'Full-row F1 · higher is better', 13, 'muted'),
                  text(0, 125, 'Decisions refusals counted as blocks', 13, 'muted'),
                  text(0, 146, 'Nominal 95% intervals · unequal tuning', 12.5, 'muted')]
    else:
        parts += [text(0, 50, data['title'], 29, 'heading'),
                  text(0, 80, 'Full-row F1 · higher is better · Decisions refusals counted as blocks', 14, 'muted'),
                  text(0, 104, 'Recorded nominal 95% sampling intervals · unequal tuning', 13, 'muted')]
    start = 0 if mobile else 188
    plot_width = 350 if mobile else 500
    x = lambda value: start + plot_width * value / 100
    for i, ds in enumerate(data['datasets']):
        y = (166 if mobile else 143) + i * (260 if mobile else 216)
        parts += [text(0, y, ds['label'], 17 if mobile else 18, weight='600'),
                  text(width, y, f'{ds["rows"]:,} rows', 12.5, 'muted number', 'end')]
        for j, series in enumerate(ds['series']):
            by = y + (37 + j * 40 if mobile else 22 + j * 32)
            bh = 10 if mobile else 16
            ly = by - 6 if mobile else by + 12
            model = names[series['model']]
            parts += [text(0 if mobile else start - 14, ly, model['label'], 13, anchor='start' if mobile else 'end'),
                      text(width if mobile else 773, ly, series['display'], 13, 'label number', 'end', '600' if j == 0 else None)]
            for tick in [0, 50, 100]:
                parts.append(f'<line x1="{x(tick):.4f}" y1="{by - 2}" x2="{x(tick):.4f}" y2="{by + bh + 2}" class="{"zero" if tick == 0 else "grid"}" />')
            metadata = f'data-dataset="{ds["id"]}" data-model="{series["model"]}" data-value="{series["value"]}" data-label="{series["display"]}"'
            parts.append(f'<rect x="{start}" y="{by}" width="{plot_width * series["value"] / 100:.4f}" height="{bh}" class="{model["class"]}" {metadata} />')
            if j:
                pattern = {1: 'dot', 2: 'stripe', 3: 'cross'}[j]
                parts.append(f'<rect x="{start}" y="{by}" width="{plot_width * series["value"] / 100:.4f}" height="{bh}" fill="url(#{key}-{pattern})" aria-hidden="true" />')
            lo, hi = series['interval_95']
            cy = by + bh / 2
            shape = f'M{x(lo):.4f} {cy - 4}V{cy + 4} M{x(lo):.4f} {cy}H{x(hi):.4f} M{x(hi):.4f} {cy - 4}V{cy + 4}'
            parts += [f'<path d="{shape}" class="interval-halo" aria-hidden="true" />',
                      f'<path d="{shape}" class="interval" data-interval-dataset="{ds["id"]}" data-interval-model="{series["model"]}" data-lower="{lo}" data-upper="{hi}" aria-hidden="true" />']
        tick_y = y + (193 if mobile else 151)
        for tick in [0, 50, 100]:
            anchor = ('start' if tick == 0 else 'end' if tick == 100 else 'middle') if mobile else 'middle'
            parts.append(text(round(x(tick), 4), tick_y, tick, 12.5, 'muted number', anchor))
        coverage = ds['decisions_probability_coverage']
        if mobile:
            parts += [text(0, y + 217, f'Probability coverage · original {coverage["original"]["display"]}', 12.5, 'muted'),
                      text(0, y + 237, f'policy variant {coverage["policy"]["display"]}', 12.5, 'muted')]
        else:
            parts.append(text(0, y + 183, f'Decisions probability coverage: original {coverage["original"]["display"]} · policy variant {coverage["policy"]["display"]}', 13, 'muted'))
    parts += [text(width / 2, height - 14, 'Unsafe-positive F1 (%)', 13, 'muted', 'middle'), '</svg>']
    return '\n'.join(parts)


def main():
    data = json.loads(DATA.read_text())
    inline = '\n'.join(['<!-- jev-chart:decisions-f1:start -->',
                        '<figure class="jev-chart-pair decisions-chart-pair" data-chart="decisions-f1" aria-describedby="decisions-f1-caption">',
                        svg(data), svg(data, mobile=True),
                        '<figcaption id="decisions-f1-caption">' + escape(CAPTION) + '</figcaption>', '</figure>',
                        '<!-- jev-chart:decisions-f1:end -->'])
    article = ARTICLE.read_text()
    pattern = r'<!-- jev-chart:decisions-f1:start -->[\s\S]*?<!-- jev-chart:decisions-f1:end -->'
    if re.search(pattern, article):
        article, count = re.subn(pattern, lambda _: inline, article)
        assert count == 1
    else:
        anchor = '_F1 on a 0–100 scale. Decisions scores include blocking requests when the endpoint refused to classify them._'
        assert article.count(anchor) == 1
        article = article.replace(anchor, anchor + '\n\n' + inline)
    ARTICLE.write_text(article)
    for mobile in [False, True]:
        for theme in ['light', 'dark']:
            name = f'jev-moderation-decisions-f1-{theme}{"-mobile" if mobile else ""}.svg'
            (ASSETS / name).write_text(svg(data, mobile, theme) + '\n')
    print('Generated one responsive four-series Decisions F1 chart and four SVG exports. No inference.')


if __name__ == '__main__':
    main()
