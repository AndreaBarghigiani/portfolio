# Cloudflare deployment

The portfolio targets Cloudflare Workers using the Astro 5 Cloudflare adapter.
Build with `pnpm build`; deploy `dist` with `pnpm exec wrangler deploy`.
For Workers Builds, use `pnpm build` as the build command and `pnpm exec wrangler deploy`
as the deployment command. Configure the custom domain `cupofcraft.dev` in that project before
changing DNS away from the previous deployment.

The development-only parts route executes in the Worker. The changelog, other
pages and portrait image variants are generated at build time; no Cloudflare
Images subscription is needed. `/dev/parts` must return 404 in production.

Supply `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` through the deployment
environment. Never commit token values. A WebinarBox token is reusable only if
its account scope includes the destination account and it permits Cloudflare
Workers administration. The existing WebinarBox token was verified active and deployed
this Worker on 2 November 2026; Pages access is denied. Resolve only `CLOUDFLARE_*`
through the existing Varlock bootstrap; never pass the vault bootstrap to Wrangler.
The changelog fetches public GitHub PRs during the build and refreshes on each
deployment. A failed GitHub fetch fails the production build. The optional
`GITHUB_TOKEN` is build-only and must never be exposed to browser code.

Release verification remains tracked in GitHub issue #60. Passing a local build
does not establish deployment, DNS, visual fidelity, or production image delivery.
