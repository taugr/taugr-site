---
title: 'Making WSL colors readable'
description: 'The default color scheme for the Windows Subsystem for Linux (WSL) is not the most readable. Thankfully a tool exists that can change the default color scheme to something more legible.'
date: 2018-05-30
tags: ['linux']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-05-30-wsl-readable-colors/'
archivePath: '2018-05-30-wsl-readable-colors'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-05-30-wsl-readable-colors/](https://tomauger.gitlab.io/posts/2018-05-30-wsl-readable-colors/).

The default color scheme for the Windows Subsystem for Linux (WSL) is not the most readable. Thankfully a tool exists that can change the default color scheme to something more legible.

The default color scheme:

![default color scheme](/img/2018-05-30/default.jpg)

The [Windows Console Color Tool](https://blogs.msdn.microsoft.com/commandline/2017/08/11/introducing-the-windows-console-colortool/) is a small utility for changing the cmd console colors and comes with some pre designed color schemes. You can get the latest code from the [GitHub repository](https://github.com/microsoft/console) or download the first version as a [zip file](https://github.com/Microsoft/console/releases/tag/1708.14008).

The color tool comes with a version of the dark color scheme called campbell. To change the color scheme open a cmd console in the directory containing the `colortool` executable and run:

```cmd
colortool.exe campbell
```

To set a color scheme as the default run:

```cmd
colortool.exe -d campbell
```

This is what the WSL looks like with the campbell scheme:

![default color scheme](/img/2018-05-30/campbell.jpg)

The color tool also comes with other color schemes such as solarized dark and solarized light:

```cmd
colortool.exe solarized_dark
colortool.exe solarized_light
```

## References

- [Windows Console Color Tool](https://blogs.msdn.microsoft.com/commandline/2017/08/11/introducing-the-windows-console-colortool/)
