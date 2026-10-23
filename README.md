# Andrea Barghigiani (aka cupofcraft) portfolio

Hi there 👋

I'm Andrea Barghigiani, and this is my portfolio (finally!) that you can find at [cupofcraft.dev](https://cupofcraft.dev).

Inside this portfolio, you can find:

- My resume
- My writing
- My projects
- My contact information

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
