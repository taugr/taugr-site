---
title: 'Aliases in bash'
description: 'How to set and unset an alias in bash'
date: 2018-07-26
tags: ['linux']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-07-26-bash-alias/'
archivePath: '2018-07-26-bash-alias'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-07-26-bash-alias/](https://tomauger.gitlab.io/posts/2018-07-26-bash-alias/).

How to set and unset an alias in bash

## 1. Listing aliases

To list the currently set aliases use the `alias` command. On Ubuntu this prints something similar to:

```sh
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'
```

As we can see by default there are already some useful aliases set:

- `l` - list [`-C` columns, and `-F` append indicator (one of */=>@|) to entries]
- `la` - list [almost] all
- `ll` - list long [`-a` all and `-F` append indicator]

## 2. Setting your own alias

As an example lets create an alias `lh` for the command `ls -lh`, that is the list command with the 'long' and 'human-readable' parameters. To do this run:

```sh
alias lh=`ls -lh`
```

The alias will exist for the lifetime of the current terminal session.

## 3. Setting an alias permanently

To create a permanent alias modify your `.bashrc` file (located in your home directory) and append the command to set your custom alias.

## 4. Unset an alias

To unset an alias use the `unalias` command. To unset the alias we created in section 2 run:

```sh
unalias lh
```
