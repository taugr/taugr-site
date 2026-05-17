---
title: 'How to set up signing commits and tags with git on Windows'
description: 'How to create a GPG key, configure git to use it, and how to set up GitHub and GitLab so your commits appear as verified.'
date: 2018-06-29
tags: ['git']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-06-29-how-to-set-up-signing-commits-with-git/'
archivePath: '2018-06-29-how-to-set-up-signing-commits-with-git'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-06-29-how-to-set-up-signing-commits-with-git/](https://tomauger.gitlab.io/posts/2018-06-29-how-to-set-up-signing-commits-with-git/).

How to create a GPG key, configure git to use it, and how to set up GitHub and GitLab so your commits appear as `verified`.

## Install GPG4Win

The easiest way to create and manage GPG keys is with [GPG4Win](https://www.gpg4win.org/). [Download](https://www.gpg4win.org/) and install it, making sure 'Kleopatra' (the GPG key manager) is selected as a component to install.

## Create a new GPG Key

1. Open Kleopatra and click `New Key Pair`.

   ![gpg4win main window](/img/2018-06-29/gpg4winMainWindow.jpg)

1. Select `Create a personal OpenPGP key pair`
1. Enter your name and email address into the fields. If you want to verify your commits on GitHub or GitLab, make sure to use the same email address as the one on your account.
1. Optionally click `Advanced Settings` and select a different key type from the list (the default is RSA 2048 bit). You can also configure an expiry date (by default there is none).
1. Click `Next`, and then click `Create Key Pair`. Once your keys have been generated you can back them up to a secure location.

## Configure Git with your GPG key

1. Open PowerShell (or a command prompt) and list your GPG keys by running:

   ```sh
   gpg --list-secret-keys --keyid-format LONG
   ```

1. Copy the GPG key ID of the key you want to use. In the example blow the ID is `45BD3C089AD50FDE`.

   ![gpg4win list keys](/img/2018-06-29/listkeys.jpg)

1. To configure git to use this key run:

   ```sh
   git config --global user.signingkey 45BD3C089AD50FDE
   ```

1. To check your git config settings run:

   ```sh
   git config --global --list
   ```

Sometimes git has trouble finding GPG. To fix this find the location of `gpg.exe`, e.g. by running `where gpg.exe`. The default location is `C:\Program Files (x86)\GnuPG\bin\gpg.exe`. Then configure git by running:

```sh
git config --global gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"
```

## Signing Commits

### Sign a single commit

To sign a single commit append the `-S` parameter to the normal command:

```sh
git commit -S -m "my commit"
```

You will be prompted for the password for your GPG key. By default this will be cached for 10 minutes, but this is [configurable](#increase-how-long-gpg-key-password-is-cached).

### Sign all commits by default

To configure git to sign all commits by default for a local repository run:

```sh
git config commit.gpgsign true
```

Or to configure globally run:

```sh
git config --global commit.gpgsign true
```

### Viewing signed commits

To see the details of a signed commits in the git log run:

```sh
git log --show-signature
```

### Verify signed commits

To verify a commit run:

```sh
git verify-commit <commit_hash>
```

## Signing Tags

To sign a tag include the `-s` (note lowercase this time!) parameter to the normal command:

```sh
git tag -s v1.0 -m "my signed release tag"
```

To verify a tag run:

```sh
git verify-tag <tag_name>
```

## Increase how long GPG Key password is cached

By default the password for your GPG key is cached for 10 minutes. To configure this, open Kleopatra, on the menu bar click `Settings > Configure Kleopatra`. On the left hand menu select `GnuPG System` and then click the `Private Keys` tab. In the `Options controlling the security` subsection change the `Expire cached PINS after N seconds` setting to a more appropriate value (e.g. 10368000 for 120 days).

![adjust pin timeout](/img/2018-06-29/adjustPINTimeout.jpg)

Also make sure that the `Do not use the PIN cache when signing` setting is left unchecked, otherwise caching won't occur at all when signing commits.

_Update 12 May 2019_

After a recent update of Gpg4Win it may not be possible to configure a long timeout via Kleopatra. To modify it, open the gpg configuration file `C:\Users\<username>\AppData\Roaming\gnupg\gpg-agent.conf` and add/modify the settings to the following:

```txt
default-cache-ttl 10368000
max-cache-ttl 10368000
```

Save the config file, then reload it by running:

```cmd
gpgconf.exe --reload gpg-agent
```

To verify that the settings have been applied run:

```cmd
gpgconf.exe --list-options gpg-agent
```

## Configure GitHub

To make commits appear as `verified` in GitHub, first make sure that the signing certificate set up with git has the same email address as your GitHub account.

1. Open Kleopatra, right click on your GPG certificate and select `Details`. In the details window click `Export...`. Copy the exported public key to the clipboard.

   ![gpg4win export key](/img/2018-06-29/exportkey.jpg)

2. In GitHub go to your profile settings, then click `SSH and GPG Keys` on the left hand menu.
3. Click `New GPG key`, paste your key in and click `Add GPG key`.

   ![GitHub add gpg key](/img/2018-06-29/githubaddgpgkey.jpg)

Any signed commits will now appear as `verified`.

## Configure GitLab

To make commits appear as `verified` in GitLab, first make sure that the signing certificate set up with git has the same email address as your GitLab account.

1. Open Kleopatra, right click on your GPG certificate and select `Details`. In the details window click `Export...`. Copy the exported public key to the clipboard.

   ![gpg4win export key](/img/2018-06-29/exportkey.jpg)

1. In GitLab go to your profile settings, then click `GPG Keys` on the left hand menu.
1. Paste your public key into the text box and click `Add Key`.

   ![GitLab add gpg key](/img/2018-06-29/gitlabaddgpgkey.jpg)

Any signed commits will now appear as `verified`.

## References

- [GPG4Win](https://www.gpg4win.org/)
- [Telling git about your GPG key (GitHub)](https://help.github.com/articles/telling-git-about-your-gpg-key/)
- [How to sign commits (GitHub)](https://help.github.com/articles/signing-commits-using-gpg/)
- [How to sign tags (GitHub)](https://help.github.com/articles/signing-tags-using-gpg/)
