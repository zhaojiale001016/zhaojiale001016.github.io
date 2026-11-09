import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://zhaojiale001016.github.io',
  integrations: [
    expressiveCode({
      themes: ['github-light'],
      styleOverrides: { borderRadius: '8px' },
    }),
    sitemap(),
    AstroPWA({
      manifest: { injectManifest: false },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{html,js,css,webp,png,ico,svg,woff2,xml,json,wasm}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/zhaojiale001016\.github\.io\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages',
              expiration: { maxEntries: 60, maxAgeSeconds: 86400 * 7 },
            },
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'cdn', expiration: { maxEntries: 10, maxAgeSeconds: 86400 * 30 } },
          },
        ],
      },
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  markdown: {
    rehypePlugins: [
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { class: 'anchor' } }],
    ],
  },
});
