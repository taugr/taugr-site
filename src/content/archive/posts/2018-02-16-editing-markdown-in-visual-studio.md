---
title: 'Editing Markdown in Visual Studio Code'
description: 'If you have Visual Studio Code then you have a built in Markdown editor ...'
date: 2018-02-16
tags: ['vscode']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-02-16-editing-markdown-in-visual-studio/'
archivePath: '2018-02-16-editing-markdown-in-visual-studio'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-02-16-editing-markdown-in-visual-studio/](https://tomauger.gitlab.io/posts/2018-02-16-editing-markdown-in-visual-studio/).

If you have Visual Studio Code then you have a built in Markdown editor ...

## What is Markdown?

Markdown is a markup language written in plain text that can be transformed to HTML. It's often used on forums and chat sites to write formatted responses. It's also the markup language of choice for README files and documentation in software projects, primarily influenced by the popularity of GitHub, who created their own version of Markdown: [GitHub Flavoured Markdown](https://guides.github.com/features/mastering-markdown/).

## Editing Markdown Files

Create a Markdown file and open it in Visual Studio Code. To do this from Powershell run:

```powershell
Out-File myMarkdown.md
code myMarkdown.md
```

To see a preview of your Markdown press `Ctrl+Shift+V`:

![show preview](/img/2018-02-16/showPreview.gif)

To edit with the preview side by side press `Ctrl+K V`. The preview will be kept in sync with the edited version:

![side by side preview](/img/2018-02-16/showPreviewSideBySide.gif)

Coupled with Zen mode - `Ctrl+K Z` (use `Esc Esc` to exit) - you have an excellent Markdown editor right in front of you - completely free!

If you need spellchecking then take a look at the [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) plugin. It works with a variety of languages, not just Markdown.

## References

- [Visual Studio Code Tips and Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_open-Markdown-preview)
