// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { remarkReadingTime } from './src/plugins/reading-time.mjs';

export default defineConfig({
  site: 'https://tau.gr',
  redirects: {
    '/essays/set-up-wireguard-vpn-ubuntu-mac/':
      '/archive/posts/set-up-wireguard-vpn-ubuntu-mac/',
    '/essays/set-up-cloudflared-ubuntu-wireguard/':
      '/archive/posts/set-up-cloudflared-ubuntu-wireguard/',
    '/blog/set-up-wireguard-vpn-ubuntu-mac/':
      '/archive/posts/set-up-wireguard-vpn-ubuntu-mac/',
    '/blog/set-up-cloudflared-ubuntu-wireguard/':
      '/archive/posts/set-up-cloudflared-ubuntu-wireguard/',
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      { path: 'es', codes: ['es-ES', 'es'] },
      { path: 'hy', codes: ['hy-AM', 'hy'] },
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({ remarkPlugins: [remarkReadingTime] }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
