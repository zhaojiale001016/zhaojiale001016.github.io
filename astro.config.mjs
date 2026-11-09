import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: 'https://zhaojiale001016.github.io',
  integrations: [
    expressiveCode({
      themes: ['github-light'],
      styleOverrides: { borderRadius: '8px' },
    }),
    sitemap(),
  ],
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  markdown: {
    rehypePlugins: [
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { class: 'anchor' } }],
    ],
  },
});
