---
title: 'DNSCrypt on DD-WRT with OpenDNS'
description: 'How to set up DNSCrypt on DDWRT using the public OpenDNS resolver.'
date: 2017-12-29
tags: ['ddwrt']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2017-12-29-dnscrypt-on-ddwrt-with-opendns/'
archivePath: '2017-12-29-dnscrypt-on-ddwrt-with-opendns'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2017-12-29-dnscrypt-on-ddwrt-with-opendns/](https://tomauger.gitlab.io/posts/2017-12-29-dnscrypt-on-ddwrt-with-opendns/).

How to set up DNSCrypt on DD-WRT using the public OpenDNS resolver.

## Requirements

- A router with DD-WRT (brainslayer builds r32170 or later, or a kong build after March 2017)

## Configuration

1. Log in to the DD-WRT web interface and navigate to the Services -> Services page.
1. In the DNSMasq section check 'Enable' next to the 'DNSMasq' and 'Encrypt DNS' settings. In the drop down menu for the DNSCrypt resolver select 'Cisco OpenDNS'.

   ![Configure DNSCrypt resolver](/img/2017-12-29/img1.png)

1. Click 'Apply Settings' at the bottom of the page.
1. Next navigate to the Setup -> Basic Setup page.
1. In the 'Network Address Server Settings (DHCP)' section check the option 'Use DNSMasq for DNS'.
1. Click 'Apply Settings'.

DNSCrypt should now be setup.

## Check DNSCrypt is Working

If you're using OpenDNS then you can check DNSCrypt is enabled by querying the txt record on debug.opendns.com:

On Windows open powershell and run the following:

```powershell
nslookup -type=txt debug.opendns.com.
```

_Note: the extra '.' at the end of the domain name is required!_

On Linux run:

```bash
dig debug.opendns.com txt
```

In the output you should see a line similar to:

```bash
debug.opendns.com       text = "dnscrypt enabled (XXXXXXXXXXXXXXXX)"
```
