---
title: 'Gradient descent can do math better than you'
description: 'AI’s mathematical breakthroughs are opening new doors to research. The field has more to gain than to fear.'
date: 2026-09-14
tags: ['AI', 'mathematics', 'research']
draft: false
editorial: true
image: '../../assets/essays/gradient-descent.png'
imageAlt: 'A green ink vortex flows into fine geometric curves and a mathematical mesh on ivory paper.'
---

If you’ve been following AI news recently, you will have seen OpenAI’s announcement of a claimed solution to the Navier-Stokes existence and smoothness problem, one of the Millennium Prize Problems. The equations describe how fluids move, but whether their solutions can break down even when the motion starts smoothly, has been a longstanding question. OpenAI says its model (an internal one not released publicly) has constructed a case where this happens under a smooth external force, and has published both a written argument and a formalisation in Lean. [\[1\]](https://openai.com/index/navier-stokes-solution/)

The announcement has prompted considerable debate about the impact of AI on mathematical research. A declaration signed by 25 Fields medallists argues that the pursuit of mathematical breakthroughs through AI benchmarks is becoming disconnected from the purpose of mathematics. As the letter puts it, “solving problems is only a tool and proxy for achieving the primary goal of conceptual understanding and insight”. It also raises concerns about attribution, rushed publication, and the development of future researchers. [\[2\]](https://mathandai.org/)

There is much here that I agree with. Mathematics is about understanding the structures and relationships that make a result true, and a proof is valuable partly because of the ideas it introduces along the way. However, I don’t see AI’s growing ability to produce these results as a threat to mathematics. If it can uncover things that were previously beyond our reach, we have an opportunity to develop our understanding further. That includes finding new directions for research, making better use of existing work, and using AI itself to help explain what we discover.

## What a proof reveals

Consider what makes a mathematical proof interesting to read. We may know the conclusion before we start, but its beauty often lies in the twists of logic and the way apparently unrelated ideas come together. Following the arguments from first principles through to the conclusion gives us the understanding of why the theorem is true. A different proof of the same theorem can therefore be valuable and insightful, even when the result has already been established.

The declaration worries that rapidly producing answers could damage fertile areas of research. [\[2\]](https://mathandai.org/) Companies with large budgets and benchmarks to beat could resolve problems around which researchers have built their work. I don’t think this amounts to flattening an area of research. Resolving a conjecture does not necessarily exhaust the mathematics surrounding it, and the methods used may create new opportunities.

Andrew Wiles’s proof of Fermat’s Last Theorem illustrates this. Its significance extended far beyond settling a famous conjecture. Building on earlier work, Wiles proved a crucial case of a proposed connection between elliptic curves, and modular forms. His methods, developed with Richard Taylor, enabled further advances including the eventual proof of the full modularity theorem. [\[7\]](https://abelprize.no/sites/default/files/2021-04/citation_en_2016_A.Wiles_.pdf) Solving Fermat’s Last Theorem opened up research through the ideas that made its solution possible.

<blockquote class="pull-quote">
  <p><em>“Resolving a conjecture does not necessarily exhaust the mathematics surrounding it, and the methods used may create new opportunities.”</em></p>
</blockquote>

An AI proof won’t necessarily introduce comparably powerful ideas. But neither should we assume that an automated solution leaves nothing worth investigating. We can study its intermediate results, ask where its methods apply, and seek a clearer explanation. The research value depends on what we can learn from the proof, even if the company producing it was primarily interested in a benchmark.

## Finding worthwhile problems

Suppose an AI finds a counterexample to a conjecture that seemed intuitively right. Investigating the conditions under which it works could expose a missing assumption, suggest a revised conjecture or reveal a connection to another problem. AI can guide researchers towards these questions, including in areas that have received little attention.

Famous problems can inspire valuable work, as Wiles’s example shows. However, their reputation also draws researchers towards the same targets, and I suspect this accounts for considerable duplicated effort. Fame alone doesn’t establish a problem’s research value. AI can help us explore more broadly and identify worthwhile questions before they acquire that reputation.

<blockquote class="pull-quote">
  <p><em>“Fame alone doesn’t establish a problem’s research value.”</em></p>
</blockquote>

It could also help avoid duplicating work that has already been completed. I remember one of my mathematics supervisors expressing mild frustration that several theorems he had developed and believed to be novel had already been proved by Dedekind over a century earlier. Rediscovering something can be instructive, but knowing about the original work sooner would have allowed him to build on it. Searching across fields, unfamiliar notation and generations of publications is a substantial task.

There is already evidence that AI can help. In a study of 700 open problems in an Erdős problems database, researchers using Gemini identified existing solutions in the literature for eight of them. The authors also highlighted the risk of AI reproducing previous work without recognising it. [\[3\]](https://arxiv.org/abs/2601.22401) Its findings need checking, but connecting a problem to an overlooked result can save time and help cross-polinate ideas from different areas of mathematics.

## Explaining the mathematics

Finding and checking a result is only part of the process. Formal proof systems such as Lean establish that a formally stated conclusion follows from its definitions and assumptions, allowing us to check an argument without relying on the AI that produced it. We still need to ensure that the formal statement represents the intended problem, since the resulting proof may be difficult for a human to follow. Verification gives us a firmer basis for investigating the result, but it doesn’t automatically provide a useful explanation. [\[4\]](https://lean-lang.org/theorem_proving_in_lean4/Introduction/)

But why should AI’s contribution stop there? I see no fundamental reason why it cannot help explain mathematics in ways humans can understand too. Given a long proof, we might ask it to identify where a particular assumption is used and examine what happens if that assumption is removed. It could construct examples that make an unfamiliar definition easier to understand, or investigate a simpler argument. Its suggestions would require scrutiny, but these are concrete ways to develop understanding, and producing a useful explanation is itself a worthwhile goal for AI research.

We already have examples of this ability. In July 2025, an advanced version of Gemini Deep Think reached gold-medal standard at the International Mathematical Olympiad, solving five of its six problems. Its proofs were written in natural language, and IMO president Gregor Dolinar reported that graders found them “clear, precise and most of them easy to follow”. [\[5\]](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/) Just over a year separates that milestone from OpenAI’s proof of Navier-Stokes. Competition mathematics and frontier research have different demands, but the pace of progress gives us little reason to treat current limitations as permanent. I expect AI’s ability to explain difficult mathematics to improve faster than many people anticipate.

## The role of universities

Even if AI performs much of the discovery and becomes excellent at explaining the results, universities will still have an essential role. Their purpose includes helping people understand ideas, and to apply them and formulate questions of their own. We continue to teach theorems long after their proofs are known because each student still has to develop an understanding of the argument for themselves. A good explanation helps them do that - it does not remove the need to learn the theorem.

There’s a quote I reflect on frequently that captures this distinction: “_you can outsource your thinking but you cannot outsource your understanding_”. [\[6\]](https://x.com/karpathy/status/2049907410303865030) AI can carry out parts of the reasoning and explain what it has done, but having access to an answer doesn’t mean we understand it. This is equally true when the answer comes from another person. We still need to follow the argument, question it and make the connections ourselves.

<blockquote class="pull-quote">
  <p><em>“You can outsource your thinking, but you cannot outsource your understanding.”</em>  <a href="https://x.com/karpathy/status/2049907410303865030">[6]</a> </p>
</blockquote>

The concern about how mathematical research will be supported deserves attention. The declaration itself recognises that AI could enhance mathematical understanding. [\[2\]](https://mathandai.org/) If companies focus on announcing results and leave the explanation to an already stretched academic community, useful work may be neglected. Students also need opportunities to develop their own reasoning. Universities, educational organizations, and AI companies should give greater attention to explanation and teaching, and develop tools that support both.

I see AI as another tool for exploring mathematics. It can reveal surprising results and overlooked connections, while creating opportunities to deepen understanding, and improve how mathematics is taught. These are central to the subject, and AI gives us more ways to pursue them.

<aside class="article-endnote" aria-labelledby="title-note-label">
  <p><strong id="title-note-label">Note on the title:</strong> Karpathy predicted in 2017: ‘Gradient descent can write code better than you. I’m sorry.’ <a href="https://twitter.com/karpathy/status/893576281375219712">[8]</a> The analogous prophecy for mathematics is beginning to be realized.</p>
</aside>

## References

[\[1\] OpenAI - On the Navier–Stokes Millennium Prize Problem.](https://openai.com/index/navier-stokes-solution/)

[\[2\] Math and AI - A Severe Misalignment of AI in Mathematics.](https://mathandai.org/)

[\[3\] Feng et al. - Semi-Autonomous Mathematics Discovery with Gemini: A Case Study on the Erdős Problems.](https://arxiv.org/abs/2601.22401)

[\[4\] Theorem Proving in Lean 4 - Introduction.](https://lean-lang.org/theorem_proving_in_lean4/Introduction/)

[\[5\] Google DeepMind - Gemini Deep Think achieves IMO gold-medal standard.](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)

[\[6\] Andrej Karpathy - post crediting @yacineMTB.](https://x.com/karpathy/status/2049907410303865030)

[\[7\] The Abel Prize - Andrew Wiles: 2016 prize citation.](https://abelprize.no/sites/default/files/2021-04/citation_en_2016_A.Wiles_.pdf)

[\[8\] Andrej Karpathy - “Gradient descent can write code better than you.”](https://twitter.com/karpathy/status/893576281375219712)
