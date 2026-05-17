---
title: 'How to encrypt a file with a password using OpenSSL'
description: 'Reference of commands to encrypt a file with a password using OpenSSL.'
date: 2018-08-17
tags: ['OpenSSL']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-08-17-encrypting-a-file-using-openssl/'
archivePath: '2018-08-17-encrypting-a-file-using-openssl'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-08-17-encrypting-a-file-using-openssl/](https://tomauger.gitlab.io/posts/2018-08-17-encrypting-a-file-using-openssl/).

Reference of commands to encrypt a file with a password using OpenSSL.

_Update 5 Aug 2020: with recent versions of openssl the `-pbkdf2` flag should be used for secure password hashing. Omit this flag if using an earlier version of openssl that doesn't support it, or even better upgrade to a version that supports it!_

## Encryption

To encrypt a file:

```sh
openssl enc -aes256 -pbkdf2 -salt -in file.txt -out file.txt.enc
```

You will be prompted to enter an encryption password. If you want to specify the password in the command use the `-pass` parameter, for example to encrypt with the password `myPassword` run:

```sh
openssl enc -aes256 -salt -pbkdf2 -in file.txt -out file.txt.enc -pass pass:myPassword
```

To list the available encryption algorithms run:

```sh
openssl list-cipher-commands
```

## Decryption

To decrypt a file:

```sh
openssl enc -aes256 -d -pbkdf2 -in file.txt.enc -out file.txt
```

You will be prompted to enter the decryption password.

To specify the password in the command use the `-pass` parameter. For example to decrypt using the password `myPassword` run:

```sh
openssl enc -aes256 -pbkdf2 -d -in file.txt.enc -out file.txt -pass pass:myPassword
```

## References

- [enc command - OpenSSL Wiki](https://wiki.openssl.org/index.php/Enc)
