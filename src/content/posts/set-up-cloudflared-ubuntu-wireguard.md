---
title: 'Set up Cloudflare DNS over HTTPS on your WireGuard VPN server'
description: "Once you've set up a WireGuard VPN server, you'll also want to protect your DNS requests. One method of achieving this is to set up a DNS over HTTPS resolver on your VPN server and route your DNS traffic over the VPN..."
date: 2019-03-03
tags: ['vpn', 'dns']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2019-03-03-set-up-cloudflared-ubuntu-wireguard/'
---

Once you've set up a WireGuard VPN server, you'll also want to protect your DNS requests. One method of achieving this is to set up a DNS over HTTPS resolver on your VPN server and route your DNS traffic over the VPN tunnel.

This follows on from the last post [Set up a WireGuard VPN on Ubuntu and connect from Mac and Android](../2019-03-02-set-up-wireguard-vpn-ubuntu-mac) so check that out first if you don't already have a WireGuard VPN server set up.

Cloudflare provides a DNS over HTTPS (DoH) resolver to use with their `1.1.1.1` public DNS service. We'll install this on our WireGuard server and then configure each client to use it.

# Install the Cloudflared DoH Server

1.  [Download the Cloudflared service](https://developers.cloudflare.com/argo-tunnel/downloads/) for your Linux platform. For Ubuntu/Debian download the `.deb` package:

    ```sh
    wget https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.deb
    ```

1.  Install the package:

    ```sh
    dpkg -i cloudflared-stable-linux-amd64.deb
    ```

1.  Confirm that it installed correctly:

    ```cmd
    cloudflared --version
    cloudflared version 2019.2.1 (built 2019-02-28-0010 UTC)
    ```

1.  Configure the service to use Cloudflare's `1.1.1.1` and `1.0.0.1` resolvers:

        {{< highlight sh >}}

    mkdir -p /usr/local/etc/cloudflared
    cat << EOF > /usr/local/etc/cloudflared/config.yml
    proxy-dns: true
    proxy-dns-upstream: - https://1.1.1.1/dns-query - https://1.0.0.1/dns-query
    EOF{{< / highlight >}}

1.  Install the service:

    ```sh
    sudo cloudflared service install
    ```

1.  The service should now be running on `localhost`. Test it by querying for a DNS record:

    ```txt
    dig +short @127.0.0.1 tau.gr AAAA
    2606:4700:30::681b:9ecf
    2606:4700:30::681b:9fcf
    ```

# Configure WireGuard Server

In order to correctly route DNS requests across the VPN we need to amend some of the firewall rules created in the `PostUp` phase.

Edit your WireGuard config `/etc/wireguard/wg0.conf` and append the following to the `PostUp` and `PostDown` commands:

```ini
PostUp = <other PostUp commands>; iptables -A PREROUTING -t nat -i %i -p udp --dport 53 -j DNAT --to-destination 127.0.0.1:53; sysctl -w net.ipv4.conf.%i.route_localnet=1
PostDown = <other PostDown commands>; iptables -D PREROUTING -t nat -i %i -p udp --dport 53 -j DNAT --to-destination 127.0.0.1:53
```

The first command in `PostUp` adds a NAT rule to redirect DNS (i.e. traffic destined to port 53) to the Cloudflared server running on `127.0.0.1`. The second command enables the `route_localnet` setting on the WireGuard server's network interface. We need to enable this because by default the Linux kernel will drop packets destined to localhost, as it deems them to be 'martian packets'.

The `PostDown` command simply deletes the NAT firewall rule that was created in `PostUp`. We don't need to clear the `route_localnet` setting because it was only configured on the WireGuard interface, which gets destroyed when you shut down WireGuard.

Save the config file and restart WireGuard for the new changes to take effect:

```sh
wg-quick down wg0
wg-quick up wg0
```

# Configure WireGuard Clients

On each client edit the WireGuard config and change the DNS address to be the WireGuard internal IP address of the server. If you used the settings in the [Set up a WireGuard VPN on Ubuntu and connect from Mac and Android](../2019-03-02-set-up-wireguard-vpn-ubuntu-mac) guide then this is `10.0.0.1`:

```ini
DNS = 10.0.0.1
```

Save the config and restart your VPN connection. To verify everything's working, use Cloudflare's [Browsing experience check](https://www.cloudflare.com/ssl/encrypted-sni/).

# References

- https://developers.cloudflare.com/1.1.1.1/dns-over-https/cloudflared-proxy/
