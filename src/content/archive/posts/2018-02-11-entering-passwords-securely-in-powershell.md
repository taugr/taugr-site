---
title: 'Entering passwords securely in Powershell'
description: 'How to enter passwords securely in Powershell and how to store and retrieve them in an encrypted file.'
date: 2018-02-11
tags: ['powershell']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-02-11-entering-passwords-securely-in-powershell/'
archivePath: '2018-02-11-entering-passwords-securely-in-powershell'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-02-11-entering-passwords-securely-in-powershell/](https://tomauger.gitlab.io/posts/2018-02-11-entering-passwords-securely-in-powershell/).

How to enter passwords securely in Powershell and how to store and retrieve them in an encrypted file.

## What's a SecureString?

A number of commands in Powershell require you to pass sensitive credentials such as passwords as a `SecureString`. A `SecureString` represents some plain text (a `string`) coupled with additional security oriented features:

- The raw data is obfuscated rather than stored as plain text.
- It's 'pinned' in memory, i.e. it won't get moved around or copied when the operating system is trying to optimize resources.
- When it's disposed, the memory it occupies is freed immediately.

However `SecureString` is not perfectly secure. An application consuming the `SecureString` must be able to access the raw data contained in it. Consequently other processes - including malicious ones - can access the raw content too. A `SecureString` is _not_ a securely encrypted string, rather a type of string that's careful about how it stores it's contents, and gives the application creating it additional control over it's lifespan and presence in memory.

## How do I create a SecureString?

There are a couple of ways to create a `SecureString`. The best way is to get Powershell to construct it as you type it in. In the following example `Read-Host` will prompt for a password with the custom prompt text "Enter Password", convert the input to a `SecureString` and store it in the variable `$password`:

```powershell
$password = Read-Host -AsSecureString -Prompt "Enter Password"
```

If you already have the password as plain text you can create one by doing:

```powershell
$password = ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force
```

This is useful if, for example, you have a password stored in the clipboard:

```powershell
$password = Get-Clipboard | ConvertTo-SecureString -AsPlainText -Force
```

## How do I use a SecureString?

Use any command that accepts a `SecureString` as a parameter. For example to unlock a BitLocker drive that was secured using a password run the following:

```powershell
$password = Read-Host -AsSecureString -Prompt "Enter Password"
Unlock-BitLocker -MountPoint D: -Password $password
```

## How do I dispose of a SecureString?

Disposing a `SecureString` will release the memory resources held by the `SecureString` immediately, essentially removing the sensitive information from memory. To do this call `.Dispose()` on the `SecureString` variable:

```powershell
$password = Read-Host -AsSecureString -Prompt "Enter Password"
# Use $password ...
# Dispose of the SecureString instance
$password.Dispose()
```

## How do I store credentials securely in a file?

What if we need to automate a process that requires entering credentials? We need to store the sensitive data in a secure manner. As mentioned above, `SecureString` doesn't encrypt its contents securely because consuming applications need to be able to reveal it. The command `ConvertFrom-SecureString` can encrypt a `SecureString` using the current user's Windows credentials as the encryption key:

```powershell
$password = ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force
$encryptedPassword = ConvertFrom-SecureString $password
```

The output is a long hexadecimal string like `46248b9c3a3f0f50...` which we can save to a file, or copy to the clipboard:

```powershell
# Save to a file
$encryptedPassword | Out-File "passwordFile.txt"
# Copy to the clipboard
$encryptedPassword | Set-Clipboard
```

To recreate a `SecureString` from the encrypted version we just pass the encrypted content to `ConvertTo-SecureString`:

```powershell
# Read encrypted password from a file
$password = Get-Content "passwordFile.txt" | ConvertTo-SecureString
# Read encrypted password from the clipboard
$password = Get-Clipboard | ConvertTo-SecureString
```

## Summary

- `SecureString` does not encrypt sensitive information securely, but it's better than plain text.
- Use `Read-Host -AsSecureString` or `ConvertTo-SecureString` to create `SecureString`s.
- Call `.Dispose()` on the `SecureString` instance to remove it from memory immediately.
- Use `ConvertFrom-SecureString` to encrypt a `SecureString` using the current user's credentials, and `ConvertTo-SecureString` to do the reverse.

## References

- [SecureString MSDN documentation](<https://msdn.microsoft.com/en-us/library/system.security.securestring(v=vs.110).aspx>)
- [Read-Host documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/read-host?view=powershell-6)
- [ConvertTo-SecureString documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/convertto-securestring?view=powershell-6)
- [ConvertFrom-SecureString documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/convertfrom-securestring?view=powershell-6)
