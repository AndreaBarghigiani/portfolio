import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://cupofcraft.dev',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), sitemap(), mdx()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
