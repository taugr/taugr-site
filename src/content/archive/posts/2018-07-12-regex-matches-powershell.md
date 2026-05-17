---
title: 'Regex matches in PowerShell'
description: 'How to find regex matches using PowerShell'
date: 2018-07-12
tags: ['powershell']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-07-12-regex-matches-powershell/'
archivePath: '2018-07-12-regex-matches-powershell'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-07-12-regex-matches-powershell/](https://tomauger.gitlab.io/posts/2018-07-12-regex-matches-powershell/).

How to find regex matches using PowerShell

## `-match` operator

In PowerShell the `-match` operator will evaluate whether a string matches a regular expression:

```powershell
ps> "1234-56-789" -match "\d\d\d\d-\d\d-\d\d\d"
True

ps> "banana" -match "\d\d\d\d-\d\d-\d\d\d"
False
```

When you use the `-match` operator the variable `$Matches` is populated with all the matches:

```powershell
ps> "1234-56-789" -match "(\d+)-(\d+)-(\d+)"
True

ps> $Matches
Name                           Value
----                           -----
3                              789
2                              56
1                              1234
0                              1234-56-789
```

In particular if you used named matches you can retrieve the matched value by accessing a property on the `$Matches` variable with the same name:

```powershell
ps> "Tom Auger" -match "(?<first>\w+)\s(?<last>\w+)"; $Matches
Name                           Value
----                           -----
last                           Auger
first                          Tom
0                              Tom Auger

ps> $Matches.first
Tom

ps> $Matches.last
Auger
```

## Equivalent of `grep` in PowerShell

To find regular expression matches in files in the current directory use the `Select-String` commandlet:

```powershell
Select-String -Path *.* -Pattern "(?<first>\w+)\s(?<last>\w+)"
```

To search for a regular expression in files in the current directory and all subdirectories:

```powershell
Get-ChildItem . -Recurse | Select-String -Pattern "(?<first>\w+)\s(?<last>\w+)"
```

## Finding all matches

Use the `-AllMatches` switch on `Select-String` to find all pattern matches rather than just the first:

```powershell
ps> Select-String -InputObject "123-4-567-89" -Pattern "\d+" -AllMatches |
Foreach-Object { $_.Matches } |
Select-Object { $_.value }

 $_.value
----------
123
4
567
89
```

## History of `grep`

Here's an interesting video with Brian Kernighan about the history of grep.

g/re/p - global / regular expression / print

<iframe width="560" height="315" src="https://www.youtube.com/embed/NTfOnGZUZDk?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## References

- [Select-String documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/select-string?view=powershell-6)
