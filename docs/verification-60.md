# Issue 60 verification — 2 November 2026

Target: https://cupofcraft-portfolio.cupofcraft.workers.dev
Final deployed version: `7e32933e-ad8a-4c69-b484-0d47786bdaf5`.
Base revision: `fb39901`, plus the current Cloudflare migration working tree.
DNS has not been changed. This is partial evidence, not closure approval.

## Passed

- Production build, lint and repository formatting validation passed. Two
  independent focused reviews also executed these checks successfully.
- Browser measurements on home, posts archive, article
  `/posts/dont-waste-tokens-with-agents/`, course `/notes/master-mcp/`, project
  `/projects/careercrafting/`, and changelog at 320, 390, 1024, 1440, 1920 and
  2560px: document width equals viewport width, one h1, no broken images.
  The matrix preceded the final static-changelog fix; the final changelog was
  separately checked at 2560px.
- Live canonical on `/posts/page/2/` is
  `https://cupofcraft.dev/posts/page/2/`; the URL appears in `/sitemap-0.xml`.
- `/dev/parts` and `/_worker.js/index.js` return 404. Main archives, home,
  robots.txt, sitemap and portrait return 200.
- Portrait has 320/480/640w sources and explicit dimensions. Browser loaded it
  at mobile and desktop sizes. Lighthouse measured cumulative layout shift 0.
- Lighthouse mobile home: performance 99, accessibility 100, best practices
  100; FCP 1.2s, LCP 1.8s. This is one run, not a guarantee across devices.
- Computed rendered text/background contrast sampled on home, article, course,
  project and changelog: minimum 5.22:1. Home paper labels measured 5.55:1.
  This sampled default states; it does not establish all-state compliance.
- Home inspected across desktop and mobile scroll positions: writing, About,
  experience, contact and footer render without clipping. The initial desktop
  portrait snapshot preceded image loading; a subsequent snapshot showed it.
- Wide-screen top sections inspected at 1920 and 2560px on archive, article,
  course, project and changelog; no sheet-edge ground seam observed there.
  Full-page wide-screen state coverage is still incomplete.
- Mobile home: 35 real Tab events traversed hero, project/writing rows,
  experience controls and contact links with focused element rectangles in the
  viewport. Writing click opens, Escape closes. Pointer opens a Highlights
  disclosure. Existing owner reduced-motion passes remain valid.
- Static changelog now contains 48 PR links, with no GitHub error or developer
  token warning. Show-more reveals 42, announces “42 more pull requests shown”,
  and moves focus to the first newly revealed PR. PR bodies are absent.
- Shared posts archive standfirst removes the duplicated literal.
- First lesson `/notes/master-mcp/lesson/ping/` has only NEXT → Tools.

## Still unverified — keep issue 60 open

- Complete page-by-page Paper comparison at 390/1440px, including every
  outstanding table A / section B item from issue 70. Paper was accessible;
  opening it and reading its home content is not a completed comparison.
- Full wide-screen scroll/state matrix, short-page footer grounds, hover/focus
  dimensions and contrast, header reveal and reading bar visual judgement.
- The complete desktop home keyboard pass and a fresh reduced-motion browser
  emulation were not performed; prior owner approvals were not revoked.
- `noMargin` has no authored production example to exercise. `PullQuote` has
  no authored content, and no course currently supplies `certificateUrl`.
  These need fixtures or an explicit deferral, not automatic checkmarks.
- Last-lesson single previous item and author-only-on-articles styling need
  explicit verification/acceptance.
- DNS/custom-domain production checks must follow the eventual cutover.

## Fix and deployment decision

The initial server-rendered changelog returned HTTP 200 containing a GitHub 403
error. Adding User-Agent was insufficient. The owner chose build-time generation:
GitHub fetch failure now fails a production build, and deployment refreshes the
snapshot. No runtime GitHub credential is needed. Cloudflare receives only the
filtered existing Cloudflare credentials through Varlock; no vault bootstrap is
passed to Wrangler. Independent final review found no blocking migration defects.

Public DNS still reports `curitiba`, `fortaleza`, `maceio`, and `salvador` under
`ns.porkbun.com`; the Cloudflare branding in Porkbun is not zone ownership.
