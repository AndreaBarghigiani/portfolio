import type { APIRoute } from 'astro';

const SITE_FALLBACK = new URL('https://cupofcraft.dev');

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? SITE_FALLBACK;
  const lines = ['User-agent: *', 'Allow: /', `Sitemap: ${new URL('sitemap-index.xml', siteUrl)}`];

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
