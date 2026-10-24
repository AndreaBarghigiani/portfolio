# Andrea Barghigiani (aka cupofcraft) portfolio

Hi there 👋

I'm Andrea Barghigiani, and this is my portfolio (finally!) that you can find at [cupofcraft.dev](https://cupofcraft.dev).

Inside this portfolio, you can find:

- My resume
- My writing
- My projects
- My contact information

### Adding a project

Add a Markdown or MDX file to `src/content/projects/`. Its frontmatter requires a
`title`, `summary`, and non-negative `order`; `featured` and `draft` default to
`false`. Published projects get a page at `/projects/<filename>/`. Featured,
published projects also appear on the homepage in `order` sequence. Put the
project description and your contribution in the file body.

Optional `logo` and `cover` values use `{ src, alt }`, with `src` pointing to a
local image and `alt` describing it meaningfully. Optional `website` and
`github` links must be valid HTTP(S) URLs. `media` can contain image entries
using `{ type: image, src, alt }` or videos using `{ type: video, src, title,
width, height, transcript }`; video sources may be local public paths or
HTTP(S) URLs. Video captions can be added with a `captions` object containing
`src`, `label`, and `srclang`. No repository URL is required to publish a
project.

I've build this because I wanted to have my own space on the Internet, after years writing italian content on [SkillsAndMore](https://skillsandmore.org) I thought it was a good idea to bring my writings in english to spread my experience and knowledge with the world.

Consider this as a live project, I'm always working on it and improving it, so if you find any issue or have any suggestion, please open an issue here on [GitHub](https://github.com/AndreaBarghigiani/portfolio).

### Tech Stack

- [Astro](https://astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Astro Icon](https://astro-icon.vercel.app)
- [Motion](https://motion.dev)

### Private development over Tailscale

On the Linux tower (`cupofos`), run `pnpm install --frozen-lockfile` once, then
`pnpm dev:tailscale`. Open <https://cupofos.taila38efe.ts.net:8448/> from a device
connected to the same tailnet.

Tailscale Serve proxies HTTPS port `8448` to Astro at `127.0.0.1:4322`.
The dedicated HTTPS port supports the site's root-relative navigation and assets
without a path prefix. Hot reload uses the same HTTPS endpoint. The fixed local
port fails if occupied, so Serve cannot silently point at the wrong Astro port.
Ordinary `pnpm dev` remains available for local development.

If Sharp tries to compile against the tower's system libvips and installation
fails, use `SHARP_IGNORE_GLOBAL_LIBVIPS=1 pnpm install --frozen-lockfile` to use
Sharp's bundled binaries.

Check the mapping with `tailscale serve status`. Serve persists after Astro exits;
restart `pnpm dev:tailscale` to make the site available again. To remove only this
project's mapping, run `tailscale serve --https=8448 off`. Preserve other projects'
routes; do not run `tailscale serve reset`. This uses private Serve, not Funnel.

Cover and supporting image entries can include an optional `caption` for visible context. Keep meaningful image alternatives in `alt`. Video and caption-track sources accept root-relative paths or HTTP(S) URLs; videos require a transcript and dimensions and use native playback controls.
