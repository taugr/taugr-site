---
title: 'How to copy a website to read offline'
description: 'How to mirror a website using wget and an open source GUI to achieve the same thing.'
date: 2018-06-23
tags: ['linux']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-06-23-how-to-copy-website-to-read-offline/'
archivePath: '2018-06-23-how-to-copy-website-to-read-offline'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-06-23-how-to-copy-website-to-read-offline/](https://tomauger.gitlab.io/posts/2018-06-23-how-to-copy-website-to-read-offline/).

How to mirror a website using `wget` and an open source GUI to achieve the same thing.

## Wget

To mirror a website using `wget` run the following:

```bash
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent https://site.example.com
```

or the shorthand version:

```bash
wget -mkEpnp https://site.example.com
```

Description of the parameters from the `wget` [man page](https://www.gnu.org/software/wget/manual/wget.html):

- `--mirror` turns on options suitable for mirroring including recursion, time-stamping, sets infinite recursion depth and keeps FTP directory listings.
- `--convert-links` converts links in the document to make them refer to the locally downloaded files.
- `--adjust-extension` will add the appropriate file extension to downloaded files if it doesn't already exist. The extension is determined by the MIME type of the downloaded file.
- `--page-requisites` causes `wget` to download all the files that are necessary to properly display a given HTML page. This includes such things as inlined images, sounds, and referenced stylesheets.
- `--no-parent` prevents `wget` from ascending to a parent directory when retrieving recursively.

## HTTrack

If you prefer a GUI based tool then take a look at [HTTrack](https://www.httrack.com/). It's open source, cross platform (the Windows version is called WinHTTrack) and comes with extra features such as pausing/resuming mirroring, updating previously downloaded mirrors, excluding certain links, and a screen for configuring lots of advanced options.

![WinHTTrack](/img/2018-06-23/winhttrack.jpg)

## References

- [`wget` man page](https://www.gnu.org/software/wget/manual/wget.html)
- [HTTrack](https://www.httrack.com/)
