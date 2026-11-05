import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zhaojiale001016.github.io',
  integrations: [sitemap()],
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
