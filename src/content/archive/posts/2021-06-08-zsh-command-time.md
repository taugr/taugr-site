---
title: 'Display command duration in ZSH'
description: 'Often I want to find out how long a shell command took to either benchmark it or figure out how expensive it would be to run it multiple times.'
date: 2021-06-08
tags: ['zsh']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2021-06-08-zsh-command-time/'
---

> Originally published on the old blog: [https://tomauger.gitlab.io/posts/2021-06-08-zsh-command-time/](https://tomauger.gitlab.io/posts/2021-06-08-zsh-command-time/).

Often I want to find out how long a shell command took to either benchmark it or figure out how expensive it would be to run it multiple times.

There already exists a ZSH plugin called [timer](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/timer) that does this but I wanted to change the time format and make the text color more subtle. The screenshot below shows the result:

![terminal screenshot](/img/2021-06-08/scrn.png)

To install it clone the repo [https://github.com/tom-auger/cmdtime](https://github.com/tom-auger/cmdtime) into your `~/.oh-my-zsh/custom/plugins/` directory:

```
$ cd ~/.oh-my-zsh/custom/plugins
$ git clone https://github.com/tom-auger/cmdtime
```

Then edit `~/.zshrc` and add to the list of plugins:

```
plugins=(cmdtime other_plugins)
```

Finally reload your ZSH config to apply:

```
$ source ~/.zshrc
```
