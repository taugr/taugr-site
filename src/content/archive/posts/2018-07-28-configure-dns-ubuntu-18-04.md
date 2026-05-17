---
title: 'How to configure DNS nameservers on Ubuntu 18.04'
description: 'On most Linux distributions you configure DNS nameservers in /etc/resolv.conf. However in recent versions of Ubuntu that changed with the introduction of Netplan.'
date: 2018-07-28
tags: ['dns', 'linux']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-07-28-configure-dns-ubuntu-18-04/'
archivePath: '2018-07-28-configure-dns-ubuntu-18-04'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-07-28-configure-dns-ubuntu-18-04/](https://tomauger.gitlab.io/posts/2018-07-28-configure-dns-ubuntu-18-04/).

On most Linux distributions you configure DNS nameservers in `/etc/resolv.conf`. However in recent versions of Ubuntu that changed with the introduction of <span style="font-style: italic !important">Netplan</span>.

`Netplan` is configured by editing YAML files located in `/etc/netplan/`. The precise name of this file will depend on your system configuration. I'm using an Ubuntu droplet on Digital Ocean, and the file is called `50-cloud-init.yaml`.

## Configure DNS nameservers

1. Open the `.yaml` configuration file in `/etc/netplan` using your favourite text editor.
1. In the `ethernets` section locate the network adapter you want to change the nameservers on (e.g. `eth0`)
1. Add a `nameservers` section and list the addresses of the DNS nameservers you want to use, as shown in the example below:

   ```yaml
   network:
     version: 2
     ethernets:
       eth0:
         nameservers:
           addresses:
             - 1.1.1.1
             - 9.9.9.9
       # additional configuration omitted
   ```

1. Save and close the Netplan configuration.
1. To test your new configuration run:

   ```sh
   sudo netplan try
   ```

   This will temporarily apply your new network configuration and automatically revert to the old one after 120 seconds. This lets you check your new configuration hasn't broken everything. If you're connected via SSH, and the connection hasn't broken, then that's a good sign. To accept the new configuration press `Enter`.

1. To check that your DNS server configuration has changed run:

   ```sh
   sudo systemd-resolve --status
   ```

   Scroll down until to find your network interface. You should see something similar to:

   ```sh
   Link 2 (eth0)
           Current Scopes: DNS
            LLMNR setting: yes
   MulticastDNS setting: no
           DNSSEC setting: no
       DNSSEC supported: no
               DNS Servers: 1.1.1.1
                            9.9.9.9
   ```

1. A more thorough way to check you're using DNS from the provider you've configured is to run a DNS query and get the IP address of the server that was used. An easy way to do this is to run the following DNS query:

   ```sh
   nslookup -type=txt resolver.dnscrypt.info
   ```

   The `txt` record will contain the IP address of the resolver that was used. For me this returned:

   ```sh
   resolver.dnscrypt.info  text = "Resolver IP: 162.158.110.213"
   ```

   A `who.is` lookup on this IP address reveals it belongs to Cloudflare, which suggests `1.1.1.1` is indeed being used to resolve DNS queries.

## References

- [https://netplan.io/](https://netplan.io/)
