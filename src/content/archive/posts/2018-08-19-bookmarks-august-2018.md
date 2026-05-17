---
title: 'Bookmarks - August 2018'
description: 'The Orange Juice Test, database scaling techniques, and the flux design pattern.'
date: 2018-08-19
tags: ['bookmarks']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-08-19-bookmarks-august-2018/'
archivePath: '2018-08-19-bookmarks-august-2018'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-08-19-bookmarks-august-2018/](https://tomauger.gitlab.io/posts/2018-08-19-bookmarks-august-2018/).

The Orange Juice Test, database scaling techniques, and the flux design pattern.

## The Orange Juice Test

How should one decide which company/person to employ? The Orange Juice Test is a method of determining whether the person/company you are talking to is competent enough to do the job:

- [The Orange Juice Test (Inside Intercom)](https://www.intercom.com/blog/the-orange-juice-test/)
- [The Orange Juice Test (mysticMundane)](https://mysticmundane.blogspot.com/2012/05/orange-juice-test-will-you-pass-it.html)

## Lessons Learned from Scaling a Team

How should you employ people when growing a startup? What mistakes should you avoid? The five dysfunctions of a team. A though provoking article on management:

- [Lessons learned from scaling a team (Inside Intercom)](https://www.intercom.com/blog/lessons-learned-from-scaling-a-team/)

## Glances

This is a system monitoring tool for Linux that provides many more features than top and htop. Great video tutorial here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/E3Ioopzt8ko?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Sharding Databases

This is a technique for storing data in databases when the quantity of data involved becomes extremely large. Vertical sharding involves storing different tables in separate databases. Horizontal sharding involves storing rows of the same database table on different nodes. This article explains the techniques and some of the technical challenges (e.g. continuous hashing):

- [How Sharding Works](https://medium.com/@jeeyoungk/how-sharding-works-b4dec46b3f6)

## Cost of a Join

An investigation on the performance deficits of doing joins in a database. Traditionally joins are avoided when storing large amounts of data because they are deemed to be too expensive. The article suggests joins may not be as expensive as most people believe:

- [Cost of a join](https://www.brianlikespostgres.com/cost-of-a-join.html)

## Myths about `/dev/urandom`

How should you generate random numbers on a Linux machine? This article suggests `/dev/urandom` might be the best way:

- [Myths about /dev/urandom](https://www.2uo.de/myths-about-urandom)

## Flux

This is the software design pattern used in React and designed by Facebook. The idea centers around one way data flow. This is key to understanding how React works:

- [Flux examples](https://github.com/facebook/flux/tree/master/examples)
