import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import solidJs from '@astrojs/solid-js';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), solidJs()],

  // Security integration prevents Cross-Site Request Forgery
  security: {
        checkOrigin: true
    },

  adapter: cloudflare()
});