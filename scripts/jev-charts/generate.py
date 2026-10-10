"""Regenerate the unpublished essay's theme-aware SVG charts. No inference."""
import hashlib
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = Path(__file__).with_name('chart-data.json')
ASSETS = ROOT / 'src/assets/essays/jev-moderation'
ARTICLE = ROOT / 'src/content/research/evaluating-jev-for-content-moderation.md'

CSS = '''
.jev-chart-pair { margin: 2rem 0 1.5rem; padding-top: 1.2rem; border-top: 1px solid var(--color-border, #cbd3ce); }
.jev-chart { display: block; width: 100%; height: auto; overflow: visible; color: var(--color-text, #17231f); font-family: var(--font-sans, 'Manrope', sans-serif); }
.jev-chart--mobile { display: none; max-width: 440px; margin-inline: auto; }
.jev-chart .heading { fill: currentColor; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; letter-spacing: -0.4px; }
.jev-chart .label { fill: currentColor; }
.jev-chart .muted { fill: var(--color-text-secondary, #59645f); }
.jev-chart .number { font-family: var(--font-mono, 'IBM Plex Mono', monospace); font-variant-numeric: tabular-nums; }
.jev-chart .grid { stroke: var(--color-border-light, #dde3df); stroke-width: 0.75; vector-effect: non-scaling-stroke; shape-rendering: crispEdges; }
.jev-chart .zero { stroke: var(--color-text-tertiary, #69756e); stroke-width: 1; vector-effect: non-scaling-stroke; shape-rendering: crispEdges; }
.jev-chart .jev { fill: var(--color-accent, #246654); }
.jev-chart .luna56 { fill: var(--color-tag-purple-text, #7056b8); }
.jev-chart .luna6 { fill: var(--color-text-secondary, #59645f); }
.jev-chart .texture { stroke: var(--color-bg, #f8f8f3); fill: var(--color-bg, #f8f8f3); opacity: 0.6; }
@media (max-width: 720px) { .jev-chart-pair .jev-chart--desktop { display: none; } .jev-chart-pair .jev-chart--mobile { display: block; } }
'''.strip()

PALETTES = {
    'light': {'bg': '#f8f8f3', 'text': '#17231f', 'text-secondary': '#59645f',
              'text-tertiary': '#69756e', 'border-light': '#dde3df',
              'accent': '#246654', 'tag-purple-text': '#7056b8'},
    'dark': {'bg': '#111915', 'text': '#f4f3ef', 'text-secondary': '#abb2b9',
             'text-tertiary': '#89958e', 'border-light': '#232d35',
             'accent': '#79dbc5', 'tag-purple-text': '#b9a9ee'},
}


def text(x, y, content, size=13, cls='label', anchor='start', weight=None):
    extra = f' font-weight="{weight}"' if weight else ''
    return f'<text x="{x}" y="{y}" font-size="{size}" class="{cls}" text-anchor="{anchor}"{extra}>{escape(str(content))}</text>'


def tick_label(chart, v):
    if chart['id'] == 'f1':
        return f'{v}%'
    if chart['id'] == 'cost':
        return f'${v:.2f}'
    return str(v)


def svg(chart, mobile=False, theme=None):
    width = 350 if mobile else 780
    height = 946 if mobile else 858
    key = f"jev-{chart['id']}-{'mobile' if mobile else 'desktop'}"
    classes = 'jev-chart' + ((' jev-chart--mobile' if mobile else ' jev-chart--desktop') if theme is None else '')
    palette = '' if theme is None else ' style="' + ''.join(f'--color-{k}:{v};' for k, v in PALETTES[theme].items()) + '"'
    desc = ' '.join(ds['label'] + ': ' + ', '.join(s['label'] + ' ' + s['display'] for s in ds['series']) + '.' for ds in chart['datasets'])
    if chart['id'] == 'f1':
        desc += ' Observed F1 point estimates. Aegis versus GPT-5.6 and XSTest versus GPT-6 were inconclusive in the sampling checks.'
    elif chart['id'] == 'cost':
        desc += ' Historical estimates. Aegis covers 1,915 Jev requests and 1,910 requests for each Luna run.'
    else:
        desc += ' Recorded successful-request times from separate runs with different network and service conditions. Jev stops at HTTP return. Luna includes JSON parsing, response-file writing and label/cost processing. Client queue and rate-limit waiting are excluded. No timing uncertainty intervals were saved.'
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" class="{classes}" viewBox="0 0 {width} {height}" width="{width}" height="{height}" role="img" aria-labelledby="{key}-title {key}-desc"{palette}>',
         f'<title id="{key}-title">{escape(chart["title"])}</title>',
         f'<desc id="{key}-desc">{escape(desc)}</desc>',
         '<style>' + CSS + '</style>',
         '<defs>',
         f'<pattern id="{key}-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>',
         f'<pattern id="{key}-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>',
         '</defs>', text(0, 14, f'Figure {chart["figure"]}', 12.5 if mobile else 12, 'muted number')]
    if mobile:
        p += [text(0, 46 + i * 27, line, 23, 'heading') for i, line in enumerate(chart['title_lines'])]
        p += [text(0, 100 + i * 19, line, 12.5, 'muted') for i, line in enumerate(chart['subtitle_lines'])]
        p.append(text(0, 146, chart['policy_label'], 12.5, 'muted'))
    else:
        p += [text(0, 52, chart['title'], 29, 'heading'),
              text(0, 83, chart['subtitle'], 14, 'muted'),
              text(0, 107, chart['policy_label'], 14, 'muted')]
    domain = chart['domain'][1]
    start = 0 if mobile else 146
    plot_width = 350 if mobile else 548
    for index, ds in enumerate(chart['datasets']):
        y = (191 if mobile else 158) + index * (180 if mobile else 165)
        p.append(text(0, y, ds['label'], 17 if mobile else 18, weight='600'))
        if chart['id'] == 'f1':
            p.append(text(width, y, f'{ds["rows"]:,} rows', 12.5 if mobile else 12, 'muted number', 'end'))
        top = y + 18
        bottom = top + (118 if mobile else 96)
        for tick in chart['ticks']:
            x = start + plot_width * tick / domain
            segments = [(top + j * 39 + 21, top + j * 39 + 31) for j in range(3)] if mobile else [(top, bottom)]
            for y1, y2 in segments:
                p.append(f'<line x1="{x:.4f}" y1="{y1}" x2="{x:.4f}" y2="{y2}" class="{"zero" if tick == 0 else "grid"}" />')
            anchor = ('start' if tick == 0 else 'end' if tick == domain else 'middle') if mobile else 'middle'
            p.append(text(round(x, 4), bottom + 16, tick_label(chart, tick), 12.5 if mobile else 12, 'muted number', anchor))
        for j, series in enumerate(ds['series']):
            bar_y = top + (j * 39 + 21 if mobile else j * 32 + 5)
            bar_h = 10 if mobile else 17
            label_y = bar_y - 5 if mobile else bar_y + 13
            bar_w = plot_width * series['value'] / domain
            p.append(text(0 if mobile else start - 14, label_y, series['label'], 13 if mobile else 14, anchor='start' if mobile else 'end'))
            p.append(text(width if mobile else round(start + bar_w + 9, 4), label_y, series['display'], 13 if mobile else 14, 'label number', 'end' if mobile else 'start', '600' if j == 0 else None))
            cls = ['jev', 'luna56', 'luna6'][j]
            metadata = f'data-dataset="{ds["id"]}" data-model="{series["model"]}" data-value="{series["value"]}" data-label="{series["display"]}"'
            p.append(f'<rect x="{start}" y="{bar_y}" width="{bar_w:.4f}" height="{bar_h}" class="{cls}" {metadata} />')
            if j:
                texture = 'stripe' if j == 1 else 'dot'
                p.append(f'<rect x="{start}" y="{bar_y}" width="{bar_w:.4f}" height="{bar_h}" fill="url(#{key}-{texture})" aria-hidden="true" />')
    p.append(text(width / 2, height - 15, chart['axis'], 12.5 if mobile else 13, 'muted', 'middle'))
    p.append('</svg>')
    return '\n'.join(p)


def main():
    data = json.loads(DATA_PATH.read_text())
    article = ARTICLE.read_text()
    ASSETS.mkdir(parents=True, exist_ok=True)
    for chart in data['charts']:
        cid = chart['id']
        inline = '\n'.join([f'<!-- jev-chart:{cid}:start -->',
                            f'<figure class="jev-chart-pair" data-chart="{cid}">',
                            svg(chart), svg(chart, mobile=True), '</figure>',
                            f'<!-- jev-chart:{cid}:end -->'])
        pattern = rf'<!-- jev-chart:{cid}:start -->[\s\S]*?<!-- jev-chart:{cid}:end -->|<img\b[^>]*jev-moderation-{cid}\.png[^>]*>'
        article, n = re.subn(pattern, lambda _: inline, article)
        if n != 1:
            raise ValueError(f'Expected exactly one {cid} embed, found {n}')
        for theme in PALETTES:
            for mobile in (False, True):
                suffix = '-mobile' if mobile else ''
                (ASSETS / f'jev-moderation-{cid}-{theme}{suffix}.svg').write_text(svg(chart, mobile, theme) + '\n')
    ARTICLE.write_text(article)
    print('Generated 3 inline theme-aware charts, 12 reusable SVG exports. No data changed.')
    print('Data SHA-256:', hashlib.sha256(DATA_PATH.read_bytes()).hexdigest())


if __name__ == '__main__':
    main()
