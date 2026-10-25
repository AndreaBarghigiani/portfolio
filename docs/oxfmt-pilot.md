# Oxfmt pilot

The project uses Oxfmt for formatting. Run commands from the repository root
with pnpm:

```sh
pnpm install --frozen-lockfile
pnpm format
pnpm format:check
```

Oxfmt and `@astrojs/compiler-rs` are pinned in `package.json`. They require
Node.js 22.12 or later. The Astro formatter is opt-in and needs the local
compiler package; do not install a global or latest formatter. The project uses
Astro's default `compressHTML: true`, so `.oxfmtrc.json` sets
`astro.compressHTML` to `"html"` as well as enabling Astro shorthand. This
keeps formatter whitespace decisions aligned with Astro's compiler. The general
`htmlWhitespaceSensitivity` option does not control Astro formatting.

## Scope and formatting policy

The common formatter scripts use the same root configuration. Formatting
excludes `.agent-workflows/`, `.agents/`, `.codex/`, generated `.astro/`,
`.vercel/` and `dist/` output, `node_modules/`, and files ending in `.md`,
`.mdx`, or `.yaml`. These exclusions apply to directory traversal and explicit
file requests. `pnpm-lock.yaml` is always ignored by Oxfmt. `.yml` files remain
in scope, matching the previous ignore rules. Keep authoring files excluded;
formatting MDX fixtures belongs in an isolated scratch copy.

The previous MDX embedded-formatting setting remains as an Oxfmt override, but
production MDX files remain excluded. Oxfmt does not document Tailwind sorting
for MDX, so this pilot makes no claim about MDX class sorting. Import sorting
and package-key sorting are explicitly disabled. Tailwind v4 sorting uses
`src/styles/global.css`; class ordering may change while preserving the same
class set. Static classes in `class:list` and dynamic template expressions were
left untouched by the candidate; dynamic constructs are not guaranteed to sort.
Oxfmt uses its bundled Prettier path for Astro and MDX; removing the direct
Prettier dependencies does not remove that internal implementation.

## Zed

Install the Astro extension in Zed, then install project dependencies with the
frozen lockfile before opening files. Shared `.zed/settings.json` selects the
external command `pnpm exec oxfmt --stdin-filepath={buffer_path}` for Astro,
JavaScript, TypeScript, TSX, CSS, JSON/JSONC, and YAML and enables format-on-save
for those languages. This sends the buffer through stdin and resolves Oxfmt
from the project's pinned package. Markdown and MDX use no formatter and have
format-on-save disabled. The settings do not disable Astro, TypeScript, CSS, or
Tailwind diagnostic providers, and they add no save-time code actions. The Oxc
Zed extension is not required for formatting; it also provides Oxlint, which
this pilot does not adopt. Do not add personal machine paths to the shared
settings.

Owner checks still required before treating the pilot as verified:

- Record Zed, Astro extension, and Oxc extension versions and logs proving the
  local formatter/version and runtime were selected.
- Save intentionally misformatted Astro, TS, CSS, and JSON twice; compare the
  result with CLI output and check for oscillation, competing formatters,
  save-time actions, and noticeable delay.
- Save ignored Markdown/MDX/YAML files and verify they are unchanged. Test MDX
  formatting separately in a scratch fixture with embedded formatting off.
- Introduce and resolve Astro frontmatter and TypeScript diagnostics, check CSS
  and Tailwind diagnostics/completions, and confirm invalid Astro input fails
  without damaging the editor buffer.
- Restart Zed and repeat a save; inspect a whitespace-sensitive page and restore
  all scratch edits.

## Compatibility evidence

The isolated gate used Oxfmt 0.74.0, `@astrojs/compiler-rs` 0.5.2, Astro
5.17.1, Node.js 24.22.0, pnpm 10.24.0, and Linux x86_64. Oxfmt formatted and
checked the project, the production build passed, and a full second formatting
pass changed zero bytes. Across all 64 generated HTML pages, footer element
trees, text, attributes, and normalized class sets matched the Prettier build.
Oxfmt reordered Tailwind class tokens and adjusted whitespace between inline
markup, so raw HTML byte hashes differ; the comparison confirmed those rendered
footer changes are whitespace/class-order only.

The candidate's first ordinary dependency installation failed in Sharp's
install script because it attempted a system-libvips source build. The
repository README documents `SHARP_IGNORE_GLOBAL_LIBVIPS=1` for this machine.
A clean `SHARP_IGNORE_GLOBAL_LIBVIPS=1 pnpm install --frozen-lockfile` then
completed with install scripts enabled in a fresh isolated copy, and
`pnpm format:check` passed there.

The initial Prettier `pnpm format:check` baseline failed only on
`src/styles/global.css`; the baseline Astro production build passed. Oxfmt's
read-only check passed after the candidate formatting pass. A badly formatted
valid TypeScript fixture failed `--check` and passed after formatting; malformed
TypeScript and Astro fixtures returned errors and retained their contents. The
valid TypeScript check was read-only. Ignored MDX explicit-path and MDX/YAML
stdin probes left bytes unchanged. Direct Oxfmt LSP formatting returned no edits
for ignored MDX and `.yaml`; it returned edits for an in-scope `.yml` document.
An isolated MDX fixture preserved its frontmatter, import/export, JSX and fenced
code with embedded formatting off; MDX was not Tailwind-sorted. Real Zed checks
remain pending and must not be inferred from CLI/LSP results.

## Oxlint evaluation (separate from formatter adoption)

Oxlint is not adopted by this pilot: no dependency, config, script, save action,
or CI check was added. A one-off Oxlint 1.89.0 run on the project tree analyzed
41 files with 96 default rules and reported zero diagnostics. Current Oxlint
documentation says Astro support analyzes `<script>` blocks; it does not
establish full Astro-template or MDX coverage. This project has no configured
lint tool, so there is no existing lint diagnostic overlap to compare. The
one-off default run does not establish type-aware coverage or baseline noise
for additional categories.

If linting is considered separately, start with Oxlint's default correctness
rules and review suspicious rules individually. Keep style and restriction
categories opt-in until the project defines a lint policy. Type-aware rules
require the separate `oxlint-tsgolint` dependency; decide that independently
after reviewing type-check coverage and TypeScript 7 compatibility. Do not
enable automatic fixes or save actions without a separate reviewed decision.
