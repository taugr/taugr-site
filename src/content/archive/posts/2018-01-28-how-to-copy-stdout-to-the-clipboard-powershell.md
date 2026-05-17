---
title: 'How to copy stdout to the clipboard in Powershell'
description: 'Suppose you want to copy the output of a Powershell command to the clipboard. Instead of making a mess of selecting the output in the terminal and copying, just pipe the output to clip.'
date: 2018-01-28
tags: ['powershell']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-01-28-how-to-copy-stdout-to-the-clipboard-powershell/'
archivePath: '2018-01-28-how-to-copy-stdout-to-the-clipboard-powershell'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-01-28-how-to-copy-stdout-to-the-clipboard-powershell/](https://tomauger.gitlab.io/posts/2018-01-28-how-to-copy-stdout-to-the-clipboard-powershell/).

Suppose you want to copy the output of a Powershell command to the clipboard. Instead of making a mess of selecting the output in the terminal and copying, just pipe the output to `clip`.

For example to copy your path environment variable to the clipboard run:

```powershell
$Env:Path | clip
```

The same can also be achieved using `Set-Clipboard`:

```powershell
$Env:Path | Set-Clipboard
```

To read the contents of the clipboard use `Get-Clipboard`:

```powershell
$content = Get-Clipboard
```

## References

- [Get-Clipboard documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-clipboard?view=powershell-5.1)
- [Set-Clipboard documentation](https://docs.microsoft.com/en-gb/powershell/module/Microsoft.PowerShell.Management/Set-Clipboard?view=powershell-5.1)
