---
title: 'How to create a self signed RSA certificate with OpenSSL'
description: 'Reference of commands to create a self signed RSA certificate with OpenSSL'
date: 2018-08-10
tags: ['OpenSSL']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-08-10-creating-self-signed-certificate-openssl/'
archivePath: '2018-08-10-creating-self-signed-certificate-openssl'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-08-10-creating-self-signed-certificate-openssl/](https://tomauger.gitlab.io/posts/2018-08-10-creating-self-signed-certificate-openssl/).

Reference of commands to create a self signed RSA certificate with OpenSSL

To create a certificate with private key:

```sh
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```

Print out the certificate meta data:

```sh
openssl x509 -text -noout -in certificate.pem
```

Generate a P12 with the certificate and key:

```sh
openssl pkcs12 -inkey key.pem -in certificate.pem -export -out certificate.p12
```

Validate the P12:

```sh
openssl pkcs12 -in certificate.p12 -noout -info
```

## References

- [IBM Knowledge base: Creating a self signed certificate](https://www.ibm.com/support/knowledgecenter/en/SSWHYP_4.0.0/com.ibm.apimgmt.cmc.doc/task_apionprem_gernerate_self_signed_openSSL.html)
