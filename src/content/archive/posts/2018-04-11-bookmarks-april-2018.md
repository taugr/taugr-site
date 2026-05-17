---
title: 'Bookmarks - April 2018'
description: 'Public DNS resolvers, WSL, and how to make colors more legible in the Windows CMD.'
date: 2018-04-11
tags: ['bookmarks']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-04-11-bookmarks-april-2018/'
archivePath: '2018-04-11-bookmarks-april-2018'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-04-11-bookmarks-april-2018/](https://tomauger.gitlab.io/posts/2018-04-11-bookmarks-april-2018/).

Public DNS resolvers, WSL, and how to make colors more legible in the Windows CMD.

## 1.1.1.1

Despite being launched on April 1st, this was no April fools joke. Cloudflare made their own public DNS freely available. It's fast, privacy focussed (no logging) and supports DNS over HTTPS, and DNS over TLS.

- Check out <a href="https://1.1.1.1"/>https://1.1.1.1</a>
- See the [developer docs](https://developers.cloudflare.com/1.1.1.1/dns-over-https/) for info on setting up DNS over TLS and DNS over HTTPS.
- See [this guide](https://blog.cloudflare.com/dns-over-tls-for-openwrt/) for instructions on setting up DNS over TLS using unbound on OpenWRT.

## 9.9.9.9

Another privacy oriented public DNS server, this one sponsored by IBM. Currently it doesn't support DNS over HTTPS or DNS over TLS, so is trumped by 1.1.1.1, but worth using as a secondary server.

- Check out <a href="https://www.quad9.net/">https://www.quad9.net/</a>

## Debian and Kali come to WSL

Debian and Kali linux are now available as flavours of the Windows Subsystem for Linux. Download them from the Windows Store.

- [Kali available for WSL](https://blogs.msdn.microsoft.com/commandline/2018/03/05/kali-linux-for-wsl/)
- [Debian available for WSL](https://blogs.msdn.microsoft.com/commandline/2018/03/06/debian-gnulinux-for-wsl-now-available-in-the-windows-store/)

## Colortool for Windows CMD

If you've used the Windows Subsystem for Linux (WSL), one of the first things you'll notice is the unreadable color contrasts. Thankfully there's a tool that can adjust the color scheme to more legible hues.

- [Colortool](https://blogs.msdn.microsoft.com/commandline/2017/08/11/introducing-the-windows-console-colortool/) comes with some preset color schemes, including: campbell - a more readable dark scheme, solarized dark and solarized light.

<style type="text/css">
figure img {
    width: 480px;
}
figcaption {
    font-size: medium;
    font-style: italic; 
    margin-left: 5px;
    margin-top: 5px
}
</style>

<figure>
<img src="/img/2018-04-12/before.jpg" alt="WSL before" />
<figcaption>Standard console colors</figcaption>
</figure>
<figure>
<img src="/img/2018-04-12/after.jpg" alt="WSL after" />
<figcaption>Campbell color scheme</figcaption>
</figure>
