import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

const tailscaleDev = process.env.ASTRO_TAILSCALE === '1';

export default defineConfig({
  site: 'https://cupofcraft.dev',
  markdown: {
    shikiConfig: {
      transformers: [
        {
          pre(node) {
            node.properties.tabindex = 0;
            node.properties.role = 'region';
            node.properties['aria-label'] = 'Code block, scrollable';
            if (typeof node.properties.style === 'string') {
              node.properties.style = node.properties.style.replace(
                /background(?:-color)?\s*:[^;]+;?/gi,
                ''
              );
            }
          },
        },
      ],
    },
  },

  ...(tailscaleDev && {
    server: {
      host: '127.0.0.1',
      port: 4322,
      allowedHosts: ['cupofos.taila38efe.ts.net'],
    },
  }),

  vite: {
    plugins: [tailwindcss()],
    ...(tailscaleDev && {
      server: {
        strictPort: true,
        hmr: {
          protocol: 'wss',
          host: 'cupofos.taila38efe.ts.net',
          clientPort: 8448,
        },
      },
    }),
  },

  integrations: [icon(), sitemap(), mdx()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
