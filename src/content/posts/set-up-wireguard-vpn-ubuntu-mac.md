---
title: 'Set up a WireGuard VPN on Ubuntu and connect from Mac and Android'
description: 'How to set up a WireGuard server on Ubuntu and set up clients on Mac and Android.'
date: 2019-03-02
tags: ['vpn']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2019-03-02-set-up-wireguard-vpn-ubuntu-mac/'
---

How to set up a WireGuard server on Ubuntu and set up clients on Mac and Android.

# About WireGuard

WireGuard is a relatively new VPN technology that according to [the website](https://www.wireguard.com/):

> is an extremely simple yet fast and modern VPN that utilizes state-of-the-art cryptography. It aims to be faster, simpler, leaner, and more useful than IPsec, while avoiding the massive headache. It intends to be considerably more performant than OpenVPN.

Bear in mind that WireGuard has not been audited and is still in development, so use it at your own risk.

Let's set one up and see if it meets expectations!

# Set up WireGuard server on Ubuntu

First get hold of a Linux VPS on a cloud provider of your choice. I use an AWS EC2 micro with Ubuntu 18.04. A Digital Ocean droplet would also be a good choice.

When setting up the firewall you will need to add an inbound rule for UDP traffic on port 51820, or whichever port you want to run the WireGuard server on. In AWS you can configure this in the security group when setting up the server.

## Install WireGuard

Once you're set up and SSH'd into your server, install WireGuard as follows:

1. Install the `software-properties-common` package so we can use `add-apt-repository`

   ```sh
   sudo apt-get install -y software-properties-common
   ```

1. Install WireGuard
   ```sh
   sudo add-apt-repository ppa:wireguard/wireguard
   sudo apt-get update
   sudo apt-get install wireguard
   ```

## Enable IP forwarding

In order to be able to access the internet once connected to the VPN server we need to enable IP forwarding. To enable it immediately run

```sh
sudo sysctl -w net.ipv4.ip_forward=1
```

And to make this change persist after reboots, edit `/etc/sysctl.conf` and uncomment the line `net.ipv4.ip_forward=1`.

## Create server config

1. First generate a public/private key pair

   ```sh
   umask 077
   wg genkey | tee privatekey | wg pubkey > publickey
   ```

1. For extra security you can also generate a pre-shared key for each client. This adds an extra layer of symmetric key encryption for post quantum resistance:

   ```sh
   wg genpsk > client1
   wg genpsk > client2
   ...
   ```

1. Create the file `/etc/wireguard/wg0.conf` and enter the following contents, replacing the placeholders with the correct values for your setup:

   ```ini
   [Interface]
   Address = <wireguard_internal_server_ip>
   PrivateKey = <server_private_key>
   ListenPort = 51820
   PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o ens5 -j MASQUERADE;
   PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o ens5 -j MASQUERADE;
   ```

   - `<wireguard_internal_server_ip>` is a private IP address for the wg0 interface. It's best to pick one on a different subnet to your LAN. If you're not sure use `10.0.0.1/32`.
   - `<server_private_key>` is the private key we generated in step 1.

   - If you chose a different port for the WireGuard server then replace `51820` with your value.
   - In the `PostUp` and `PostDown` commands replace `ens5` with the name of the network interface that has access to the internet. Yours may be called `eth0` for example.

   - The `PostUp` gets executed after the WireGuard server is started. The command specified here adds some firewall rules that will allow you to connect to the internet through the VPN server. `PostDown` gets executed when the WireGuard server is shut down and the command specified here removes the firewall rules created in `PostUp`.

1. If you're setting up the server behind NAT (e.g. if the server is on your home network behind a router) then you may want to add the additional setting:

   {{< highlight ini "linenostart=7">}}PersistentKeepalive = 25{{< / highlight >}}

   This will send an empty authenticated packet every 25 seconds to keep your firewall or NAT mapping persistent.

1. We will need to add a section to this config file for each client that will connect to the server. First we'll create the client configs and then return to add these sections.

# Set up WireGuard client on Mac

## Install and configure client config

1. Install the official WireGuard app from the App store https://itunes.apple.com/us/app/wireguard/id1451685025?mt=12.
1. Click on the wireguard tray icon and select 'Manage Tunnels'

   ![manage tunnels](/img/2019-03-02/manage_tunnels.png)

1. Create a new empty tunnel and enter the following configuration, replacing the tokens with the correct values for your setup:

   ![add tunnel](/img/2019-03-02/add_tunnel.png)

   ```ini
   [Interface]
   PrivateKey = <auto_generated>
   Address = <wireguard_internal_client_ip>
   DNS = 1.1.1.1

   [Peer]
   PublicKey = <server_public_key>
   PresharedKey = <client_server_preshared_key>
   AllowedIPs = 0.0.0.0/0, ::/0
   Endpoint = <server_public_ip_address>:51820
   ```

   - `<auto_generated>` is a private key automatically generated by the WireGuard app.

   - `<wireguard_internal_client_ip>` is the private IP address for the client's WireGuard network interface. It should be on the same subnet as `<wireguard_internal_server_ip>`. If you used `10.0.0.1/32` for the server put `10.0.0.2/32` here.

   - `<server_public_key>` is the public key for the server generated in the previous section.

   - `<client_server_preshared_key>` is the optional pre-shared key generated in the previous section.

   - `<server_public_ip_address>` is the public IP address of your server. If you used a different port, change `51820` to the value you used.

   - The DNS can be set to any provider you like. Here we're using Cloudflare's 1.1.1.1 public DNS.

   - `AllowedIPs` is the set of IP addresses to redirect down the VPN tunnel. Here we've set it to match all IP addresses, i.e. all non local traffic will get sent over the VPN. If you want to configure split tunneling you can adjust this range of IP addresses to suit your setup.

## Add client to server config

When creating the server config we said we'd need to add some extra configuration for each client. Now that we've generated the client config we are ready to add these sections.

1. Open `/etc/wireguard/wg0.conf` on the WireGuard server and append the following (repeating this block if there are multiple clients):

   ```ini
   [Peer]
   PublicKey = <client_public_key>
   PresharedKey = <client_server_preshared_key>
   AllowedIPs = <wireguard_internal_client_ip>
   ```

   - `<client_public_key>` is the client's public key.

   - `<client_server_preshared_key>` is the optional pre-shared key for this client.

   - `<wireguard_internal_client_ip>` is the private IP address for the client's WireGuard network interface. If you used `10.0.0.2/32` in the previous section then enter that here.

1. Save and close the config file.

# Start up WireGuard

Now that everything is configured it's time to start all the applications.

## Start the server

1. On the server run

   ```sh
   sudo wg-quick up wg0
   ```

   To verify that everything has started run

   ```sh
   sudo wg show
   ```

   You should see a print out of the server interface and configured clients.

1. To start WireGuard automatically on startup enable the service
   ```sh
   sudo systemctl enable wg-quick@wg0
   ```

## Connect from the client

In the WireGuard app select your tunnel in the list and check the box next to 'Status Inactive'. If all is well you should see the status change to 'Active' and some information about when the last successful handshake was.

![tunnel connected](/img/2019-03-02/connected.png)

# Set up an Android client

Install the WireGuard app from the app store https://play.google.com/store/apps/details?id=com.wireguard.android.

There are a number of ways to set up the client config. You can either create a config within the app and set up the server in the same way as setting up the Mac client, or you can create the client config on your server/Mac and generate a QR code to scan it in.

To generate a QR code you'll need to install `qrencode`. On Linux run:

```sh
sudo apt install qrencode
```

On Mac:

```sh
brew install qrencode
```

To generate the QR code from a config called `mobile.conf` run

```sh
qrencode -t ansiutf8 < mobile.conf
```

This will print out a QR code in the terminal which you can scan in.

# References

- https://www.wireguard.com/quickstart/
- https://git.zx2c4.com/WireGuard/about/src/tools/man/wg.8
- https://git.zx2c4.com/WireGuard/about/src/tools/man/wg-quick.8
- https://wiki.archlinux.org/index.php/WireGuard
