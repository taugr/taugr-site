---
title: 'Bookmarks - September 2018'
description: 'Parallel programming with Python, top 10 Android terminal commands, cyber security topics and more ...'
date: 2018-09-01
tags: ['bookmarks']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-09-01-bookmarks-september-2018/'
archivePath: '2018-09-01-bookmarks-september-2018'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-09-01-bookmarks-september-2018/](https://tomauger.gitlab.io/posts/2018-09-01-bookmarks-september-2018/).

Parallel programming with Python, top 10 Android terminal commands, cyber security topics and more ...

## Parallel programming with Python

Short course on how to implement parallel programming patterns (e.g. map/reduce) in Python:

[https://chryswoods.com/parallel_python/index.html](https://chryswoods.com/parallel_python/index.html)

## 10 Basic Android terminal commands you should know

Summary of 10 commands you can use with the adb program. There is one important command that I think is missing from this article which is the backup command allowing you to create an image of your phone for backup to disk.
[https://www.androidcentral.com/10-basic-terminal-commands-you-should-know?amp](https://www.androidcentral.com/10-basic-terminal-commands-you-should-know?amp)

## Stephanos Constantinou Blog

This blog is centered around PowerShell scripting. If you can get around the plethora of adverts there are some useful tips and tutorials here:

[https://www.sconstantinou.com](https://www.sconstantinou.com)

## mimikatz

This is a tool for poking around with Windows security. You can use it to extract plaintext passwords, perform pass-the-hash, pass-the-ticket or build Golden tickets (a dangerous vulnerability in Active Directory). A useful tool for PEN testing or understanding how Windows security works. The developer's blog is also well worth reading.

[https://github.com/gentilkiwi/mimikatz](https://github.com/gentilkiwi/mimikatz)

[http://blog.gentilkiwi.com/mimikatz](http://blog.gentilkiwi.com/mimikatz)

[Kerberos Golden Ticket attack](https://blog.varonis.com/kerberos-how-to-stop-golden-tickets/)

## node-portfinder

A node module for finding unused ports. It's useful for example when creating a multi instance express server.

[https://github.com/indexzero/node-portfinder](https://github.com/indexzero/node-portfinder)

## skrollr

The standard example of parallax scrolling on a web page is when two background images are layered on top of each other, and when scrolling the page one of the images translates faster than the other.

Skrollr is a library that took this to another level. Unfortunately the project has been abandoned, and the repository is archived on GitHub, but the examples are well worth looking at because they demonstrate what's possible when you take parallax scrolling to the extreme. My favourite example is tracing an SVG path when scrolling: [https://prinzhorn.github.io/skrollr/examples/path.html](https://prinzhorn.github.io/skrollr/examples/path.html).

[https://github.com/Prinzhorn/skrollr](https://github.com/Prinzhorn/skrollr)
[skrollr examples](https://github.com/Prinzhorn/skrollr/tree/master/examples)

## Cryptography based on Algebraic Coding Theory

Article about post quantum cryptography algorithms. One of the contenders is code-based cryptography, which utilizes computationally hard problems in algebraic coding theory. The article describes how the McEliece algorithm works:

[https://medium.com/coinmonks/goodbye-to-john-napier-and-hello-to-robert-mceliece-ab64d734943d?sk=64d5e55783e0d0e0b4ce7eaa716538cd](https://medium.com/coinmonks/goodbye-to-john-napier-and-hello-to-robert-mceliece-ab64d734943d?sk=64d5e55783e0d0e0b4ce7eaa716538cd)

## GitHub account takeover

Read this if you use GitHub. If you create a user/repository and subsequently delete it, then it's possible for someone else to take over the name for their own account/repository. This could be open to abuse if someone deletes a popular repository and it then gets replaced with something malicious. Someone cloning from a git URL without checking what they were pulling could lead to trouble.

[https://medium.com/@SweetRollBandit/aws-slurp-github-takeover-f8c80b13e7b5](https://medium.com/@SweetRollBandit/aws-slurp-github-takeover-f8c80b13e7b5)

## RSA 230 has been factorized!

[https://lists.gforge.inria.fr/pipermail/cado-nfs-discuss/2018-August/000926.html](https://lists.gforge.inria.fr/pipermail/cado-nfs-discuss/2018-August/000926.html)

## Launch an elevated cmd without UAC challenge

If you run Windows as an administrator user then you can launch an elevated command prompt without a UAC challenge by running the following:

```sh
msconfig -5
c
c
c
Alt+L
```

## Google Optimize now has a free tier

[https://www.blog.google/products/marketingplatform/analytics/this-is-not-a-test-google-optimize-now-free-for-everyone/](https://www.blog.google/products/marketingplatform/analytics/this-is-not-a-test-google-optimize-now-free-for-everyone/)

## Random fact

The word for how it smells after it rains is `petrichor`.

[https://www.dictionary.com/e/s/10-weather-words-you-need-to-know/?param=TcomSERP-mid4#petrichor](https://www.dictionary.com/e/s/10-weather-words-you-need-to-know/?param=TcomSERP-mid4#petrichor)

## How to create an Ed25519 SSH key

By default the `ssh-keygen` command creates a 2048 bit RSA key pair. Ed25519 is an elliptic curve cipher that offers a smaller key size for similar if not better security compared with RSA and ECDSA. To create one, run the following command and complete all the prompts:

```sh
ssh-keygen -t ed25519
```

## NPM package for creating/managing git hooks

Git hooks are custom commands that are executed when you run `git commit` or `git push` on your repository. This allows you to perform checks such as linting, running tests, or beautifying code. By running the commands automatically you can prevent bad commits and pushes without needing to remember or rely on code review. If you're writing a node.js app then there's an NPM module called [husky](https://www.npmjs.com/package/husky) allows you to define your git hooks in the `package.json` file:

[https://www.npmjs.com/package/husky](https://www.npmjs.com/package/husky)
