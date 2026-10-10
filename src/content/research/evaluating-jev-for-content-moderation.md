---
title: 'Evaluating Jev for content moderation'
description: 'A comparison of Jev, GPT-5.6 Luna and GPT-6 Luna on four moderation datasets, including prompt trade-offs, historical cost and recorded request time.'
date: 2026-10-10
tags: ['AI', 'content moderation', 'research']
draft: false
editorial: true
authorshipNoteTitle: 'How this article was made'
authorshipNote: 'The research and article were produced by AI, then reviewed and audited by Tom. The aim is to share useful research so that others can build on the findings. AI’s role is disclosed in articles and research, while personal reflections are written by Tom in his own words.'
image: '../../assets/essays/jev-moderation/jev-moderation-hero.png'
imageAlt: 'Forest-green ink and ochre flecks flow through three fine, curved mesh filters on textured ivory paper.'
---

A moderation check has two jobs: catch harmful requests and let harmless ones through. Blocking an ordinary question about a sensitive subject is a mistake too. Can Jev handle that decision well enough to be useful, and do it faster and cheaper?

The original tests compared **Jev 1.13.0, GPT-5.6 Luna and GPT-6 Luna** on four public datasets. Jev using the baseline prompt had the highest observed F1 on all four, although some differences were too uncertain to call. A later initial comparison with GPT-6 Luna through OpenAI Decisions also favoured Jev in this setup, with important differences in tuning and refusal handling.

## What the datasets test

- [ToxicChat](https://huggingface.co/datasets/lmsys/toxic-chat) contains real chatbot requests labelled for toxicity, testing the messy language people actually use.

- [XSTest](https://github.com/paul-rottger/xstest) pairs harmless prompts that can look unsafe with genuinely unsafe ones, testing whether a model overreacts to wording.

- [Aegis 2](https://aclanthology.org/2025.naacl-long.306/) is NVIDIA’s content-safety dataset, covering a broad range of safety risks under a detailed labelling policy.

- [WildGuardTest](https://huggingface.co/datasets/allenai/wildguardmix) includes ordinary and deliberately adversarial requests, testing harmful intent as well as misleading framing.

These aren’t interchangeable definitions of safety. An abusive message and a politely worded request for harmful help pose different problems.

## How the models were tested

Each model classified message text as safe or unsafe, checked against dataset labels. The original tests didn’t assess generated answers or refusal behaviour. After exclusions, each Luna comparison scored **9,155 rows from 9,035 distinct API payloads**. Exact duplicate payloads reused predictions while every eligible row kept its scoring weight. The later Decisions comparison and its classification refusals are discussed separately below.

Selected development and test inputs were separated by Unicode, case and whitespace-normalised exact text. A later similarity audit found **18 ToxicChat test rows, eight toxic**, near development inputs. Excluding them in a post-test sensitivity check preserved the main conclusions. This doesn’t establish full semantic independence.

Jev returned a safety score, converted to a decision using a **0.54 cutoff**. Here, [**Jev baseline prompt**](https://github.com/taugr/jev-moderation-eval/blob/db72034021594048f40d109efe46c5574a53c9fe/prompts/jev-transfer.json#L2-L9) and [**Jev content-focused prompt**](https://github.com/taugr/jev-moderation-eval/blob/db72034021594048f40d109efe46c5574a53c9fe/prompts/jev-transfer.json#L10-L17) distinguish two prompts for the same **Jev 1.13.0** model, with the same cutoff.

The baseline prompt focuses on whether the message asks for harmful assistance. The content-focused prompt additionally considers harmful content in the message itself. This broadens the decision beyond the help requested, so the choice of prompt can change what the moderation check catches.

I chose the baseline prompt and cutoff using **200 WildGuard training examples**, then checked them on an independent **200-example sample** before the held-out tests. Both Luna models used the same safety criteria in a strict Boolean JSON prompt, returning true or false with reasoning disabled.

Both Jev prompts were frozen before the **1,923-row Aegis test** and used the **0.54 cutoff** without further tuning.

A **false positive** is a harmless message wrongly flagged. A **false negative** is a harmful message missed. **F1** balances how often flagged messages really are unsafe with how many unsafe messages the model catches. It isn’t overall accuracy.

## What the results show

| Dataset       | Test rows | Jev baseline prompt | GPT-5.6 Luna | GPT-6 Luna |
| ------------- | --------: | ------------------: | -----------: | ---------: |
| ToxicChat     |     5,083 |               75.40 |        66.86 |      63.68 |
| XSTest        |       450 |               93.40 |        88.27 |      91.46 |
| Aegis 2       |     1,923 |               80.27 |        79.12 |      77.58 |
| WildGuardTest |     1,699 |               88.30 |        83.54 |      85.17 |

_F1 for unsafe or toxic messages, on a 0–100 scale. Higher is better. The Jev column uses the baseline prompt throughout._

Sensitivity checks used **2,000 paired bootstrap resamples of normalised-message groups**. The Aegis comparison with GPT-5.6 and XSTest with GPT-6 were inconclusive. The other paired differences favoured Jev. These nominal intervals describe sampling uncertainty conditional on cached predictions. They weren’t adjusted for multiple comparisons and don’t capture prompt selection, repeated model runs or all shared-template dependence.

<blockquote class="pull-quote">
  <p><em>“Jev using the baseline prompt had the highest observed F1 on all four, although some differences were too uncertain to call.”</em></p>
</blockquote>

<!-- jev-chart:f1:start -->
<figure class="jev-chart-pair" data-chart="f1">
<svg xmlns="http://www.w3.org/2000/svg" class="jev-chart jev-chart--desktop" viewBox="0 0 780 858" width="780" height="858" role="img" aria-labelledby="jev-f1-desktop-title jev-f1-desktop-desc">
<title id="jev-f1-desktop-title">F1 across four moderation benchmarks</title>
<desc id="jev-f1-desktop-desc">ToxicChat: Jev 75.40%, GPT-5.6 Luna 66.86%, GPT-6 Luna 63.68%. XSTest: Jev 93.40%, GPT-5.6 Luna 88.27%, GPT-6 Luna 91.46%. Aegis 2: Jev 80.27%, GPT-5.6 Luna 79.12%, GPT-6 Luna 77.58%. WildGuardTest: Jev 88.30%, GPT-5.6 Luna 83.54%, GPT-6 Luna 85.17%. Observed F1 point estimates. Aegis versus GPT-5.6 and XSTest versus GPT-6 were inconclusive in the sampling checks.</desc>
<style>.jev-chart-pair { margin: 2rem 0 1.5rem; padding-top: 1.2rem; border-top: 1px solid var(--color-border, #cbd3ce); }
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
@media (max-width: 720px) { .jev-chart-pair .jev-chart--desktop { display: none; } .jev-chart-pair .jev-chart--mobile { display: block; } }</style>
<defs>
<pattern id="jev-f1-desktop-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>
<pattern id="jev-f1-desktop-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>
</defs>
<text x="0" y="14" font-size="12" class="muted number" text-anchor="start">Figure 1</text>
<text x="0" y="52" font-size="29" class="heading" text-anchor="start">F1 across four moderation benchmarks</text>
<text x="0" y="83" font-size="14" class="muted" text-anchor="start">F1 on labelled test rows · higher is better</text>
<text x="0" y="107" font-size="14" class="muted" text-anchor="start">Jev uses the original policy</text>
<text x="0" y="158" font-size="18" class="label" text-anchor="start" font-weight="600">ToxicChat</text>
<text x="780" y="158" font-size="12" class="muted number" text-anchor="end">5,083 rows</text>
<line x1="146.0000" y1="176" x2="146.0000" y2="272" class="zero" />
<text x="146.0" y="288" font-size="12" class="muted number" text-anchor="middle">0%</text>
<line x1="420.0000" y1="176" x2="420.0000" y2="272" class="grid" />
<text x="420.0" y="288" font-size="12" class="muted number" text-anchor="middle">50%</text>
<line x1="694.0000" y1="176" x2="694.0000" y2="272" class="grid" />
<text x="694.0" y="288" font-size="12" class="muted number" text-anchor="middle">100%</text>
<text x="132" y="194" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="568.1936" y="194" font-size="14" class="label number" text-anchor="start" font-weight="600">75.40%</text>
<rect x="146" y="181" width="413.1936" height="17" class="jev" data-dataset="toxicchat" data-model="jev_original" data-value="75.40029112081513" data-label="75.40%" />
<text x="132" y="226" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="521.4142" y="226" font-size="14" class="label number" text-anchor="start">66.86%</text>
<rect x="146" y="213" width="366.4142" height="17" class="luna56" data-dataset="toxicchat" data-model="luna56" data-value="66.86390532544378" data-label="66.86%" />
<rect x="146" y="213" width="366.4142" height="17" fill="url(#jev-f1-desktop-stripe)" aria-hidden="true" />
<text x="132" y="258" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="503.9583" y="258" font-size="14" class="label number" text-anchor="start">63.68%</text>
<rect x="146" y="245" width="348.9583" height="17" class="luna6" data-dataset="toxicchat" data-model="luna6" data-value="63.67851622874807" data-label="63.68%" />
<rect x="146" y="245" width="348.9583" height="17" fill="url(#jev-f1-desktop-dot)" aria-hidden="true" />
<text x="0" y="323" font-size="18" class="label" text-anchor="start" font-weight="600">XSTest</text>
<text x="780" y="323" font-size="12" class="muted number" text-anchor="end">450 rows</text>
<line x1="146.0000" y1="341" x2="146.0000" y2="437" class="zero" />
<text x="146.0" y="453" font-size="12" class="muted number" text-anchor="middle">0%</text>
<line x1="420.0000" y1="341" x2="420.0000" y2="437" class="grid" />
<text x="420.0" y="453" font-size="12" class="muted number" text-anchor="middle">50%</text>
<line x1="694.0000" y1="341" x2="694.0000" y2="437" class="grid" />
<text x="694.0" y="453" font-size="12" class="muted number" text-anchor="middle">100%</text>
<text x="132" y="359" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="666.8376" y="359" font-size="14" class="label number" text-anchor="start" font-weight="600">93.40%</text>
<rect x="146" y="346" width="511.8376" height="17" class="jev" data-dataset="xstest" data-model="jev_original" data-value="93.4010152284264" data-label="93.40%" />
<text x="132" y="391" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="638.6939" y="391" font-size="14" class="label number" text-anchor="start">88.27%</text>
<rect x="146" y="378" width="483.6939" height="17" class="luna56" data-dataset="xstest" data-model="luna56" data-value="88.26530612244898" data-label="88.27%" />
<rect x="146" y="378" width="483.6939" height="17" fill="url(#jev-f1-desktop-stripe)" aria-hidden="true" />
<text x="132" y="423" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="656.1859" y="423" font-size="14" class="label number" text-anchor="start">91.46%</text>
<rect x="146" y="410" width="501.1859" height="17" class="luna6" data-dataset="xstest" data-model="luna6" data-value="91.4572864321608" data-label="91.46%" />
<rect x="146" y="410" width="501.1859" height="17" fill="url(#jev-f1-desktop-dot)" aria-hidden="true" />
<text x="0" y="488" font-size="18" class="label" text-anchor="start" font-weight="600">Aegis 2</text>
<text x="780" y="488" font-size="12" class="muted number" text-anchor="end">1,923 rows</text>
<line x1="146.0000" y1="506" x2="146.0000" y2="602" class="zero" />
<text x="146.0" y="618" font-size="12" class="muted number" text-anchor="middle">0%</text>
<line x1="420.0000" y1="506" x2="420.0000" y2="602" class="grid" />
<text x="420.0" y="618" font-size="12" class="muted number" text-anchor="middle">50%</text>
<line x1="694.0000" y1="506" x2="694.0000" y2="602" class="grid" />
<text x="694.0" y="618" font-size="12" class="muted number" text-anchor="middle">100%</text>
<text x="132" y="524" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="594.8951" y="524" font-size="14" class="label number" text-anchor="start" font-weight="600">80.27%</text>
<rect x="146" y="511" width="439.8951" height="17" class="jev" data-dataset="aegis" data-model="jev_original" data-value="80.27282266526757" data-label="80.27%" />
<text x="132" y="556" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="588.5889" y="556" font-size="14" class="label number" text-anchor="start">79.12%</text>
<rect x="146" y="543" width="433.5889" height="17" class="luna56" data-dataset="aegis" data-model="luna56" data-value="79.1220556745182" data-label="79.12%" />
<rect x="146" y="543" width="433.5889" height="17" fill="url(#jev-f1-desktop-stripe)" aria-hidden="true" />
<text x="132" y="588" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="580.1621" y="588" font-size="14" class="label number" text-anchor="start">77.58%</text>
<rect x="146" y="575" width="425.1621" height="17" class="luna6" data-dataset="aegis" data-model="luna6" data-value="77.58433079434167" data-label="77.58%" />
<rect x="146" y="575" width="425.1621" height="17" fill="url(#jev-f1-desktop-dot)" aria-hidden="true" />
<text x="0" y="653" font-size="18" class="label" text-anchor="start" font-weight="600">WildGuardTest</text>
<text x="780" y="653" font-size="12" class="muted number" text-anchor="end">1,699 rows</text>
<line x1="146.0000" y1="671" x2="146.0000" y2="767" class="zero" />
<text x="146.0" y="783" font-size="12" class="muted number" text-anchor="middle">0%</text>
<line x1="420.0000" y1="671" x2="420.0000" y2="767" class="grid" />
<text x="420.0" y="783" font-size="12" class="muted number" text-anchor="middle">50%</text>
<line x1="694.0000" y1="671" x2="694.0000" y2="767" class="grid" />
<text x="694.0" y="783" font-size="12" class="muted number" text-anchor="middle">100%</text>
<text x="132" y="689" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="638.9087" y="689" font-size="14" class="label number" text-anchor="start" font-weight="600">88.30%</text>
<rect x="146" y="676" width="483.9087" height="17" class="jev" data-dataset="wildguard" data-model="jev_original" data-value="88.30449826989619" data-label="88.30%" />
<text x="132" y="721" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="612.7926" y="721" font-size="14" class="label number" text-anchor="start">83.54%</text>
<rect x="146" y="708" width="457.7926" height="17" class="luna56" data-dataset="wildguard" data-model="luna56" data-value="83.53879622915156" data-label="83.54%" />
<rect x="146" y="708" width="457.7926" height="17" fill="url(#jev-f1-desktop-stripe)" aria-hidden="true" />
<text x="132" y="753" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="621.714" y="753" font-size="14" class="label number" text-anchor="start">85.17%</text>
<rect x="146" y="740" width="466.7140" height="17" class="luna6" data-dataset="wildguard" data-model="luna6" data-value="85.16678495386799" data-label="85.17%" />
<rect x="146" y="740" width="466.7140" height="17" fill="url(#jev-f1-desktop-dot)" aria-hidden="true" />
<text x="390.0" y="843" font-size="13" class="muted" text-anchor="middle">F1 (%)</text>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="jev-chart jev-chart--mobile" viewBox="0 0 350 946" width="350" height="946" role="img" aria-labelledby="jev-f1-mobile-title jev-f1-mobile-desc">
<title id="jev-f1-mobile-title">F1 across four moderation benchmarks</title>
<desc id="jev-f1-mobile-desc">ToxicChat: Jev 75.40%, GPT-5.6 Luna 66.86%, GPT-6 Luna 63.68%. XSTest: Jev 93.40%, GPT-5.6 Luna 88.27%, GPT-6 Luna 91.46%. Aegis 2: Jev 80.27%, GPT-5.6 Luna 79.12%, GPT-6 Luna 77.58%. WildGuardTest: Jev 88.30%, GPT-5.6 Luna 83.54%, GPT-6 Luna 85.17%. Observed F1 point estimates. Aegis versus GPT-5.6 and XSTest versus GPT-6 were inconclusive in the sampling checks.</desc>
<style>.jev-chart-pair { margin: 2rem 0 1.5rem; padding-top: 1.2rem; border-top: 1px solid var(--color-border, #cbd3ce); }
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
@media (max-width: 720px) { .jev-chart-pair .jev-chart--desktop { display: none; } .jev-chart-pair .jev-chart--mobile { display: block; } }</style>
<defs>
<pattern id="jev-f1-mobile-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>
<pattern id="jev-f1-mobile-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>
</defs>
<text x="0" y="14" font-size="12.5" class="muted number" text-anchor="start">Figure 1</text>
<text x="0" y="46" font-size="23" class="heading" text-anchor="start">F1 across four</text>
<text x="0" y="73" font-size="23" class="heading" text-anchor="start">moderation benchmarks</text>
<text x="0" y="100" font-size="12.5" class="muted" text-anchor="start">F1 on labelled test rows ·</text>
<text x="0" y="119" font-size="12.5" class="muted" text-anchor="start">higher is better</text>
<text x="0" y="146" font-size="12.5" class="muted" text-anchor="start">Jev uses the original policy</text>
<text x="0" y="191" font-size="17" class="label" text-anchor="start" font-weight="600">ToxicChat</text>
<text x="350" y="191" font-size="12.5" class="muted number" text-anchor="end">5,083 rows</text>
<line x1="0.0000" y1="230" x2="0.0000" y2="240" class="zero" />
<line x1="0.0000" y1="269" x2="0.0000" y2="279" class="zero" />
<line x1="0.0000" y1="308" x2="0.0000" y2="318" class="zero" />
<text x="0.0" y="343" font-size="12.5" class="muted number" text-anchor="start">0%</text>
<line x1="175.0000" y1="230" x2="175.0000" y2="240" class="grid" />
<line x1="175.0000" y1="269" x2="175.0000" y2="279" class="grid" />
<line x1="175.0000" y1="308" x2="175.0000" y2="318" class="grid" />
<text x="175.0" y="343" font-size="12.5" class="muted number" text-anchor="middle">50%</text>
<line x1="350.0000" y1="230" x2="350.0000" y2="240" class="grid" />
<line x1="350.0000" y1="269" x2="350.0000" y2="279" class="grid" />
<line x1="350.0000" y1="308" x2="350.0000" y2="318" class="grid" />
<text x="350.0" y="343" font-size="12.5" class="muted number" text-anchor="end">100%</text>
<text x="0" y="225" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="225" font-size="13" class="label number" text-anchor="end" font-weight="600">75.40%</text>
<rect x="0" y="230" width="263.9010" height="10" class="jev" data-dataset="toxicchat" data-model="jev_original" data-value="75.40029112081513" data-label="75.40%" />
<text x="0" y="264" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="264" font-size="13" class="label number" text-anchor="end">66.86%</text>
<rect x="0" y="269" width="234.0237" height="10" class="luna56" data-dataset="toxicchat" data-model="luna56" data-value="66.86390532544378" data-label="66.86%" />
<rect x="0" y="269" width="234.0237" height="10" fill="url(#jev-f1-mobile-stripe)" aria-hidden="true" />
<text x="0" y="303" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="303" font-size="13" class="label number" text-anchor="end">63.68%</text>
<rect x="0" y="308" width="222.8748" height="10" class="luna6" data-dataset="toxicchat" data-model="luna6" data-value="63.67851622874807" data-label="63.68%" />
<rect x="0" y="308" width="222.8748" height="10" fill="url(#jev-f1-mobile-dot)" aria-hidden="true" />
<text x="0" y="371" font-size="17" class="label" text-anchor="start" font-weight="600">XSTest</text>
<text x="350" y="371" font-size="12.5" class="muted number" text-anchor="end">450 rows</text>
<line x1="0.0000" y1="410" x2="0.0000" y2="420" class="zero" />
<line x1="0.0000" y1="449" x2="0.0000" y2="459" class="zero" />
<line x1="0.0000" y1="488" x2="0.0000" y2="498" class="zero" />
<text x="0.0" y="523" font-size="12.5" class="muted number" text-anchor="start">0%</text>
<line x1="175.0000" y1="410" x2="175.0000" y2="420" class="grid" />
<line x1="175.0000" y1="449" x2="175.0000" y2="459" class="grid" />
<line x1="175.0000" y1="488" x2="175.0000" y2="498" class="grid" />
<text x="175.0" y="523" font-size="12.5" class="muted number" text-anchor="middle">50%</text>
<line x1="350.0000" y1="410" x2="350.0000" y2="420" class="grid" />
<line x1="350.0000" y1="449" x2="350.0000" y2="459" class="grid" />
<line x1="350.0000" y1="488" x2="350.0000" y2="498" class="grid" />
<text x="350.0" y="523" font-size="12.5" class="muted number" text-anchor="end">100%</text>
<text x="0" y="405" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="405" font-size="13" class="label number" text-anchor="end" font-weight="600">93.40%</text>
<rect x="0" y="410" width="326.9036" height="10" class="jev" data-dataset="xstest" data-model="jev_original" data-value="93.4010152284264" data-label="93.40%" />
<text x="0" y="444" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="444" font-size="13" class="label number" text-anchor="end">88.27%</text>
<rect x="0" y="449" width="308.9286" height="10" class="luna56" data-dataset="xstest" data-model="luna56" data-value="88.26530612244898" data-label="88.27%" />
<rect x="0" y="449" width="308.9286" height="10" fill="url(#jev-f1-mobile-stripe)" aria-hidden="true" />
<text x="0" y="483" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="483" font-size="13" class="label number" text-anchor="end">91.46%</text>
<rect x="0" y="488" width="320.1005" height="10" class="luna6" data-dataset="xstest" data-model="luna6" data-value="91.4572864321608" data-label="91.46%" />
<rect x="0" y="488" width="320.1005" height="10" fill="url(#jev-f1-mobile-dot)" aria-hidden="true" />
<text x="0" y="551" font-size="17" class="label" text-anchor="start" font-weight="600">Aegis 2</text>
<text x="350" y="551" font-size="12.5" class="muted number" text-anchor="end">1,923 rows</text>
<line x1="0.0000" y1="590" x2="0.0000" y2="600" class="zero" />
<line x1="0.0000" y1="629" x2="0.0000" y2="639" class="zero" />
<line x1="0.0000" y1="668" x2="0.0000" y2="678" class="zero" />
<text x="0.0" y="703" font-size="12.5" class="muted number" text-anchor="start">0%</text>
<line x1="175.0000" y1="590" x2="175.0000" y2="600" class="grid" />
<line x1="175.0000" y1="629" x2="175.0000" y2="639" class="grid" />
<line x1="175.0000" y1="668" x2="175.0000" y2="678" class="grid" />
<text x="175.0" y="703" font-size="12.5" class="muted number" text-anchor="middle">50%</text>
<line x1="350.0000" y1="590" x2="350.0000" y2="600" class="grid" />
<line x1="350.0000" y1="629" x2="350.0000" y2="639" class="grid" />
<line x1="350.0000" y1="668" x2="350.0000" y2="678" class="grid" />
<text x="350.0" y="703" font-size="12.5" class="muted number" text-anchor="end">100%</text>
<text x="0" y="585" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="585" font-size="13" class="label number" text-anchor="end" font-weight="600">80.27%</text>
<rect x="0" y="590" width="280.9549" height="10" class="jev" data-dataset="aegis" data-model="jev_original" data-value="80.27282266526757" data-label="80.27%" />
<text x="0" y="624" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="624" font-size="13" class="label number" text-anchor="end">79.12%</text>
<rect x="0" y="629" width="276.9272" height="10" class="luna56" data-dataset="aegis" data-model="luna56" data-value="79.1220556745182" data-label="79.12%" />
<rect x="0" y="629" width="276.9272" height="10" fill="url(#jev-f1-mobile-stripe)" aria-hidden="true" />
<text x="0" y="663" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="663" font-size="13" class="label number" text-anchor="end">77.58%</text>
<rect x="0" y="668" width="271.5452" height="10" class="luna6" data-dataset="aegis" data-model="luna6" data-value="77.58433079434167" data-label="77.58%" />
<rect x="0" y="668" width="271.5452" height="10" fill="url(#jev-f1-mobile-dot)" aria-hidden="true" />
<text x="0" y="731" font-size="17" class="label" text-anchor="start" font-weight="600">WildGuardTest</text>
<text x="350" y="731" font-size="12.5" class="muted number" text-anchor="end">1,699 rows</text>
<line x1="0.0000" y1="770" x2="0.0000" y2="780" class="zero" />
<line x1="0.0000" y1="809" x2="0.0000" y2="819" class="zero" />
<line x1="0.0000" y1="848" x2="0.0000" y2="858" class="zero" />
<text x="0.0" y="883" font-size="12.5" class="muted number" text-anchor="start">0%</text>
<line x1="175.0000" y1="770" x2="175.0000" y2="780" class="grid" />
<line x1="175.0000" y1="809" x2="175.0000" y2="819" class="grid" />
<line x1="175.0000" y1="848" x2="175.0000" y2="858" class="grid" />
<text x="175.0" y="883" font-size="12.5" class="muted number" text-anchor="middle">50%</text>
<line x1="350.0000" y1="770" x2="350.0000" y2="780" class="grid" />
<line x1="350.0000" y1="809" x2="350.0000" y2="819" class="grid" />
<line x1="350.0000" y1="848" x2="350.0000" y2="858" class="grid" />
<text x="350.0" y="883" font-size="12.5" class="muted number" text-anchor="end">100%</text>
<text x="0" y="765" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="765" font-size="13" class="label number" text-anchor="end" font-weight="600">88.30%</text>
<rect x="0" y="770" width="309.0657" height="10" class="jev" data-dataset="wildguard" data-model="jev_original" data-value="88.30449826989619" data-label="88.30%" />
<text x="0" y="804" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="804" font-size="13" class="label number" text-anchor="end">83.54%</text>
<rect x="0" y="809" width="292.3858" height="10" class="luna56" data-dataset="wildguard" data-model="luna56" data-value="83.53879622915156" data-label="83.54%" />
<rect x="0" y="809" width="292.3858" height="10" fill="url(#jev-f1-mobile-stripe)" aria-hidden="true" />
<text x="0" y="843" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="843" font-size="13" class="label number" text-anchor="end">85.17%</text>
<rect x="0" y="848" width="298.0837" height="10" class="luna6" data-dataset="wildguard" data-model="luna6" data-value="85.16678495386799" data-label="85.17%" />
<rect x="0" y="848" width="298.0837" height="10" fill="url(#jev-f1-mobile-dot)" aria-hidden="true" />
<text x="175.0" y="931" font-size="12.5" class="muted" text-anchor="middle">F1 (%)</text>
</svg>
</figure>
<!-- jev-chart:f1:end -->

_Figure 1. Baseline benchmark results, unchanged after the later GPT-6 prompt search. The charts’ original Jev results refer to the Jev baseline prompt._

On WildGuard, Jev caught **638 of 754 harmful requests**, versus GPT-6’s 600, and falsely flagged 53 harmless messages versus 55. That’s 38 more harmful requests caught with two fewer false alarms. Jev still missed 116. GPT-6 improved on GPT-5.6 for XSTest and WildGuard, but fell behind on ToxicChat and Aegis.

## What prompt changes showed

I selected the **Jev content-focused prompt** from three prompts tested on **1,000 ToxicChat training groups**, then checked it on another **1,000 independent groups**. The selected prompt was fixed before test inference and the **0.54 cutoff** stayed unchanged.

| Dataset       | Jev baseline prompt | Jev content-focused prompt |
| ------------- | ------------------: | -------------------------: |
| ToxicChat     |               75.40 |                      80.23 |
| XSTest        |               93.40 |                      90.72 |
| Aegis 2       |               80.27 |                      80.77 |
| WildGuardTest |               88.30 |                    Not run |

_F1 for the same Jev 1.13.0 model with two prompts, on a 0–100 scale. Higher is better._

The ToxicChat gain and XSTest decline were both supported by the uncertainty checks. The smaller Aegis change was inconclusive, and the content-focused prompt wasn’t run on WildGuardTest. This suggests that improving the fit to one safety definition can worsen the fit to another.

I kept the baseline in the main comparison because it has results on all four datasets and uses the same safety criteria carried into both Luna prompts. Choosing whichever Jev prompt scored best on each test set would be a different comparison. The content-focused prompt shows a trade-off, rather than a consistently better replacement.

<blockquote class="pull-quote">
  <p><em>“The ToxicChat gain and XSTest decline were both supported by the uncertainty checks.”</em></p>
</blockquote>

The GPT-6 Luna search tested three fixed prompts on **600 previously unused ToxicChat training groups**. The original won with **69.70 F1**, versus 68.75 and 66.67. On 600 separate confirmation groups, it scored **72.16 F1**, wrongly flagging **2% of harmless messages**. Following the pre-agreed protocol, I reused its historical four-dataset predictions: **there was no full benchmark rerun**. This small search found no improvement, rather than proving none is possible.

## Cost and recorded request time

Historical estimated cost per thousand requests was **$0.019–$0.022 for Jev**, **$0.060–$0.077 for GPT-5.6** and **$0.029–$0.037 for GPT-6**. These estimates use returned token usage and recorded rates, including cache writes.

<!-- jev-chart:cost:start -->
<figure class="jev-chart-pair" data-chart="cost">
<svg xmlns="http://www.w3.org/2000/svg" class="jev-chart jev-chart--desktop" viewBox="0 0 780 858" width="780" height="858" role="img" aria-labelledby="jev-cost-desktop-title jev-cost-desktop-desc">
<title id="jev-cost-desktop-title">Estimated cost across the completed runs</title>
<desc id="jev-cost-desktop-desc">ToxicChat: Jev $0.0201, GPT-5.6 Luna $0.0661, GPT-6 Luna $0.0318. XSTest: Jev $0.0189, GPT-5.6 Luna $0.0604, GPT-6 Luna $0.0289. Aegis 2: Jev $0.0210, GPT-5.6 Luna $0.0708, GPT-6 Luna $0.0345. WildGuardTest: Jev $0.0224, GPT-5.6 Luna $0.0766, GPT-6 Luna $0.0370. Historical estimates. Aegis covers 1,915 Jev requests and 1,910 requests for each Luna run.</desc>
<style>.jev-chart-pair { margin: 2rem 0 1.5rem; padding-top: 1.2rem; border-top: 1px solid var(--color-border, #cbd3ce); }
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
@media (max-width: 720px) { .jev-chart-pair .jev-chart--desktop { display: none; } .jev-chart-pair .jev-chart--mobile { display: block; } }</style>
<defs>
<pattern id="jev-cost-desktop-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>
<pattern id="jev-cost-desktop-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>
</defs>
<text x="0" y="14" font-size="12" class="muted number" text-anchor="start">Figure 2</text>
<text x="0" y="52" font-size="29" class="heading" text-anchor="start">Estimated cost across the completed runs</text>
<text x="0" y="83" font-size="14" class="muted" text-anchor="start">Historical USD per 1,000 requests</text>
<text x="0" y="107" font-size="14" class="muted" text-anchor="start">Jev uses the original policy</text>
<text x="0" y="158" font-size="18" class="label" text-anchor="start" font-weight="600">ToxicChat</text>
<line x1="146.0000" y1="176" x2="146.0000" y2="272" class="zero" />
<text x="146.0" y="288" font-size="12" class="muted number" text-anchor="middle">$0.00</text>
<line x1="420.0000" y1="176" x2="420.0000" y2="272" class="grid" />
<text x="420.0" y="288" font-size="12" class="muted number" text-anchor="middle">$0.04</text>
<line x1="694.0000" y1="176" x2="694.0000" y2="272" class="grid" />
<text x="694.0" y="288" font-size="12" class="muted number" text-anchor="middle">$0.08</text>
<text x="132" y="194" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="292.6486" y="194" font-size="14" class="label number" text-anchor="start" font-weight="600">$0.0201</text>
<rect x="146" y="181" width="137.6486" height="17" class="jev" data-dataset="toxicchat" data-model="jev_original" data-value="0.0200946788585209" data-label="$0.0201" />
<text x="132" y="226" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="608.0841" y="226" font-size="14" class="label number" text-anchor="start">$0.0661</text>
<rect x="146" y="213" width="453.0841" height="17" class="luna56" data-dataset="toxicchat" data-model="luna56" data-value="0.06614365956591639" data-label="$0.0661" />
<rect x="146" y="213" width="453.0841" height="17" fill="url(#jev-cost-desktop-stripe)" aria-hidden="true" />
<text x="132" y="258" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="372.6618" y="258" font-size="14" class="label number" text-anchor="start">$0.0318</text>
<rect x="146" y="245" width="217.6618" height="17" class="luna6" data-dataset="toxicchat" data-model="luna6" data-value="0.03177544714630225" data-label="$0.0318" />
<rect x="146" y="245" width="217.6618" height="17" fill="url(#jev-cost-desktop-dot)" aria-hidden="true" />
<text x="0" y="323" font-size="18" class="label" text-anchor="start" font-weight="600">XSTest</text>
<line x1="146.0000" y1="341" x2="146.0000" y2="437" class="zero" />
<text x="146.0" y="453" font-size="12" class="muted number" text-anchor="middle">$0.00</text>
<line x1="420.0000" y1="341" x2="420.0000" y2="437" class="grid" />
<text x="420.0" y="453" font-size="12" class="muted number" text-anchor="middle">$0.04</text>
<line x1="694.0000" y1="341" x2="694.0000" y2="437" class="grid" />
<text x="694.0" y="453" font-size="12" class="muted number" text-anchor="middle">$0.08</text>
<text x="132" y="359" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="284.3154" y="359" font-size="14" class="label number" text-anchor="start" font-weight="600">$0.0189</text>
<rect x="146" y="346" width="129.3154" height="17" class="jev" data-dataset="xstest" data-model="jev_original" data-value="0.01887816" data-label="$0.0189" />
<text x="132" y="391" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="568.9044" y="391" font-size="14" class="label number" text-anchor="start">$0.0604</text>
<rect x="146" y="378" width="413.9044" height="17" class="luna56" data-dataset="xstest" data-model="luna56" data-value="0.060424000000000005" data-label="$0.0604" />
<rect x="146" y="378" width="413.9044" height="17" fill="url(#jev-cost-desktop-stripe)" aria-hidden="true" />
<text x="132" y="423" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="353.0472" y="423" font-size="14" class="label number" text-anchor="start">$0.0289</text>
<rect x="146" y="410" width="198.0472" height="17" class="luna6" data-dataset="xstest" data-model="luna6" data-value="0.028912" data-label="$0.0289" />
<rect x="146" y="410" width="198.0472" height="17" fill="url(#jev-cost-desktop-dot)" aria-hidden="true" />
<text x="0" y="488" font-size="18" class="label" text-anchor="start" font-weight="600">Aegis 2</text>
<line x1="146.0000" y1="506" x2="146.0000" y2="602" class="zero" />
<text x="146.0" y="618" font-size="12" class="muted number" text-anchor="middle">$0.00</text>
<line x1="420.0000" y1="506" x2="420.0000" y2="602" class="grid" />
<text x="420.0" y="618" font-size="12" class="muted number" text-anchor="middle">$0.04</text>
<line x1="694.0000" y1="506" x2="694.0000" y2="602" class="grid" />
<text x="694.0" y="618" font-size="12" class="muted number" text-anchor="middle">$0.08</text>
<text x="132" y="524" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="298.9987" y="524" font-size="14" class="label number" text-anchor="start" font-weight="600">$0.0210</text>
<rect x="146" y="511" width="143.9987" height="17" class="jev" data-dataset="aegis" data-model="jev_original" data-value="0.02102171279373368" data-label="$0.0210" />
<text x="132" y="556" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="640.3205" y="556" font-size="14" class="label number" text-anchor="start">$0.0708</text>
<rect x="146" y="543" width="485.3205" height="17" class="luna56" data-dataset="aegis" data-model="luna56" data-value="0.07084971204188481" data-label="$0.0708" />
<rect x="146" y="543" width="485.3205" height="17" fill="url(#jev-cost-desktop-stripe)" aria-hidden="true" />
<text x="132" y="588" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="391.5441" y="588" font-size="14" class="label number" text-anchor="start">$0.0345</text>
<rect x="146" y="575" width="236.5441" height="17" class="luna6" data-dataset="aegis" data-model="luna6" data-value="0.03453198952879582" data-label="$0.0345" />
<rect x="146" y="575" width="236.5441" height="17" fill="url(#jev-cost-desktop-dot)" aria-hidden="true" />
<text x="0" y="653" font-size="18" class="label" text-anchor="start" font-weight="600">WildGuardTest</text>
<line x1="146.0000" y1="671" x2="146.0000" y2="767" class="zero" />
<text x="146.0" y="783" font-size="12" class="muted number" text-anchor="middle">$0.00</text>
<line x1="420.0000" y1="671" x2="420.0000" y2="767" class="grid" />
<text x="420.0" y="783" font-size="12" class="muted number" text-anchor="middle">$0.04</text>
<line x1="694.0000" y1="671" x2="694.0000" y2="767" class="grid" />
<text x="694.0" y="783" font-size="12" class="muted number" text-anchor="middle">$0.08</text>
<text x="132" y="689" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="308.2957" y="689" font-size="14" class="label number" text-anchor="start" font-weight="600">$0.0224</text>
<rect x="146" y="676" width="153.2957" height="17" class="jev" data-dataset="wildguard" data-model="jev_original" data-value="0.022378929958799292" data-label="$0.0224" />
<text x="132" y="721" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="679.5455" y="721" font-size="14" class="label number" text-anchor="start">$0.0766</text>
<rect x="146" y="708" width="524.5455" height="17" class="luna56" data-dataset="wildguard" data-model="luna56" data-value="0.07657598587404357" data-label="$0.0766" />
<rect x="146" y="708" width="524.5455" height="17" fill="url(#jev-cost-desktop-stripe)" aria-hidden="true" />
<text x="132" y="753" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="408.404" y="753" font-size="14" class="label number" text-anchor="start">$0.0370</text>
<rect x="146" y="740" width="253.4040" height="17" class="luna6" data-dataset="wildguard" data-model="luna6" data-value="0.036993290170688635" data-label="$0.0370" />
<rect x="146" y="740" width="253.4040" height="17" fill="url(#jev-cost-desktop-dot)" aria-hidden="true" />
<text x="390.0" y="843" font-size="13" class="muted" text-anchor="middle">Estimated USD per 1,000 requests</text>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="jev-chart jev-chart--mobile" viewBox="0 0 350 946" width="350" height="946" role="img" aria-labelledby="jev-cost-mobile-title jev-cost-mobile-desc">
<title id="jev-cost-mobile-title">Estimated cost across the completed runs</title>
<desc id="jev-cost-mobile-desc">ToxicChat: Jev $0.0201, GPT-5.6 Luna $0.0661, GPT-6 Luna $0.0318. XSTest: Jev $0.0189, GPT-5.6 Luna $0.0604, GPT-6 Luna $0.0289. Aegis 2: Jev $0.0210, GPT-5.6 Luna $0.0708, GPT-6 Luna $0.0345. WildGuardTest: Jev $0.0224, GPT-5.6 Luna $0.0766, GPT-6 Luna $0.0370. Historical estimates. Aegis covers 1,915 Jev requests and 1,910 requests for each Luna run.</desc>
<style>.jev-chart-pair { margin: 2rem 0 1.5rem; padding-top: 1.2rem; border-top: 1px solid var(--color-border, #cbd3ce); }
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
@media (max-width: 720px) { .jev-chart-pair .jev-chart--desktop { display: none; } .jev-chart-pair .jev-chart--mobile { display: block; } }</style>
<defs>
<pattern id="jev-cost-mobile-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>
<pattern id="jev-cost-mobile-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>
</defs>
<text x="0" y="14" font-size="12.5" class="muted number" text-anchor="start">Figure 2</text>
<text x="0" y="46" font-size="23" class="heading" text-anchor="start">Estimated cost across</text>
<text x="0" y="73" font-size="23" class="heading" text-anchor="start">the completed runs</text>
<text x="0" y="100" font-size="12.5" class="muted" text-anchor="start">Historical USD per 1,000 requests</text>
<text x="0" y="146" font-size="12.5" class="muted" text-anchor="start">Jev uses the original policy</text>
<text x="0" y="191" font-size="17" class="label" text-anchor="start" font-weight="600">ToxicChat</text>
<line x1="0.0000" y1="230" x2="0.0000" y2="240" class="zero" />
<line x1="0.0000" y1="269" x2="0.0000" y2="279" class="zero" />
<line x1="0.0000" y1="308" x2="0.0000" y2="318" class="zero" />
<text x="0.0" y="343" font-size="12.5" class="muted number" text-anchor="start">$0.00</text>
<line x1="175.0000" y1="230" x2="175.0000" y2="240" class="grid" />
<line x1="175.0000" y1="269" x2="175.0000" y2="279" class="grid" />
<line x1="175.0000" y1="308" x2="175.0000" y2="318" class="grid" />
<text x="175.0" y="343" font-size="12.5" class="muted number" text-anchor="middle">$0.04</text>
<line x1="350.0000" y1="230" x2="350.0000" y2="240" class="grid" />
<line x1="350.0000" y1="269" x2="350.0000" y2="279" class="grid" />
<line x1="350.0000" y1="308" x2="350.0000" y2="318" class="grid" />
<text x="350.0" y="343" font-size="12.5" class="muted number" text-anchor="end">$0.08</text>
<text x="0" y="225" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="225" font-size="13" class="label number" text-anchor="end" font-weight="600">$0.0201</text>
<rect x="0" y="230" width="87.9142" height="10" class="jev" data-dataset="toxicchat" data-model="jev_original" data-value="0.0200946788585209" data-label="$0.0201" />
<text x="0" y="264" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="264" font-size="13" class="label number" text-anchor="end">$0.0661</text>
<rect x="0" y="269" width="289.3785" height="10" class="luna56" data-dataset="toxicchat" data-model="luna56" data-value="0.06614365956591639" data-label="$0.0661" />
<rect x="0" y="269" width="289.3785" height="10" fill="url(#jev-cost-mobile-stripe)" aria-hidden="true" />
<text x="0" y="303" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="303" font-size="13" class="label number" text-anchor="end">$0.0318</text>
<rect x="0" y="308" width="139.0176" height="10" class="luna6" data-dataset="toxicchat" data-model="luna6" data-value="0.03177544714630225" data-label="$0.0318" />
<rect x="0" y="308" width="139.0176" height="10" fill="url(#jev-cost-mobile-dot)" aria-hidden="true" />
<text x="0" y="371" font-size="17" class="label" text-anchor="start" font-weight="600">XSTest</text>
<line x1="0.0000" y1="410" x2="0.0000" y2="420" class="zero" />
<line x1="0.0000" y1="449" x2="0.0000" y2="459" class="zero" />
<line x1="0.0000" y1="488" x2="0.0000" y2="498" class="zero" />
<text x="0.0" y="523" font-size="12.5" class="muted number" text-anchor="start">$0.00</text>
<line x1="175.0000" y1="410" x2="175.0000" y2="420" class="grid" />
<line x1="175.0000" y1="449" x2="175.0000" y2="459" class="grid" />
<line x1="175.0000" y1="488" x2="175.0000" y2="498" class="grid" />
<text x="175.0" y="523" font-size="12.5" class="muted number" text-anchor="middle">$0.04</text>
<line x1="350.0000" y1="410" x2="350.0000" y2="420" class="grid" />
<line x1="350.0000" y1="449" x2="350.0000" y2="459" class="grid" />
<line x1="350.0000" y1="488" x2="350.0000" y2="498" class="grid" />
<text x="350.0" y="523" font-size="12.5" class="muted number" text-anchor="end">$0.08</text>
<text x="0" y="405" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="405" font-size="13" class="label number" text-anchor="end" font-weight="600">$0.0189</text>
<rect x="0" y="410" width="82.5919" height="10" class="jev" data-dataset="xstest" data-model="jev_original" data-value="0.01887816" data-label="$0.0189" />
<text x="0" y="444" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="444" font-size="13" class="label number" text-anchor="end">$0.0604</text>
<rect x="0" y="449" width="264.3550" height="10" class="luna56" data-dataset="xstest" data-model="luna56" data-value="0.060424000000000005" data-label="$0.0604" />
<rect x="0" y="449" width="264.3550" height="10" fill="url(#jev-cost-mobile-stripe)" aria-hidden="true" />
<text x="0" y="483" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="483" font-size="13" class="label number" text-anchor="end">$0.0289</text>
<rect x="0" y="488" width="126.4900" height="10" class="luna6" data-dataset="xstest" data-model="luna6" data-value="0.028912" data-label="$0.0289" />
<rect x="0" y="488" width="126.4900" height="10" fill="url(#jev-cost-mobile-dot)" aria-hidden="true" />
<text x="0" y="551" font-size="17" class="label" text-anchor="start" font-weight="600">Aegis 2</text>
<line x1="0.0000" y1="590" x2="0.0000" y2="600" class="zero" />
<line x1="0.0000" y1="629" x2="0.0000" y2="639" class="zero" />
<line x1="0.0000" y1="668" x2="0.0000" y2="678" class="zero" />
<text x="0.0" y="703" font-size="12.5" class="muted number" text-anchor="start">$0.00</text>
<line x1="175.0000" y1="590" x2="175.0000" y2="600" class="grid" />
<line x1="175.0000" y1="629" x2="175.0000" y2="639" class="grid" />
<line x1="175.0000" y1="668" x2="175.0000" y2="678" class="grid" />
<text x="175.0" y="703" font-size="12.5" class="muted number" text-anchor="middle">$0.04</text>
<line x1="350.0000" y1="590" x2="350.0000" y2="600" class="grid" />
<line x1="350.0000" y1="629" x2="350.0000" y2="639" class="grid" />
<line x1="350.0000" y1="668" x2="350.0000" y2="678" class="grid" />
<text x="350.0" y="703" font-size="12.5" class="muted number" text-anchor="end">$0.08</text>
<text x="0" y="585" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="585" font-size="13" class="label number" text-anchor="end" font-weight="600">$0.0210</text>
<rect x="0" y="590" width="91.9700" height="10" class="jev" data-dataset="aegis" data-model="jev_original" data-value="0.02102171279373368" data-label="$0.0210" />
<text x="0" y="624" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="624" font-size="13" class="label number" text-anchor="end">$0.0708</text>
<rect x="0" y="629" width="309.9675" height="10" class="luna56" data-dataset="aegis" data-model="luna56" data-value="0.07084971204188481" data-label="$0.0708" />
<rect x="0" y="629" width="309.9675" height="10" fill="url(#jev-cost-mobile-stripe)" aria-hidden="true" />
<text x="0" y="663" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="663" font-size="13" class="label number" text-anchor="end">$0.0345</text>
<rect x="0" y="668" width="151.0775" height="10" class="luna6" data-dataset="aegis" data-model="luna6" data-value="0.03453198952879582" data-label="$0.0345" />
<rect x="0" y="668" width="151.0775" height="10" fill="url(#jev-cost-mobile-dot)" aria-hidden="true" />
<text x="0" y="731" font-size="17" class="label" text-anchor="start" font-weight="600">WildGuardTest</text>
<line x1="0.0000" y1="770" x2="0.0000" y2="780" class="zero" />
<line x1="0.0000" y1="809" x2="0.0000" y2="819" class="zero" />
<line x1="0.0000" y1="848" x2="0.0000" y2="858" class="zero" />
<text x="0.0" y="883" font-size="12.5" class="muted number" text-anchor="start">$0.00</text>
<line x1="175.0000" y1="770" x2="175.0000" y2="780" class="grid" />
<line x1="175.0000" y1="809" x2="175.0000" y2="819" class="grid" />
<line x1="175.0000" y1="848" x2="175.0000" y2="858" class="grid" />
<text x="175.0" y="883" font-size="12.5" class="muted number" text-anchor="middle">$0.04</text>
<line x1="350.0000" y1="770" x2="350.0000" y2="780" class="grid" />
<line x1="350.0000" y1="809" x2="350.0000" y2="819" class="grid" />
<line x1="350.0000" y1="848" x2="350.0000" y2="858" class="grid" />
<text x="350.0" y="883" font-size="12.5" class="muted number" text-anchor="end">$0.08</text>
<text x="0" y="765" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="765" font-size="13" class="label number" text-anchor="end" font-weight="600">$0.0224</text>
<rect x="0" y="770" width="97.9078" height="10" class="jev" data-dataset="wildguard" data-model="jev_original" data-value="0.022378929958799292" data-label="$0.0224" />
<text x="0" y="804" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="804" font-size="13" class="label number" text-anchor="end">$0.0766</text>
<rect x="0" y="809" width="335.0199" height="10" class="luna56" data-dataset="wildguard" data-model="luna56" data-value="0.07657598587404357" data-label="$0.0766" />
<rect x="0" y="809" width="335.0199" height="10" fill="url(#jev-cost-mobile-stripe)" aria-hidden="true" />
<text x="0" y="843" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="843" font-size="13" class="label number" text-anchor="end">$0.0370</text>
<rect x="0" y="848" width="161.8456" height="10" class="luna6" data-dataset="wildguard" data-model="luna6" data-value="0.036993290170688635" data-label="$0.0370" />
<rect x="0" y="848" width="161.8456" height="10" fill="url(#jev-cost-mobile-dot)" aria-hidden="true" />
<text x="175.0" y="931" font-size="12.5" class="muted" text-anchor="middle">Estimated USD per 1,000 requests</text>
</svg>
</figure>
<!-- jev-chart:cost:end -->

_Figure 2. Cost per 1,000 unique requests. Counts: ToxicChat 4,976, XSTest 450, WildGuard 1,699, and Aegis 1,915 for Jev and 1,910 for each Luna run._

Median recorded times for successful requests were **289–316 milliseconds for Jev**, **707–720 for GPT-5.6** and **750–770 for GPT-6**. Jev’s timer stopped when the HTTP call returned. Luna’s also included JSON parsing, response-file writing and label/cost processing. The models ran separately under different service conditions, and the saved timings can’t isolate local processing costs. This wasn’t a controlled inference-speed comparison.

<!-- jev-chart:latency:start -->
<figure class="jev-chart-pair" data-chart="latency">
<svg xmlns="http://www.w3.org/2000/svg" class="jev-chart jev-chart--desktop" viewBox="0 0 780 858" width="780" height="858" role="img" aria-labelledby="jev-latency-desktop-title jev-latency-desktop-desc">
<title id="jev-latency-desktop-title">Recorded time for successful requests</title>
<desc id="jev-latency-desktop-desc">ToxicChat: Jev 305, GPT-5.6 Luna 715, GPT-6 Luna 754. XSTest: Jev 289, GPT-5.6 Luna 707, GPT-6 Luna 750. Aegis 2: Jev 290, GPT-5.6 Luna 710, GPT-6 Luna 760. WildGuardTest: Jev 316, GPT-5.6 Luna 720, GPT-6 Luna 770. Recorded successful-request times from separate runs with different network and service conditions. Jev stops at HTTP return. Luna includes JSON parsing, response-file writing and label/cost processing. Client queue and rate-limit waiting are excluded. No timing uncertainty intervals were saved.</desc>
<style>.jev-chart-pair { margin: 2rem 0 1.5rem; padding-top: 1.2rem; border-top: 1px solid var(--color-border, #cbd3ce); }
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
@media (max-width: 720px) { .jev-chart-pair .jev-chart--desktop { display: none; } .jev-chart-pair .jev-chart--mobile { display: block; } }</style>
<defs>
<pattern id="jev-latency-desktop-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>
<pattern id="jev-latency-desktop-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>
</defs>
<text x="0" y="14" font-size="12" class="muted number" text-anchor="start">Figure 3</text>
<text x="0" y="52" font-size="29" class="heading" text-anchor="start">Recorded time for successful requests</text>
<text x="0" y="83" font-size="14" class="muted" text-anchor="start">Successful requests · milliseconds</text>
<text x="0" y="107" font-size="14" class="muted" text-anchor="start">Jev uses the original policy</text>
<text x="0" y="158" font-size="18" class="label" text-anchor="start" font-weight="600">ToxicChat</text>
<line x1="146.0000" y1="176" x2="146.0000" y2="272" class="zero" />
<text x="146.0" y="288" font-size="12" class="muted number" text-anchor="middle">0</text>
<line x1="420.0000" y1="176" x2="420.0000" y2="272" class="grid" />
<text x="420.0" y="288" font-size="12" class="muted number" text-anchor="middle">400</text>
<line x1="694.0000" y1="176" x2="694.0000" y2="272" class="grid" />
<text x="694.0" y="288" font-size="12" class="muted number" text-anchor="middle">800</text>
<text x="132" y="194" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="363.9335" y="194" font-size="14" class="label number" text-anchor="start" font-weight="600">305</text>
<rect x="146" y="181" width="208.9335" height="17" class="jev" data-dataset="toxicchat" data-model="jev_original" data-value="305.01237549833604" data-label="305" />
<text x="132" y="226" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="644.763" y="226" font-size="14" class="label number" text-anchor="start">715</text>
<rect x="146" y="213" width="489.7630" height="17" class="luna56" data-dataset="toxicchat" data-model="luna56" data-value="714.9825204978697" data-label="715" />
<rect x="146" y="213" width="489.7630" height="17" fill="url(#jev-latency-desktop-stripe)" aria-hidden="true" />
<text x="132" y="258" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="671.6189" y="258" font-size="14" class="label number" text-anchor="start">754</text>
<rect x="146" y="245" width="516.6189" height="17" class="luna6" data-dataset="toxicchat" data-model="luna6" data-value="754.1882294462994" data-label="754" />
<rect x="146" y="245" width="516.6189" height="17" fill="url(#jev-latency-desktop-dot)" aria-hidden="true" />
<text x="0" y="323" font-size="18" class="label" text-anchor="start" font-weight="600">XSTest</text>
<line x1="146.0000" y1="341" x2="146.0000" y2="437" class="zero" />
<text x="146.0" y="453" font-size="12" class="muted number" text-anchor="middle">0</text>
<line x1="420.0000" y1="341" x2="420.0000" y2="437" class="grid" />
<text x="420.0" y="453" font-size="12" class="muted number" text-anchor="middle">400</text>
<line x1="694.0000" y1="341" x2="694.0000" y2="437" class="grid" />
<text x="694.0" y="453" font-size="12" class="muted number" text-anchor="middle">800</text>
<text x="132" y="359" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="352.8594" y="359" font-size="14" class="label number" text-anchor="start" font-weight="600">289</text>
<rect x="146" y="346" width="197.8594" height="17" class="jev" data-dataset="xstest" data-model="jev_original" data-value="288.8458749985148" data-label="289" />
<text x="132" y="391" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="639.0644" y="391" font-size="14" class="label number" text-anchor="start">707</text>
<rect x="146" y="378" width="484.0644" height="17" class="luna56" data-dataset="xstest" data-model="luna56" data-value="706.6633965005167" data-label="707" />
<rect x="146" y="378" width="484.0644" height="17" fill="url(#jev-latency-desktop-stripe)" aria-hidden="true" />
<text x="132" y="423" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="668.4361" y="423" font-size="14" class="label number" text-anchor="start">750</text>
<rect x="146" y="410" width="513.4361" height="17" class="luna6" data-dataset="xstest" data-model="luna6" data-value="749.5416874880902" data-label="750" />
<rect x="146" y="410" width="513.4361" height="17" fill="url(#jev-latency-desktop-dot)" aria-hidden="true" />
<text x="0" y="488" font-size="18" class="label" text-anchor="start" font-weight="600">Aegis 2</text>
<line x1="146.0000" y1="506" x2="146.0000" y2="602" class="zero" />
<text x="146.0" y="618" font-size="12" class="muted number" text-anchor="middle">0</text>
<line x1="420.0000" y1="506" x2="420.0000" y2="602" class="grid" />
<text x="420.0" y="618" font-size="12" class="muted number" text-anchor="middle">400</text>
<line x1="694.0000" y1="506" x2="694.0000" y2="602" class="grid" />
<text x="694.0" y="618" font-size="12" class="muted number" text-anchor="middle">800</text>
<text x="132" y="524" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="353.5256" y="524" font-size="14" class="label number" text-anchor="start" font-weight="600">290</text>
<rect x="146" y="511" width="198.5256" height="17" class="jev" data-dataset="aegis" data-model="jev_original" data-value="289.81833400030155" data-label="290" />
<text x="132" y="556" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="641.2113" y="556" font-size="14" class="label number" text-anchor="start">710</text>
<rect x="146" y="543" width="486.2113" height="17" class="luna56" data-dataset="aegis" data-model="luna56" data-value="709.7974790012813" data-label="710" />
<rect x="146" y="543" width="486.2113" height="17" fill="url(#jev-latency-desktop-stripe)" aria-hidden="true" />
<text x="132" y="588" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="675.6722" y="588" font-size="14" class="label number" text-anchor="start">760</text>
<rect x="146" y="575" width="520.6722" height="17" class="luna6" data-dataset="aegis" data-model="luna6" data-value="760.1053539547138" data-label="760" />
<rect x="146" y="575" width="520.6722" height="17" fill="url(#jev-latency-desktop-dot)" aria-hidden="true" />
<text x="0" y="653" font-size="18" class="label" text-anchor="start" font-weight="600">WildGuardTest</text>
<line x1="146.0000" y1="671" x2="146.0000" y2="767" class="zero" />
<text x="146.0" y="783" font-size="12" class="muted number" text-anchor="middle">0</text>
<line x1="420.0000" y1="671" x2="420.0000" y2="767" class="grid" />
<text x="420.0" y="783" font-size="12" class="muted number" text-anchor="middle">400</text>
<line x1="694.0000" y1="671" x2="694.0000" y2="767" class="grid" />
<text x="694.0" y="783" font-size="12" class="muted number" text-anchor="middle">800</text>
<text x="132" y="689" font-size="14" class="label" text-anchor="end">Jev</text>
<text x="371.3468" y="689" font-size="14" class="label number" text-anchor="start" font-weight="600">316</text>
<rect x="146" y="676" width="216.3468" height="17" class="jev" data-dataset="wildguard" data-model="jev_original" data-value="315.83470800251234" data-label="316" />
<text x="132" y="721" font-size="14" class="label" text-anchor="end">GPT-5.6 Luna</text>
<text x="648.4294" y="721" font-size="14" class="label number" text-anchor="start">720</text>
<rect x="146" y="708" width="493.4294" height="17" class="luna56" data-dataset="wildguard" data-model="luna56" data-value="720.3348750044825" data-label="720" />
<rect x="146" y="708" width="493.4294" height="17" fill="url(#jev-latency-desktop-stripe)" aria-hidden="true" />
<text x="132" y="753" font-size="14" class="label" text-anchor="end">GPT-6 Luna</text>
<text x="682.5624" y="753" font-size="14" class="label number" text-anchor="start">770</text>
<rect x="146" y="740" width="527.5624" height="17" class="luna6" data-dataset="wildguard" data-model="luna6" data-value="770.1640829909593" data-label="770" />
<rect x="146" y="740" width="527.5624" height="17" fill="url(#jev-latency-desktop-dot)" aria-hidden="true" />
<text x="390.0" y="843" font-size="13" class="muted" text-anchor="middle">Median recorded request time (ms)</text>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="jev-chart jev-chart--mobile" viewBox="0 0 350 946" width="350" height="946" role="img" aria-labelledby="jev-latency-mobile-title jev-latency-mobile-desc">
<title id="jev-latency-mobile-title">Recorded time for successful requests</title>
<desc id="jev-latency-mobile-desc">ToxicChat: Jev 305, GPT-5.6 Luna 715, GPT-6 Luna 754. XSTest: Jev 289, GPT-5.6 Luna 707, GPT-6 Luna 750. Aegis 2: Jev 290, GPT-5.6 Luna 710, GPT-6 Luna 760. WildGuardTest: Jev 316, GPT-5.6 Luna 720, GPT-6 Luna 770. Recorded successful-request times from separate runs with different network and service conditions. Jev stops at HTTP return. Luna includes JSON parsing, response-file writing and label/cost processing. Client queue and rate-limit waiting are excluded. No timing uncertainty intervals were saved.</desc>
<style>.jev-chart-pair { margin: 2rem 0 1.5rem; padding-top: 1.2rem; border-top: 1px solid var(--color-border, #cbd3ce); }
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
@media (max-width: 720px) { .jev-chart-pair .jev-chart--desktop { display: none; } .jev-chart-pair .jev-chart--mobile { display: block; } }</style>
<defs>
<pattern id="jev-latency-mobile-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>
<pattern id="jev-latency-mobile-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>
</defs>
<text x="0" y="14" font-size="12.5" class="muted number" text-anchor="start">Figure 3</text>
<text x="0" y="46" font-size="23" class="heading" text-anchor="start">Recorded time for</text>
<text x="0" y="73" font-size="23" class="heading" text-anchor="start">successful requests</text>
<text x="0" y="100" font-size="12.5" class="muted" text-anchor="start">Successful requests ·</text>
<text x="0" y="119" font-size="12.5" class="muted" text-anchor="start">milliseconds</text>
<text x="0" y="146" font-size="12.5" class="muted" text-anchor="start">Jev uses the original policy</text>
<text x="0" y="191" font-size="17" class="label" text-anchor="start" font-weight="600">ToxicChat</text>
<line x1="0.0000" y1="230" x2="0.0000" y2="240" class="zero" />
<line x1="0.0000" y1="269" x2="0.0000" y2="279" class="zero" />
<line x1="0.0000" y1="308" x2="0.0000" y2="318" class="zero" />
<text x="0.0" y="343" font-size="12.5" class="muted number" text-anchor="start">0</text>
<line x1="175.0000" y1="230" x2="175.0000" y2="240" class="grid" />
<line x1="175.0000" y1="269" x2="175.0000" y2="279" class="grid" />
<line x1="175.0000" y1="308" x2="175.0000" y2="318" class="grid" />
<text x="175.0" y="343" font-size="12.5" class="muted number" text-anchor="middle">400</text>
<line x1="350.0000" y1="230" x2="350.0000" y2="240" class="grid" />
<line x1="350.0000" y1="269" x2="350.0000" y2="279" class="grid" />
<line x1="350.0000" y1="308" x2="350.0000" y2="318" class="grid" />
<text x="350.0" y="343" font-size="12.5" class="muted number" text-anchor="end">800</text>
<text x="0" y="225" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="225" font-size="13" class="label number" text-anchor="end" font-weight="600">305</text>
<rect x="0" y="230" width="133.4429" height="10" class="jev" data-dataset="toxicchat" data-model="jev_original" data-value="305.01237549833604" data-label="305" />
<text x="0" y="264" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="264" font-size="13" class="label number" text-anchor="end">715</text>
<rect x="0" y="269" width="312.8049" height="10" class="luna56" data-dataset="toxicchat" data-model="luna56" data-value="714.9825204978697" data-label="715" />
<rect x="0" y="269" width="312.8049" height="10" fill="url(#jev-latency-mobile-stripe)" aria-hidden="true" />
<text x="0" y="303" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="303" font-size="13" class="label number" text-anchor="end">754</text>
<rect x="0" y="308" width="329.9574" height="10" class="luna6" data-dataset="toxicchat" data-model="luna6" data-value="754.1882294462994" data-label="754" />
<rect x="0" y="308" width="329.9574" height="10" fill="url(#jev-latency-mobile-dot)" aria-hidden="true" />
<text x="0" y="371" font-size="17" class="label" text-anchor="start" font-weight="600">XSTest</text>
<line x1="0.0000" y1="410" x2="0.0000" y2="420" class="zero" />
<line x1="0.0000" y1="449" x2="0.0000" y2="459" class="zero" />
<line x1="0.0000" y1="488" x2="0.0000" y2="498" class="zero" />
<text x="0.0" y="523" font-size="12.5" class="muted number" text-anchor="start">0</text>
<line x1="175.0000" y1="410" x2="175.0000" y2="420" class="grid" />
<line x1="175.0000" y1="449" x2="175.0000" y2="459" class="grid" />
<line x1="175.0000" y1="488" x2="175.0000" y2="498" class="grid" />
<text x="175.0" y="523" font-size="12.5" class="muted number" text-anchor="middle">400</text>
<line x1="350.0000" y1="410" x2="350.0000" y2="420" class="grid" />
<line x1="350.0000" y1="449" x2="350.0000" y2="459" class="grid" />
<line x1="350.0000" y1="488" x2="350.0000" y2="498" class="grid" />
<text x="350.0" y="523" font-size="12.5" class="muted number" text-anchor="end">800</text>
<text x="0" y="405" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="405" font-size="13" class="label number" text-anchor="end" font-weight="600">289</text>
<rect x="0" y="410" width="126.3701" height="10" class="jev" data-dataset="xstest" data-model="jev_original" data-value="288.8458749985148" data-label="289" />
<text x="0" y="444" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="444" font-size="13" class="label number" text-anchor="end">707</text>
<rect x="0" y="449" width="309.1652" height="10" class="luna56" data-dataset="xstest" data-model="luna56" data-value="706.6633965005167" data-label="707" />
<rect x="0" y="449" width="309.1652" height="10" fill="url(#jev-latency-mobile-stripe)" aria-hidden="true" />
<text x="0" y="483" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="483" font-size="13" class="label number" text-anchor="end">750</text>
<rect x="0" y="488" width="327.9245" height="10" class="luna6" data-dataset="xstest" data-model="luna6" data-value="749.5416874880902" data-label="750" />
<rect x="0" y="488" width="327.9245" height="10" fill="url(#jev-latency-mobile-dot)" aria-hidden="true" />
<text x="0" y="551" font-size="17" class="label" text-anchor="start" font-weight="600">Aegis 2</text>
<line x1="0.0000" y1="590" x2="0.0000" y2="600" class="zero" />
<line x1="0.0000" y1="629" x2="0.0000" y2="639" class="zero" />
<line x1="0.0000" y1="668" x2="0.0000" y2="678" class="zero" />
<text x="0.0" y="703" font-size="12.5" class="muted number" text-anchor="start">0</text>
<line x1="175.0000" y1="590" x2="175.0000" y2="600" class="grid" />
<line x1="175.0000" y1="629" x2="175.0000" y2="639" class="grid" />
<line x1="175.0000" y1="668" x2="175.0000" y2="678" class="grid" />
<text x="175.0" y="703" font-size="12.5" class="muted number" text-anchor="middle">400</text>
<line x1="350.0000" y1="590" x2="350.0000" y2="600" class="grid" />
<line x1="350.0000" y1="629" x2="350.0000" y2="639" class="grid" />
<line x1="350.0000" y1="668" x2="350.0000" y2="678" class="grid" />
<text x="350.0" y="703" font-size="12.5" class="muted number" text-anchor="end">800</text>
<text x="0" y="585" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="585" font-size="13" class="label number" text-anchor="end" font-weight="600">290</text>
<rect x="0" y="590" width="126.7955" height="10" class="jev" data-dataset="aegis" data-model="jev_original" data-value="289.81833400030155" data-label="290" />
<text x="0" y="624" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="624" font-size="13" class="label number" text-anchor="end">710</text>
<rect x="0" y="629" width="310.5364" height="10" class="luna56" data-dataset="aegis" data-model="luna56" data-value="709.7974790012813" data-label="710" />
<rect x="0" y="629" width="310.5364" height="10" fill="url(#jev-latency-mobile-stripe)" aria-hidden="true" />
<text x="0" y="663" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="663" font-size="13" class="label number" text-anchor="end">760</text>
<rect x="0" y="668" width="332.5461" height="10" class="luna6" data-dataset="aegis" data-model="luna6" data-value="760.1053539547138" data-label="760" />
<rect x="0" y="668" width="332.5461" height="10" fill="url(#jev-latency-mobile-dot)" aria-hidden="true" />
<text x="0" y="731" font-size="17" class="label" text-anchor="start" font-weight="600">WildGuardTest</text>
<line x1="0.0000" y1="770" x2="0.0000" y2="780" class="zero" />
<line x1="0.0000" y1="809" x2="0.0000" y2="819" class="zero" />
<line x1="0.0000" y1="848" x2="0.0000" y2="858" class="zero" />
<text x="0.0" y="883" font-size="12.5" class="muted number" text-anchor="start">0</text>
<line x1="175.0000" y1="770" x2="175.0000" y2="780" class="grid" />
<line x1="175.0000" y1="809" x2="175.0000" y2="819" class="grid" />
<line x1="175.0000" y1="848" x2="175.0000" y2="858" class="grid" />
<text x="175.0" y="883" font-size="12.5" class="muted number" text-anchor="middle">400</text>
<line x1="350.0000" y1="770" x2="350.0000" y2="780" class="grid" />
<line x1="350.0000" y1="809" x2="350.0000" y2="819" class="grid" />
<line x1="350.0000" y1="848" x2="350.0000" y2="858" class="grid" />
<text x="350.0" y="883" font-size="12.5" class="muted number" text-anchor="end">800</text>
<text x="0" y="765" font-size="13" class="label" text-anchor="start">Jev</text>
<text x="350" y="765" font-size="13" class="label number" text-anchor="end" font-weight="600">316</text>
<rect x="0" y="770" width="138.1777" height="10" class="jev" data-dataset="wildguard" data-model="jev_original" data-value="315.83470800251234" data-label="316" />
<text x="0" y="804" font-size="13" class="label" text-anchor="start">GPT-5.6 Luna</text>
<text x="350" y="804" font-size="13" class="label number" text-anchor="end">720</text>
<rect x="0" y="809" width="315.1465" height="10" class="luna56" data-dataset="wildguard" data-model="luna56" data-value="720.3348750044825" data-label="720" />
<rect x="0" y="809" width="315.1465" height="10" fill="url(#jev-latency-mobile-stripe)" aria-hidden="true" />
<text x="0" y="843" font-size="13" class="label" text-anchor="start">GPT-6 Luna</text>
<text x="350" y="843" font-size="13" class="label number" text-anchor="end">770</text>
<rect x="0" y="848" width="336.9468" height="10" class="luna6" data-dataset="wildguard" data-model="luna6" data-value="770.1640829909593" data-label="770" />
<rect x="0" y="848" width="336.9468" height="10" fill="url(#jev-latency-mobile-dot)" aria-hidden="true" />
<text x="175.0" y="931" font-size="12.5" class="muted" text-anchor="middle">Median recorded request time (ms)</text>
</svg>
</figure>
<!-- jev-chart:latency:end -->

_Figure 3. Median recorded time for successful requests. Client queue and rate-limit waiting are excluded. No timing uncertainty intervals were saved._

## An initial comparison with OpenAI Decisions

I also tested GPT-6 Luna through OpenAI’s [Decisions endpoint](https://developers.openai.com/api/docs/guides/decisions). Two frozen prompts transferred the existing criteria: the original assistant-safety prompt, with its Chat output-format instruction removed, and a policy variant formatted from the Jev content-focused instructions. Each scored the same **9,155 rows from 9,035 distinct requests**, using a **0.5 probability cutoff**. Historical Jev and Chat predictions were reused. No Decisions prompt search or threshold fitting was performed, and no further tuning was conducted.

| Dataset       | Jev baseline prompt | Decisions original | Decisions policy variant |
| ------------- | ------------------: | -----------------: | -----------------------: |
| ToxicChat     |               75.40 |              50.00 |                    62.88 |
| XSTest        |               93.40 |              86.50 |                    84.32 |
| Aegis 2       |               80.27 |              72.99 |                    72.41 |
| WildGuardTest |               88.30 |              79.63 |                    73.08 |

_F1 on a 0–100 scale. Decisions scores include blocking requests when the endpoint refused to classify them._

<!-- jev-chart:decisions-f1:start -->
<figure class="jev-chart-pair decisions-chart-pair" data-chart="decisions-f1" aria-describedby="decisions-f1-caption">
<svg xmlns="http://www.w3.org/2000/svg" class="decisions-chart decisions-chart--desktop" viewBox="0 0 780 1020" width="780" height="1020" role="img" aria-labelledby="decisions-f1-desktop-title decisions-f1-desktop-desc">
<title id="decisions-f1-desktop-title">Decisions, Jev and baseline Luna</title>
<desc id="decisions-f1-desktop-desc">ToxicChat, 5,083 scored rows: Jev · baseline 75.40, nominal 95% interval 71.65 to 78.99, GPT-6 Luna · Chat 63.68, nominal 95% interval 59.15 to 67.84, Decisions · original 50.00, nominal 95% interval 44.44 to 55.39, Decisions · policy variant 62.88, nominal 95% interval 58.12 to 67.25. Decisions probability coverage: original 100.00%, 5,083 of 5,083 rows, policy 99.74%, 5,070 of 5,083 rows. XSTest, 450 scored rows: Jev · baseline 93.40, nominal 95% interval 90.77 to 95.67, GPT-6 Luna · Chat 91.46, nominal 95% interval 88.40 to 94.38, Decisions · original 86.50, nominal 95% interval 82.62 to 90.13, Decisions · policy variant 84.32, nominal 95% interval 79.89 to 88.22. Decisions probability coverage: original 98.67%, 444 of 450 rows, policy 90.44%, 407 of 450 rows. Aegis 2, 1,923 scored rows: Jev · baseline 80.27, nominal 95% interval 78.27 to 82.10, GPT-6 Luna · Chat 77.58, nominal 95% interval 75.42 to 79.66, Decisions · original 72.99, nominal 95% interval 70.48 to 75.28, Decisions · policy variant 72.41, nominal 95% interval 70.01 to 74.88. Decisions probability coverage: original 98.75%, 1,899 of 1,923 rows, policy 95.06%, 1,828 of 1,923 rows. WildGuardTest, 1,699 scored rows: Jev · baseline 88.30, nominal 95% interval 86.46 to 89.97, GPT-6 Luna · Chat 85.17, nominal 95% interval 83.12 to 87.12, Decisions · original 79.63, nominal 95% interval 77.16 to 81.95, Decisions · policy variant 73.08, nominal 95% interval 70.03 to 75.69. Decisions probability coverage: original 99.82%, 1,696 of 1,699 rows, policy 97.41%, 1,655 of 1,699 rows. Figure 4. Unsafe-positive F1 on the same full scored rows, with Decisions refusals blocked. GPT-6 Luna Chat uses the unchanged Boolean baseline prompt. Jev uses its selected baseline prompt and 0.54 cutoff. Decisions uses the original and policy-variant prompts at 0.5. Whiskers show recorded nominal 95% grouped-bootstrap intervals for the saved predictions, without correction for multiple comparisons. These are not equally tuned systems, and interval overlap is not a paired significance test.</desc>
<style>.decisions-chart { display: block; width: 100%; height: auto; color: var(--color-text, #17231f); font-family: var(--font-sans, 'Manrope', sans-serif); }
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
@media (max-width: 720px) { .decisions-chart-pair .decisions-chart--desktop { display: none; } .decisions-chart-pair .decisions-chart--mobile { display: block; } }</style>
<defs>
<pattern id="decisions-f1-desktop-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>
<pattern id="decisions-f1-desktop-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>
<pattern id="decisions-f1-desktop-cross" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0L8 8 M8 0L0 8" class="texture" stroke-width="1" fill="none" /></pattern>
</defs>
<text x="0" y="14" font-size="12.5" class="muted number" text-anchor="start">Figure 4</text>
<text x="0" y="50" font-size="29" class="heading" text-anchor="start">Decisions, Jev and baseline Luna</text>
<text x="0" y="80" font-size="14" class="muted" text-anchor="start">Full-row F1 · higher is better · Decisions refusals counted as blocks</text>
<text x="0" y="104" font-size="13" class="muted" text-anchor="start">Recorded nominal 95% sampling intervals · unequal tuning</text>
<text x="0" y="143" font-size="18" class="label" text-anchor="start" font-weight="600">ToxicChat</text>
<text x="780" y="143" font-size="12.5" class="muted number" text-anchor="end">5,083 rows</text>
<text x="174" y="177" font-size="13" class="label" text-anchor="end">Jev · baseline</text>
<text x="773" y="177" font-size="13" class="label number" text-anchor="end" font-weight="600">75.40</text>
<line x1="188.0000" y1="163" x2="188.0000" y2="183" class="zero" />
<line x1="438.0000" y1="163" x2="438.0000" y2="183" class="grid" />
<line x1="688.0000" y1="163" x2="688.0000" y2="183" class="grid" />
<rect x="188" y="165" width="377.0015" height="16" class="jev" data-dataset="toxicchat" data-model="jev_original" data-value="75.40029112081513" data-label="75.40" />
<path d="M546.2317 169.0V177.0 M546.2317 173.0H582.9594 M582.9594 169.0V177.0" class="interval-halo" aria-hidden="true" />
<path d="M546.2317 169.0V177.0 M546.2317 173.0H582.9594 M582.9594 169.0V177.0" class="interval" data-interval-dataset="toxicchat" data-interval-model="jev_original" data-lower="71.64634146341463" data-upper="78.99187233948697" aria-hidden="true" />
<text x="174" y="209" font-size="13" class="label" text-anchor="end">GPT-6 Luna · Chat</text>
<text x="773" y="209" font-size="13" class="label number" text-anchor="end">63.68</text>
<line x1="188.0000" y1="195" x2="188.0000" y2="215" class="zero" />
<line x1="438.0000" y1="195" x2="438.0000" y2="215" class="grid" />
<line x1="688.0000" y1="195" x2="688.0000" y2="215" class="grid" />
<rect x="188" y="197" width="318.3926" height="16" class="luna6" data-dataset="toxicchat" data-model="luna6" data-value="63.67851622874807" data-label="63.68" />
<rect x="188" y="197" width="318.3926" height="16" fill="url(#decisions-f1-desktop-dot)" aria-hidden="true" />
<path d="M483.7694 201.0V209.0 M483.7694 205.0H527.1819 M527.1819 201.0V209.0" class="interval-halo" aria-hidden="true" />
<path d="M483.7694 201.0V209.0 M483.7694 205.0H527.1819 M527.1819 201.0V209.0" class="interval" data-interval-dataset="toxicchat" data-interval-model="luna6" data-lower="59.15388885034344" data-upper="67.83638611948373" aria-hidden="true" />
<text x="174" y="241" font-size="13" class="label" text-anchor="end">Decisions · original</text>
<text x="773" y="241" font-size="13" class="label number" text-anchor="end">50.00</text>
<line x1="188.0000" y1="227" x2="188.0000" y2="247" class="zero" />
<line x1="438.0000" y1="227" x2="438.0000" y2="247" class="grid" />
<line x1="688.0000" y1="227" x2="688.0000" y2="247" class="grid" />
<rect x="188" y="229" width="250.0000" height="16" class="decisions-original" data-dataset="toxicchat" data-model="decisions_original" data-value="50.0" data-label="50.00" />
<rect x="188" y="229" width="250.0000" height="16" fill="url(#decisions-f1-desktop-stripe)" aria-hidden="true" />
<path d="M410.2222 233.0V241.0 M410.2222 237.0H464.9517 M464.9517 233.0V241.0" class="interval-halo" aria-hidden="true" />
<path d="M410.2222 233.0V241.0 M410.2222 237.0H464.9517 M464.9517 233.0V241.0" class="interval" data-interval-dataset="toxicchat" data-interval-model="decisions_original" data-lower="44.44444444444444" data-upper="55.39033457249071" aria-hidden="true" />
<text x="174" y="273" font-size="13" class="label" text-anchor="end">Decisions · policy variant</text>
<text x="773" y="273" font-size="13" class="label number" text-anchor="end">62.88</text>
<line x1="188.0000" y1="259" x2="188.0000" y2="279" class="zero" />
<line x1="438.0000" y1="259" x2="438.0000" y2="279" class="grid" />
<line x1="688.0000" y1="259" x2="688.0000" y2="279" class="grid" />
<rect x="188" y="261" width="314.3813" height="16" class="decisions-policy" data-dataset="toxicchat" data-model="decisions_policy" data-value="62.87625418060201" data-label="62.88" />
<rect x="188" y="261" width="314.3813" height="16" fill="url(#decisions-f1-desktop-cross)" aria-hidden="true" />
<path d="M478.6133 265.0V273.0 M478.6133 269.0H524.2526 M524.2526 265.0V273.0" class="interval-halo" aria-hidden="true" />
<path d="M478.6133 265.0V273.0 M478.6133 269.0H524.2526 M524.2526 265.0V273.0" class="interval" data-interval-dataset="toxicchat" data-interval-model="decisions_policy" data-lower="58.122666543244165" data-upper="67.250514910831" aria-hidden="true" />
<text x="188.0" y="294" font-size="12.5" class="muted number" text-anchor="middle">0</text>
<text x="438.0" y="294" font-size="12.5" class="muted number" text-anchor="middle">50</text>
<text x="688.0" y="294" font-size="12.5" class="muted number" text-anchor="middle">100</text>
<text x="0" y="326" font-size="13" class="muted" text-anchor="start">Decisions probability coverage: original 100.00% · policy variant 99.74%</text>
<text x="0" y="359" font-size="18" class="label" text-anchor="start" font-weight="600">XSTest</text>
<text x="780" y="359" font-size="12.5" class="muted number" text-anchor="end">450 rows</text>
<text x="174" y="393" font-size="13" class="label" text-anchor="end">Jev · baseline</text>
<text x="773" y="393" font-size="13" class="label number" text-anchor="end" font-weight="600">93.40</text>
<line x1="188.0000" y1="379" x2="188.0000" y2="399" class="zero" />
<line x1="438.0000" y1="379" x2="438.0000" y2="399" class="grid" />
<line x1="688.0000" y1="379" x2="688.0000" y2="399" class="grid" />
<rect x="188" y="381" width="467.0051" height="16" class="jev" data-dataset="xstest" data-model="jev_original" data-value="93.4010152284264" data-label="93.40" />
<path d="M641.8462 385.0V393.0 M641.8462 389.0H666.3715 M666.3715 385.0V393.0" class="interval-halo" aria-hidden="true" />
<path d="M641.8462 385.0V393.0 M641.8462 389.0H666.3715 M666.3715 385.0V393.0" class="interval" data-interval-dataset="xstest" data-interval-model="jev_original" data-lower="90.76923076923077" data-upper="95.67429812834224" aria-hidden="true" />
<text x="174" y="425" font-size="13" class="label" text-anchor="end">GPT-6 Luna · Chat</text>
<text x="773" y="425" font-size="13" class="label number" text-anchor="end">91.46</text>
<line x1="188.0000" y1="411" x2="188.0000" y2="431" class="zero" />
<line x1="438.0000" y1="411" x2="438.0000" y2="431" class="grid" />
<line x1="688.0000" y1="411" x2="688.0000" y2="431" class="grid" />
<rect x="188" y="413" width="457.2864" height="16" class="luna6" data-dataset="xstest" data-model="luna6" data-value="91.4572864321608" data-label="91.46" />
<rect x="188" y="413" width="457.2864" height="16" fill="url(#decisions-f1-desktop-dot)" aria-hidden="true" />
<path d="M629.9842 417.0V425.0 M629.9842 421.0H659.8840 M659.8840 417.0V425.0" class="interval-halo" aria-hidden="true" />
<path d="M629.9842 417.0V425.0 M629.9842 421.0H659.8840 M659.8840 417.0V425.0" class="interval" data-interval-dataset="xstest" data-interval-model="luna6" data-lower="88.39684001286211" data-upper="94.37680879197646" aria-hidden="true" />
<text x="174" y="457" font-size="13" class="label" text-anchor="end">Decisions · original</text>
<text x="773" y="457" font-size="13" class="label number" text-anchor="end">86.50</text>
<line x1="188.0000" y1="443" x2="188.0000" y2="463" class="zero" />
<line x1="438.0000" y1="443" x2="438.0000" y2="463" class="grid" />
<line x1="688.0000" y1="443" x2="688.0000" y2="463" class="grid" />
<rect x="188" y="445" width="432.5069" height="16" class="decisions-original" data-dataset="xstest" data-model="decisions_original" data-value="86.50137741046832" data-label="86.50" />
<rect x="188" y="445" width="432.5069" height="16" fill="url(#decisions-f1-desktop-stripe)" aria-hidden="true" />
<path d="M601.0953 449.0V457.0 M601.0953 453.0H638.6667 M638.6667 449.0V457.0" class="interval-halo" aria-hidden="true" />
<path d="M601.0953 449.0V457.0 M601.0953 453.0H638.6667 M638.6667 449.0V457.0" class="interval" data-interval-dataset="xstest" data-interval-model="decisions_original" data-lower="82.61905292644688" data-upper="90.13333333333333" aria-hidden="true" />
<text x="174" y="489" font-size="13" class="label" text-anchor="end">Decisions · policy variant</text>
<text x="773" y="489" font-size="13" class="label number" text-anchor="end">84.32</text>
<line x1="188.0000" y1="475" x2="188.0000" y2="495" class="zero" />
<line x1="438.0000" y1="475" x2="438.0000" y2="495" class="grid" />
<line x1="688.0000" y1="475" x2="688.0000" y2="495" class="grid" />
<rect x="188" y="477" width="421.6216" height="16" class="decisions-policy" data-dataset="xstest" data-model="decisions_policy" data-value="84.32432432432432" data-label="84.32" />
<rect x="188" y="477" width="421.6216" height="16" fill="url(#decisions-f1-desktop-cross)" aria-hidden="true" />
<path d="M587.4636 481.0V489.0 M587.4636 485.0H629.1141 M629.1141 481.0V489.0" class="interval-halo" aria-hidden="true" />
<path d="M587.4636 481.0V489.0 M587.4636 485.0H629.1141 M629.1141 481.0V489.0" class="interval" data-interval-dataset="xstest" data-interval-model="decisions_policy" data-lower="79.89272496794499" data-upper="88.22282980177715" aria-hidden="true" />
<text x="188.0" y="510" font-size="12.5" class="muted number" text-anchor="middle">0</text>
<text x="438.0" y="510" font-size="12.5" class="muted number" text-anchor="middle">50</text>
<text x="688.0" y="510" font-size="12.5" class="muted number" text-anchor="middle">100</text>
<text x="0" y="542" font-size="13" class="muted" text-anchor="start">Decisions probability coverage: original 98.67% · policy variant 90.44%</text>
<text x="0" y="575" font-size="18" class="label" text-anchor="start" font-weight="600">Aegis 2</text>
<text x="780" y="575" font-size="12.5" class="muted number" text-anchor="end">1,923 rows</text>
<text x="174" y="609" font-size="13" class="label" text-anchor="end">Jev · baseline</text>
<text x="773" y="609" font-size="13" class="label number" text-anchor="end" font-weight="600">80.27</text>
<line x1="188.0000" y1="595" x2="188.0000" y2="615" class="zero" />
<line x1="438.0000" y1="595" x2="438.0000" y2="615" class="grid" />
<line x1="688.0000" y1="595" x2="688.0000" y2="615" class="grid" />
<rect x="188" y="597" width="401.3641" height="16" class="jev" data-dataset="aegis" data-model="jev_original" data-value="80.27282266526757" data-label="80.27" />
<path d="M579.3717 601.0V609.0 M579.3717 605.0H598.4953 M598.4953 601.0V609.0" class="interval-halo" aria-hidden="true" />
<path d="M579.3717 601.0V609.0 M579.3717 605.0H598.4953 M598.4953 601.0V609.0" class="interval" data-interval-dataset="aegis" data-interval-model="jev_original" data-lower="78.27433342944292" data-upper="82.0990667448451" aria-hidden="true" />
<text x="174" y="641" font-size="13" class="label" text-anchor="end">GPT-6 Luna · Chat</text>
<text x="773" y="641" font-size="13" class="label number" text-anchor="end">77.58</text>
<line x1="188.0000" y1="627" x2="188.0000" y2="647" class="zero" />
<line x1="438.0000" y1="627" x2="438.0000" y2="647" class="grid" />
<line x1="688.0000" y1="627" x2="688.0000" y2="647" class="grid" />
<rect x="188" y="629" width="387.9217" height="16" class="luna6" data-dataset="aegis" data-model="luna6" data-value="77.58433079434167" data-label="77.58" />
<rect x="188" y="629" width="387.9217" height="16" fill="url(#decisions-f1-desktop-dot)" aria-hidden="true" />
<path d="M565.0753 633.0V641.0 M565.0753 637.0H586.2929 M586.2929 633.0V641.0" class="interval-halo" aria-hidden="true" />
<path d="M565.0753 633.0V641.0 M565.0753 637.0H586.2929 M586.2929 633.0V641.0" class="interval" data-interval-dataset="aegis" data-interval-model="luna6" data-lower="75.41506310792273" data-upper="79.65858017146664" aria-hidden="true" />
<text x="174" y="673" font-size="13" class="label" text-anchor="end">Decisions · original</text>
<text x="773" y="673" font-size="13" class="label number" text-anchor="end">72.99</text>
<line x1="188.0000" y1="659" x2="188.0000" y2="679" class="zero" />
<line x1="438.0000" y1="659" x2="438.0000" y2="679" class="grid" />
<line x1="688.0000" y1="659" x2="688.0000" y2="679" class="grid" />
<rect x="188" y="661" width="364.9593" height="16" class="decisions-original" data-dataset="aegis" data-model="decisions_original" data-value="72.9918509895227" data-label="72.99" />
<rect x="188" y="661" width="364.9593" height="16" fill="url(#decisions-f1-desktop-stripe)" aria-hidden="true" />
<path d="M540.4200 665.0V673.0 M540.4200 669.0H564.3800 M564.3800 665.0V673.0" class="interval-halo" aria-hidden="true" />
<path d="M540.4200 665.0V673.0 M540.4200 669.0H564.3800 M564.3800 665.0V673.0" class="interval" data-interval-dataset="aegis" data-interval-model="decisions_original" data-lower="70.48400805109458" data-upper="75.27599964601247" aria-hidden="true" />
<text x="174" y="705" font-size="13" class="label" text-anchor="end">Decisions · policy variant</text>
<text x="773" y="705" font-size="13" class="label number" text-anchor="end">72.41</text>
<line x1="188.0000" y1="691" x2="188.0000" y2="711" class="zero" />
<line x1="438.0000" y1="691" x2="438.0000" y2="711" class="grid" />
<line x1="688.0000" y1="691" x2="688.0000" y2="711" class="grid" />
<rect x="188" y="693" width="362.0283" height="16" class="decisions-policy" data-dataset="aegis" data-model="decisions_policy" data-value="72.40566037735849" data-label="72.41" />
<rect x="188" y="693" width="362.0283" height="16" fill="url(#decisions-f1-desktop-cross)" aria-hidden="true" />
<path d="M538.0295 697.0V705.0 M538.0295 701.0H562.4188 M562.4188 697.0V705.0" class="interval-halo" aria-hidden="true" />
<path d="M538.0295 697.0V705.0 M538.0295 701.0H562.4188 M562.4188 697.0V705.0" class="interval" data-interval-dataset="aegis" data-interval-model="decisions_policy" data-lower="70.00589275191514" data-upper="74.88376093449968" aria-hidden="true" />
<text x="188.0" y="726" font-size="12.5" class="muted number" text-anchor="middle">0</text>
<text x="438.0" y="726" font-size="12.5" class="muted number" text-anchor="middle">50</text>
<text x="688.0" y="726" font-size="12.5" class="muted number" text-anchor="middle">100</text>
<text x="0" y="758" font-size="13" class="muted" text-anchor="start">Decisions probability coverage: original 98.75% · policy variant 95.06%</text>
<text x="0" y="791" font-size="18" class="label" text-anchor="start" font-weight="600">WildGuardTest</text>
<text x="780" y="791" font-size="12.5" class="muted number" text-anchor="end">1,699 rows</text>
<text x="174" y="825" font-size="13" class="label" text-anchor="end">Jev · baseline</text>
<text x="773" y="825" font-size="13" class="label number" text-anchor="end" font-weight="600">88.30</text>
<line x1="188.0000" y1="811" x2="188.0000" y2="831" class="zero" />
<line x1="438.0000" y1="811" x2="438.0000" y2="831" class="grid" />
<line x1="688.0000" y1="811" x2="688.0000" y2="831" class="grid" />
<rect x="188" y="813" width="441.5225" height="16" class="jev" data-dataset="wildguard" data-model="jev_original" data-value="88.30449826989619" data-label="88.30" />
<path d="M620.3174 817.0V825.0 M620.3174 821.0H637.8689 M637.8689 817.0V825.0" class="interval-halo" aria-hidden="true" />
<path d="M620.3174 817.0V825.0 M620.3174 821.0H637.8689 M637.8689 817.0V825.0" class="interval" data-interval-dataset="wildguard" data-interval-model="jev_original" data-lower="86.46348558890068" data-upper="89.97377672882749" aria-hidden="true" />
<text x="174" y="857" font-size="13" class="label" text-anchor="end">GPT-6 Luna · Chat</text>
<text x="773" y="857" font-size="13" class="label number" text-anchor="end">85.17</text>
<line x1="188.0000" y1="843" x2="188.0000" y2="863" class="zero" />
<line x1="438.0000" y1="843" x2="438.0000" y2="863" class="grid" />
<line x1="688.0000" y1="843" x2="688.0000" y2="863" class="grid" />
<rect x="188" y="845" width="425.8339" height="16" class="luna6" data-dataset="wildguard" data-model="luna6" data-value="85.16678495386799" data-label="85.17" />
<rect x="188" y="845" width="425.8339" height="16" fill="url(#decisions-f1-desktop-dot)" aria-hidden="true" />
<path d="M603.6200 849.0V857.0 M603.6200 853.0H623.5861 M623.5861 849.0V857.0" class="interval-halo" aria-hidden="true" />
<path d="M603.6200 849.0V857.0 M603.6200 853.0H623.5861 M623.5861 849.0V857.0" class="interval" data-interval-dataset="wildguard" data-interval-model="luna6" data-lower="83.12399363106888" data-upper="87.11722173531989" aria-hidden="true" />
<text x="174" y="889" font-size="13" class="label" text-anchor="end">Decisions · original</text>
<text x="773" y="889" font-size="13" class="label number" text-anchor="end">79.63</text>
<line x1="188.0000" y1="875" x2="188.0000" y2="895" class="zero" />
<line x1="438.0000" y1="875" x2="438.0000" y2="895" class="grid" />
<line x1="688.0000" y1="875" x2="688.0000" y2="895" class="grid" />
<rect x="188" y="877" width="398.1693" height="16" class="decisions-original" data-dataset="wildguard" data-model="decisions_original" data-value="79.63386727688787" data-label="79.63" />
<rect x="188" y="877" width="398.1693" height="16" fill="url(#decisions-f1-desktop-stripe)" aria-hidden="true" />
<path d="M573.7838 881.0V889.0 M573.7838 885.0H597.7637 M597.7637 881.0V889.0" class="interval-halo" aria-hidden="true" />
<path d="M573.7838 881.0V889.0 M573.7838 885.0H597.7637 M597.7637 881.0V889.0" class="interval" data-interval-dataset="wildguard" data-interval-model="decisions_original" data-lower="77.15675267558171" data-upper="81.95273184759165" aria-hidden="true" />
<text x="174" y="921" font-size="13" class="label" text-anchor="end">Decisions · policy variant</text>
<text x="773" y="921" font-size="13" class="label number" text-anchor="end">73.08</text>
<line x1="188.0000" y1="907" x2="188.0000" y2="927" class="zero" />
<line x1="438.0000" y1="907" x2="438.0000" y2="927" class="grid" />
<line x1="688.0000" y1="907" x2="688.0000" y2="927" class="grid" />
<rect x="188" y="909" width="365.4002" height="16" class="decisions-policy" data-dataset="wildguard" data-model="decisions_policy" data-value="73.08003233629749" data-label="73.08" />
<rect x="188" y="909" width="365.4002" height="16" fill="url(#decisions-f1-desktop-cross)" aria-hidden="true" />
<path d="M538.1573 913.0V921.0 M538.1573 917.0H566.4446 M566.4446 913.0V921.0" class="interval-halo" aria-hidden="true" />
<path d="M538.1573 913.0V921.0 M538.1573 917.0H566.4446 M566.4446 913.0V921.0" class="interval" data-interval-dataset="wildguard" data-interval-model="decisions_policy" data-lower="70.03145542317174" data-upper="75.6889163076773" aria-hidden="true" />
<text x="188.0" y="942" font-size="12.5" class="muted number" text-anchor="middle">0</text>
<text x="438.0" y="942" font-size="12.5" class="muted number" text-anchor="middle">50</text>
<text x="688.0" y="942" font-size="12.5" class="muted number" text-anchor="middle">100</text>
<text x="0" y="974" font-size="13" class="muted" text-anchor="start">Decisions probability coverage: original 99.82% · policy variant 97.41%</text>
<text x="390.0" y="1006" font-size="13" class="muted" text-anchor="middle">Unsafe-positive F1 (%)</text>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" class="decisions-chart decisions-chart--mobile" viewBox="0 0 350 1220" width="350" height="1220" role="img" aria-labelledby="decisions-f1-mobile-title decisions-f1-mobile-desc">
<title id="decisions-f1-mobile-title">Decisions, Jev and baseline Luna</title>
<desc id="decisions-f1-mobile-desc">ToxicChat, 5,083 scored rows: Jev · baseline 75.40, nominal 95% interval 71.65 to 78.99, GPT-6 Luna · Chat 63.68, nominal 95% interval 59.15 to 67.84, Decisions · original 50.00, nominal 95% interval 44.44 to 55.39, Decisions · policy variant 62.88, nominal 95% interval 58.12 to 67.25. Decisions probability coverage: original 100.00%, 5,083 of 5,083 rows, policy 99.74%, 5,070 of 5,083 rows. XSTest, 450 scored rows: Jev · baseline 93.40, nominal 95% interval 90.77 to 95.67, GPT-6 Luna · Chat 91.46, nominal 95% interval 88.40 to 94.38, Decisions · original 86.50, nominal 95% interval 82.62 to 90.13, Decisions · policy variant 84.32, nominal 95% interval 79.89 to 88.22. Decisions probability coverage: original 98.67%, 444 of 450 rows, policy 90.44%, 407 of 450 rows. Aegis 2, 1,923 scored rows: Jev · baseline 80.27, nominal 95% interval 78.27 to 82.10, GPT-6 Luna · Chat 77.58, nominal 95% interval 75.42 to 79.66, Decisions · original 72.99, nominal 95% interval 70.48 to 75.28, Decisions · policy variant 72.41, nominal 95% interval 70.01 to 74.88. Decisions probability coverage: original 98.75%, 1,899 of 1,923 rows, policy 95.06%, 1,828 of 1,923 rows. WildGuardTest, 1,699 scored rows: Jev · baseline 88.30, nominal 95% interval 86.46 to 89.97, GPT-6 Luna · Chat 85.17, nominal 95% interval 83.12 to 87.12, Decisions · original 79.63, nominal 95% interval 77.16 to 81.95, Decisions · policy variant 73.08, nominal 95% interval 70.03 to 75.69. Decisions probability coverage: original 99.82%, 1,696 of 1,699 rows, policy 97.41%, 1,655 of 1,699 rows. Figure 4. Unsafe-positive F1 on the same full scored rows, with Decisions refusals blocked. GPT-6 Luna Chat uses the unchanged Boolean baseline prompt. Jev uses its selected baseline prompt and 0.54 cutoff. Decisions uses the original and policy-variant prompts at 0.5. Whiskers show recorded nominal 95% grouped-bootstrap intervals for the saved predictions, without correction for multiple comparisons. These are not equally tuned systems, and interval overlap is not a paired significance test.</desc>
<style>.decisions-chart { display: block; width: 100%; height: auto; color: var(--color-text, #17231f); font-family: var(--font-sans, 'Manrope', sans-serif); }
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
@media (max-width: 720px) { .decisions-chart-pair .decisions-chart--desktop { display: none; } .decisions-chart-pair .decisions-chart--mobile { display: block; } }</style>
<defs>
<pattern id="decisions-f1-mobile-dot" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" class="texture" stroke="none" /></pattern>
<pattern id="decisions-f1-mobile-stripe" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1 M0 7L7 0 M6 8L8 6" class="texture" stroke-width="1.2" fill="none" /></pattern>
<pattern id="decisions-f1-mobile-cross" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0L8 8 M8 0L0 8" class="texture" stroke-width="1" fill="none" /></pattern>
</defs>
<text x="0" y="14" font-size="12.5" class="muted number" text-anchor="start">Figure 4</text>
<text x="0" y="46" font-size="23" class="heading" text-anchor="start">Decisions, Jev and</text>
<text x="0" y="74" font-size="23" class="heading" text-anchor="start">baseline Luna</text>
<text x="0" y="104" font-size="13" class="muted" text-anchor="start">Full-row F1 · higher is better</text>
<text x="0" y="125" font-size="13" class="muted" text-anchor="start">Decisions refusals counted as blocks</text>
<text x="0" y="146" font-size="12.5" class="muted" text-anchor="start">Nominal 95% intervals · unequal tuning</text>
<text x="0" y="166" font-size="17" class="label" text-anchor="start" font-weight="600">ToxicChat</text>
<text x="350" y="166" font-size="12.5" class="muted number" text-anchor="end">5,083 rows</text>
<text x="0" y="197" font-size="13" class="label" text-anchor="start">Jev · baseline</text>
<text x="350" y="197" font-size="13" class="label number" text-anchor="end" font-weight="600">75.40</text>
<line x1="0.0000" y1="201" x2="0.0000" y2="215" class="zero" />
<line x1="175.0000" y1="201" x2="175.0000" y2="215" class="grid" />
<line x1="350.0000" y1="201" x2="350.0000" y2="215" class="grid" />
<rect x="0" y="203" width="263.9010" height="10" class="jev" data-dataset="toxicchat" data-model="jev_original" data-value="75.40029112081513" data-label="75.40" />
<path d="M250.7622 204.0V212.0 M250.7622 208.0H276.4716 M276.4716 204.0V212.0" class="interval-halo" aria-hidden="true" />
<path d="M250.7622 204.0V212.0 M250.7622 208.0H276.4716 M276.4716 204.0V212.0" class="interval" data-interval-dataset="toxicchat" data-interval-model="jev_original" data-lower="71.64634146341463" data-upper="78.99187233948697" aria-hidden="true" />
<text x="0" y="237" font-size="13" class="label" text-anchor="start">GPT-6 Luna · Chat</text>
<text x="350" y="237" font-size="13" class="label number" text-anchor="end">63.68</text>
<line x1="0.0000" y1="241" x2="0.0000" y2="255" class="zero" />
<line x1="175.0000" y1="241" x2="175.0000" y2="255" class="grid" />
<line x1="350.0000" y1="241" x2="350.0000" y2="255" class="grid" />
<rect x="0" y="243" width="222.8748" height="10" class="luna6" data-dataset="toxicchat" data-model="luna6" data-value="63.67851622874807" data-label="63.68" />
<rect x="0" y="243" width="222.8748" height="10" fill="url(#decisions-f1-mobile-dot)" aria-hidden="true" />
<path d="M207.0386 244.0V252.0 M207.0386 248.0H237.4274 M237.4274 244.0V252.0" class="interval-halo" aria-hidden="true" />
<path d="M207.0386 244.0V252.0 M207.0386 248.0H237.4274 M237.4274 244.0V252.0" class="interval" data-interval-dataset="toxicchat" data-interval-model="luna6" data-lower="59.15388885034344" data-upper="67.83638611948373" aria-hidden="true" />
<text x="0" y="277" font-size="13" class="label" text-anchor="start">Decisions · original</text>
<text x="350" y="277" font-size="13" class="label number" text-anchor="end">50.00</text>
<line x1="0.0000" y1="281" x2="0.0000" y2="295" class="zero" />
<line x1="175.0000" y1="281" x2="175.0000" y2="295" class="grid" />
<line x1="350.0000" y1="281" x2="350.0000" y2="295" class="grid" />
<rect x="0" y="283" width="175.0000" height="10" class="decisions-original" data-dataset="toxicchat" data-model="decisions_original" data-value="50.0" data-label="50.00" />
<rect x="0" y="283" width="175.0000" height="10" fill="url(#decisions-f1-mobile-stripe)" aria-hidden="true" />
<path d="M155.5556 284.0V292.0 M155.5556 288.0H193.8662 M193.8662 284.0V292.0" class="interval-halo" aria-hidden="true" />
<path d="M155.5556 284.0V292.0 M155.5556 288.0H193.8662 M193.8662 284.0V292.0" class="interval" data-interval-dataset="toxicchat" data-interval-model="decisions_original" data-lower="44.44444444444444" data-upper="55.39033457249071" aria-hidden="true" />
<text x="0" y="317" font-size="13" class="label" text-anchor="start">Decisions · policy variant</text>
<text x="350" y="317" font-size="13" class="label number" text-anchor="end">62.88</text>
<line x1="0.0000" y1="321" x2="0.0000" y2="335" class="zero" />
<line x1="175.0000" y1="321" x2="175.0000" y2="335" class="grid" />
<line x1="350.0000" y1="321" x2="350.0000" y2="335" class="grid" />
<rect x="0" y="323" width="220.0669" height="10" class="decisions-policy" data-dataset="toxicchat" data-model="decisions_policy" data-value="62.87625418060201" data-label="62.88" />
<rect x="0" y="323" width="220.0669" height="10" fill="url(#decisions-f1-mobile-cross)" aria-hidden="true" />
<path d="M203.4293 324.0V332.0 M203.4293 328.0H235.3768 M235.3768 324.0V332.0" class="interval-halo" aria-hidden="true" />
<path d="M203.4293 324.0V332.0 M203.4293 328.0H235.3768 M235.3768 324.0V332.0" class="interval" data-interval-dataset="toxicchat" data-interval-model="decisions_policy" data-lower="58.122666543244165" data-upper="67.250514910831" aria-hidden="true" />
<text x="0.0" y="359" font-size="12.5" class="muted number" text-anchor="start">0</text>
<text x="175.0" y="359" font-size="12.5" class="muted number" text-anchor="middle">50</text>
<text x="350.0" y="359" font-size="12.5" class="muted number" text-anchor="end">100</text>
<text x="0" y="383" font-size="12.5" class="muted" text-anchor="start">Probability coverage · original 100.00%</text>
<text x="0" y="403" font-size="12.5" class="muted" text-anchor="start">policy variant 99.74%</text>
<text x="0" y="426" font-size="17" class="label" text-anchor="start" font-weight="600">XSTest</text>
<text x="350" y="426" font-size="12.5" class="muted number" text-anchor="end">450 rows</text>
<text x="0" y="457" font-size="13" class="label" text-anchor="start">Jev · baseline</text>
<text x="350" y="457" font-size="13" class="label number" text-anchor="end" font-weight="600">93.40</text>
<line x1="0.0000" y1="461" x2="0.0000" y2="475" class="zero" />
<line x1="175.0000" y1="461" x2="175.0000" y2="475" class="grid" />
<line x1="350.0000" y1="461" x2="350.0000" y2="475" class="grid" />
<rect x="0" y="463" width="326.9036" height="10" class="jev" data-dataset="xstest" data-model="jev_original" data-value="93.4010152284264" data-label="93.40" />
<path d="M317.6923 464.0V472.0 M317.6923 468.0H334.8600 M334.8600 464.0V472.0" class="interval-halo" aria-hidden="true" />
<path d="M317.6923 464.0V472.0 M317.6923 468.0H334.8600 M334.8600 464.0V472.0" class="interval" data-interval-dataset="xstest" data-interval-model="jev_original" data-lower="90.76923076923077" data-upper="95.67429812834224" aria-hidden="true" />
<text x="0" y="497" font-size="13" class="label" text-anchor="start">GPT-6 Luna · Chat</text>
<text x="350" y="497" font-size="13" class="label number" text-anchor="end">91.46</text>
<line x1="0.0000" y1="501" x2="0.0000" y2="515" class="zero" />
<line x1="175.0000" y1="501" x2="175.0000" y2="515" class="grid" />
<line x1="350.0000" y1="501" x2="350.0000" y2="515" class="grid" />
<rect x="0" y="503" width="320.1005" height="10" class="luna6" data-dataset="xstest" data-model="luna6" data-value="91.4572864321608" data-label="91.46" />
<rect x="0" y="503" width="320.1005" height="10" fill="url(#decisions-f1-mobile-dot)" aria-hidden="true" />
<path d="M309.3889 504.0V512.0 M309.3889 508.0H330.3188 M330.3188 504.0V512.0" class="interval-halo" aria-hidden="true" />
<path d="M309.3889 504.0V512.0 M309.3889 508.0H330.3188 M330.3188 504.0V512.0" class="interval" data-interval-dataset="xstest" data-interval-model="luna6" data-lower="88.39684001286211" data-upper="94.37680879197646" aria-hidden="true" />
<text x="0" y="537" font-size="13" class="label" text-anchor="start">Decisions · original</text>
<text x="350" y="537" font-size="13" class="label number" text-anchor="end">86.50</text>
<line x1="0.0000" y1="541" x2="0.0000" y2="555" class="zero" />
<line x1="175.0000" y1="541" x2="175.0000" y2="555" class="grid" />
<line x1="350.0000" y1="541" x2="350.0000" y2="555" class="grid" />
<rect x="0" y="543" width="302.7548" height="10" class="decisions-original" data-dataset="xstest" data-model="decisions_original" data-value="86.50137741046832" data-label="86.50" />
<rect x="0" y="543" width="302.7548" height="10" fill="url(#decisions-f1-mobile-stripe)" aria-hidden="true" />
<path d="M289.1667 544.0V552.0 M289.1667 548.0H315.4667 M315.4667 544.0V552.0" class="interval-halo" aria-hidden="true" />
<path d="M289.1667 544.0V552.0 M289.1667 548.0H315.4667 M315.4667 544.0V552.0" class="interval" data-interval-dataset="xstest" data-interval-model="decisions_original" data-lower="82.61905292644688" data-upper="90.13333333333333" aria-hidden="true" />
<text x="0" y="577" font-size="13" class="label" text-anchor="start">Decisions · policy variant</text>
<text x="350" y="577" font-size="13" class="label number" text-anchor="end">84.32</text>
<line x1="0.0000" y1="581" x2="0.0000" y2="595" class="zero" />
<line x1="175.0000" y1="581" x2="175.0000" y2="595" class="grid" />
<line x1="350.0000" y1="581" x2="350.0000" y2="595" class="grid" />
<rect x="0" y="583" width="295.1351" height="10" class="decisions-policy" data-dataset="xstest" data-model="decisions_policy" data-value="84.32432432432432" data-label="84.32" />
<rect x="0" y="583" width="295.1351" height="10" fill="url(#decisions-f1-mobile-cross)" aria-hidden="true" />
<path d="M279.6245 584.0V592.0 M279.6245 588.0H308.7799 M308.7799 584.0V592.0" class="interval-halo" aria-hidden="true" />
<path d="M279.6245 584.0V592.0 M279.6245 588.0H308.7799 M308.7799 584.0V592.0" class="interval" data-interval-dataset="xstest" data-interval-model="decisions_policy" data-lower="79.89272496794499" data-upper="88.22282980177715" aria-hidden="true" />
<text x="0.0" y="619" font-size="12.5" class="muted number" text-anchor="start">0</text>
<text x="175.0" y="619" font-size="12.5" class="muted number" text-anchor="middle">50</text>
<text x="350.0" y="619" font-size="12.5" class="muted number" text-anchor="end">100</text>
<text x="0" y="643" font-size="12.5" class="muted" text-anchor="start">Probability coverage · original 98.67%</text>
<text x="0" y="663" font-size="12.5" class="muted" text-anchor="start">policy variant 90.44%</text>
<text x="0" y="686" font-size="17" class="label" text-anchor="start" font-weight="600">Aegis 2</text>
<text x="350" y="686" font-size="12.5" class="muted number" text-anchor="end">1,923 rows</text>
<text x="0" y="717" font-size="13" class="label" text-anchor="start">Jev · baseline</text>
<text x="350" y="717" font-size="13" class="label number" text-anchor="end" font-weight="600">80.27</text>
<line x1="0.0000" y1="721" x2="0.0000" y2="735" class="zero" />
<line x1="175.0000" y1="721" x2="175.0000" y2="735" class="grid" />
<line x1="350.0000" y1="721" x2="350.0000" y2="735" class="grid" />
<rect x="0" y="723" width="280.9549" height="10" class="jev" data-dataset="aegis" data-model="jev_original" data-value="80.27282266526757" data-label="80.27" />
<path d="M273.9602 724.0V732.0 M273.9602 728.0H287.3467 M287.3467 724.0V732.0" class="interval-halo" aria-hidden="true" />
<path d="M273.9602 724.0V732.0 M273.9602 728.0H287.3467 M287.3467 724.0V732.0" class="interval" data-interval-dataset="aegis" data-interval-model="jev_original" data-lower="78.27433342944292" data-upper="82.0990667448451" aria-hidden="true" />
<text x="0" y="757" font-size="13" class="label" text-anchor="start">GPT-6 Luna · Chat</text>
<text x="350" y="757" font-size="13" class="label number" text-anchor="end">77.58</text>
<line x1="0.0000" y1="761" x2="0.0000" y2="775" class="zero" />
<line x1="175.0000" y1="761" x2="175.0000" y2="775" class="grid" />
<line x1="350.0000" y1="761" x2="350.0000" y2="775" class="grid" />
<rect x="0" y="763" width="271.5452" height="10" class="luna6" data-dataset="aegis" data-model="luna6" data-value="77.58433079434167" data-label="77.58" />
<rect x="0" y="763" width="271.5452" height="10" fill="url(#decisions-f1-mobile-dot)" aria-hidden="true" />
<path d="M263.9527 764.0V772.0 M263.9527 768.0H278.8050 M278.8050 764.0V772.0" class="interval-halo" aria-hidden="true" />
<path d="M263.9527 764.0V772.0 M263.9527 768.0H278.8050 M278.8050 764.0V772.0" class="interval" data-interval-dataset="aegis" data-interval-model="luna6" data-lower="75.41506310792273" data-upper="79.65858017146664" aria-hidden="true" />
<text x="0" y="797" font-size="13" class="label" text-anchor="start">Decisions · original</text>
<text x="350" y="797" font-size="13" class="label number" text-anchor="end">72.99</text>
<line x1="0.0000" y1="801" x2="0.0000" y2="815" class="zero" />
<line x1="175.0000" y1="801" x2="175.0000" y2="815" class="grid" />
<line x1="350.0000" y1="801" x2="350.0000" y2="815" class="grid" />
<rect x="0" y="803" width="255.4715" height="10" class="decisions-original" data-dataset="aegis" data-model="decisions_original" data-value="72.9918509895227" data-label="72.99" />
<rect x="0" y="803" width="255.4715" height="10" fill="url(#decisions-f1-mobile-stripe)" aria-hidden="true" />
<path d="M246.6940 804.0V812.0 M246.6940 808.0H263.4660 M263.4660 804.0V812.0" class="interval-halo" aria-hidden="true" />
<path d="M246.6940 804.0V812.0 M246.6940 808.0H263.4660 M263.4660 804.0V812.0" class="interval" data-interval-dataset="aegis" data-interval-model="decisions_original" data-lower="70.48400805109458" data-upper="75.27599964601247" aria-hidden="true" />
<text x="0" y="837" font-size="13" class="label" text-anchor="start">Decisions · policy variant</text>
<text x="350" y="837" font-size="13" class="label number" text-anchor="end">72.41</text>
<line x1="0.0000" y1="841" x2="0.0000" y2="855" class="zero" />
<line x1="175.0000" y1="841" x2="175.0000" y2="855" class="grid" />
<line x1="350.0000" y1="841" x2="350.0000" y2="855" class="grid" />
<rect x="0" y="843" width="253.4198" height="10" class="decisions-policy" data-dataset="aegis" data-model="decisions_policy" data-value="72.40566037735849" data-label="72.41" />
<rect x="0" y="843" width="253.4198" height="10" fill="url(#decisions-f1-mobile-cross)" aria-hidden="true" />
<path d="M245.0206 844.0V852.0 M245.0206 848.0H262.0932 M262.0932 844.0V852.0" class="interval-halo" aria-hidden="true" />
<path d="M245.0206 844.0V852.0 M245.0206 848.0H262.0932 M262.0932 844.0V852.0" class="interval" data-interval-dataset="aegis" data-interval-model="decisions_policy" data-lower="70.00589275191514" data-upper="74.88376093449968" aria-hidden="true" />
<text x="0.0" y="879" font-size="12.5" class="muted number" text-anchor="start">0</text>
<text x="175.0" y="879" font-size="12.5" class="muted number" text-anchor="middle">50</text>
<text x="350.0" y="879" font-size="12.5" class="muted number" text-anchor="end">100</text>
<text x="0" y="903" font-size="12.5" class="muted" text-anchor="start">Probability coverage · original 98.75%</text>
<text x="0" y="923" font-size="12.5" class="muted" text-anchor="start">policy variant 95.06%</text>
<text x="0" y="946" font-size="17" class="label" text-anchor="start" font-weight="600">WildGuardTest</text>
<text x="350" y="946" font-size="12.5" class="muted number" text-anchor="end">1,699 rows</text>
<text x="0" y="977" font-size="13" class="label" text-anchor="start">Jev · baseline</text>
<text x="350" y="977" font-size="13" class="label number" text-anchor="end" font-weight="600">88.30</text>
<line x1="0.0000" y1="981" x2="0.0000" y2="995" class="zero" />
<line x1="175.0000" y1="981" x2="175.0000" y2="995" class="grid" />
<line x1="350.0000" y1="981" x2="350.0000" y2="995" class="grid" />
<rect x="0" y="983" width="309.0657" height="10" class="jev" data-dataset="wildguard" data-model="jev_original" data-value="88.30449826989619" data-label="88.30" />
<path d="M302.6222 984.0V992.0 M302.6222 988.0H314.9082 M314.9082 984.0V992.0" class="interval-halo" aria-hidden="true" />
<path d="M302.6222 984.0V992.0 M302.6222 988.0H314.9082 M314.9082 984.0V992.0" class="interval" data-interval-dataset="wildguard" data-interval-model="jev_original" data-lower="86.46348558890068" data-upper="89.97377672882749" aria-hidden="true" />
<text x="0" y="1017" font-size="13" class="label" text-anchor="start">GPT-6 Luna · Chat</text>
<text x="350" y="1017" font-size="13" class="label number" text-anchor="end">85.17</text>
<line x1="0.0000" y1="1021" x2="0.0000" y2="1035" class="zero" />
<line x1="175.0000" y1="1021" x2="175.0000" y2="1035" class="grid" />
<line x1="350.0000" y1="1021" x2="350.0000" y2="1035" class="grid" />
<rect x="0" y="1023" width="298.0837" height="10" class="luna6" data-dataset="wildguard" data-model="luna6" data-value="85.16678495386799" data-label="85.17" />
<rect x="0" y="1023" width="298.0837" height="10" fill="url(#decisions-f1-mobile-dot)" aria-hidden="true" />
<path d="M290.9340 1024.0V1032.0 M290.9340 1028.0H304.9103 M304.9103 1024.0V1032.0" class="interval-halo" aria-hidden="true" />
<path d="M290.9340 1024.0V1032.0 M290.9340 1028.0H304.9103 M304.9103 1024.0V1032.0" class="interval" data-interval-dataset="wildguard" data-interval-model="luna6" data-lower="83.12399363106888" data-upper="87.11722173531989" aria-hidden="true" />
<text x="0" y="1057" font-size="13" class="label" text-anchor="start">Decisions · original</text>
<text x="350" y="1057" font-size="13" class="label number" text-anchor="end">79.63</text>
<line x1="0.0000" y1="1061" x2="0.0000" y2="1075" class="zero" />
<line x1="175.0000" y1="1061" x2="175.0000" y2="1075" class="grid" />
<line x1="350.0000" y1="1061" x2="350.0000" y2="1075" class="grid" />
<rect x="0" y="1063" width="278.7185" height="10" class="decisions-original" data-dataset="wildguard" data-model="decisions_original" data-value="79.63386727688787" data-label="79.63" />
<rect x="0" y="1063" width="278.7185" height="10" fill="url(#decisions-f1-mobile-stripe)" aria-hidden="true" />
<path d="M270.0486 1064.0V1072.0 M270.0486 1068.0H286.8346 M286.8346 1064.0V1072.0" class="interval-halo" aria-hidden="true" />
<path d="M270.0486 1064.0V1072.0 M270.0486 1068.0H286.8346 M286.8346 1064.0V1072.0" class="interval" data-interval-dataset="wildguard" data-interval-model="decisions_original" data-lower="77.15675267558171" data-upper="81.95273184759165" aria-hidden="true" />
<text x="0" y="1097" font-size="13" class="label" text-anchor="start">Decisions · policy variant</text>
<text x="350" y="1097" font-size="13" class="label number" text-anchor="end">73.08</text>
<line x1="0.0000" y1="1101" x2="0.0000" y2="1115" class="zero" />
<line x1="175.0000" y1="1101" x2="175.0000" y2="1115" class="grid" />
<line x1="350.0000" y1="1101" x2="350.0000" y2="1115" class="grid" />
<rect x="0" y="1103" width="255.7801" height="10" class="decisions-policy" data-dataset="wildguard" data-model="decisions_policy" data-value="73.08003233629749" data-label="73.08" />
<rect x="0" y="1103" width="255.7801" height="10" fill="url(#decisions-f1-mobile-cross)" aria-hidden="true" />
<path d="M245.1101 1104.0V1112.0 M245.1101 1108.0H264.9112 M264.9112 1104.0V1112.0" class="interval-halo" aria-hidden="true" />
<path d="M245.1101 1104.0V1112.0 M245.1101 1108.0H264.9112 M264.9112 1104.0V1112.0" class="interval" data-interval-dataset="wildguard" data-interval-model="decisions_policy" data-lower="70.03145542317174" data-upper="75.6889163076773" aria-hidden="true" />
<text x="0.0" y="1139" font-size="12.5" class="muted number" text-anchor="start">0</text>
<text x="175.0" y="1139" font-size="12.5" class="muted number" text-anchor="middle">50</text>
<text x="350.0" y="1139" font-size="12.5" class="muted number" text-anchor="end">100</text>
<text x="0" y="1163" font-size="12.5" class="muted" text-anchor="start">Probability coverage · original 99.82%</text>
<text x="0" y="1183" font-size="12.5" class="muted" text-anchor="start">policy variant 97.41%</text>
<text x="175.0" y="1206" font-size="13" class="muted" text-anchor="middle">Unsafe-positive F1 (%)</text>
</svg>
<figcaption id="decisions-f1-caption">Figure 4. Unsafe-positive F1 on the same full scored rows, with Decisions refusals blocked. GPT-6 Luna Chat uses the unchanged Boolean baseline prompt. Jev uses its selected baseline prompt and 0.54 cutoff. Decisions uses the original and policy-variant prompts at 0.5. Whiskers show recorded nominal 95% grouped-bootstrap intervals for the saved predictions, without correction for multiple comparisons. These are not equally tuned systems, and interval overlap is not a paired significance test.</figcaption>
</figure>
<!-- jev-chart:decisions-f1:end -->

Jev had higher observed F1 in all eight comparisons. The nominal 95% intervals from 2,000 paired resamples of normalised-message groups favoured Jev throughout, with the same sampling and multiple-comparison limitations described above. The policy variant improved Decisions on ToxicChat but reduced F1 elsewhere. Original Decisions caught **36.74% of toxic ToxicChat messages**, compared with Jev’s **71.55%**, while falsely flagging **0.78% of harmless messages**, compared with **1.40%**. Lower false-positive rates came with more missed harms.

Refusals need separate attention because they contain no classification probability. The primary analysis counted them as blocked deployment actions, so it measures the classifier plus that fallback. This departed from the earlier preflight plan to leave refusals unresolved, although the blocking rule was frozen before inference. Probability coverage was **99.64% of scored rows for the original prompt** and **97.87% for the policy variant**. On XSTest, the variant refused **9.56% of rows**: allowing rather than blocking those requests reduced F1 from **84.32 to 72.78**. An offline check excluded refusals and compared each configuration on exactly the same answered rows. Jev remained ahead in all eight comparisons, but those selected subsets differ between prompts and no new confidence intervals were calculated.

The run’s measured token usage gave a **$0.6790464 base cost estimate**, including the development pilot. A conservative ledger allowance totalled **$1.0197696**, including a 50% margin and a reservation for one failed attempt. Neither figure is an invoice-reconciled bill. Base estimates across datasets and prompts were **$0.032–$0.043 per thousand unique test requests**.

Median client request times were around **301 milliseconds**, including network, server and local response processing. They used final valid test responses, including refusals, and excluded queue waits, retry backoff and failed attempts. These measurements don’t isolate inference time, and the separately collected historical timings don’t establish a controlled speed advantage.

This is an initial transferred-prompt comparison on benchmarks whose earlier results were already known. It supports retaining Jev as the stronger measured baseline in this setup. Comparable tuning budgets and fresh held-out material would be needed to compare the systems’ attainable performance.

## What this means in practice

Tuning wasn’t equal: Jev had prompt and threshold selection, while Luna’s later Chat search covered three prompts on ToxicChat only. Decisions received mechanically transferred prompts without its own search or fitted cutoff. I knew the earlier test results when I designed the follow-ups, and benchmark exposure during model training is unknown. These exploratory comparisons aren’t an equally tuned model leaderboard.

A good F1 also doesn’t guarantee safe automatic approval. A separate post-test Aegis what-if reused cached unsafe scores, allowing messages at **p ≤ 0.05**, blocking them at **p ≥ 0.95** and deferring the rest. With the baseline prompt, **52 of 560 automatically allowed messages had unsafe labels (9.29%)**, while **969 of 1,923 messages remained deferred and unresolved**. These were illustrative thresholds, not a selected deployment policy. No human review or multi-stage workflow was tested, and the scores weren’t validated probabilities of correctness.

Jev remains a promising candidate for this task, and the initial Decisions comparison doesn’t give me a reason to replace the existing baseline. Before deployment, I would define the application’s safety policy and refusal fallback, test fresh messages and examine missed harms and false alarms separately.

## Methods and sources

The [methods](https://github.com/taugr/jev-moderation-eval/blob/main/METHODS.md), prompts, [aggregate results](https://github.com/taugr/jev-moderation-eval/blob/main/RESULTS.md) and analysis code for the original comparisons are available in the [experiment repository](https://github.com/taugr/jev-moderation-eval), along with [verification code](https://github.com/taugr/jev-moderation-eval/blob/main/verify.py). The Decisions follow-up uses the completed 7 October experiment and its offline refusal and latency checks. OpenAI documents the endpoint in its [Decisions guide](https://developers.openai.com/api/docs/guides/decisions) and [API reference](https://developers.openai.com/api/reference/resources/decisions/methods/create).
