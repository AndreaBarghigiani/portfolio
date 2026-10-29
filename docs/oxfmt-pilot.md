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
`src/styles/global.css`; observed literal class strings were sorted, including
strings inside Astro `class:list` arrays and literal segments of template
strings. For example, conditional literal strings in
`src/components/partials/Header.astro` changed order. The sorter can only
reason about class text it recognizes: runtime values such as `${from}` cannot
be resolved or ordered, and mixed expressions may leave those values in place.
This is observed coverage, not a guarantee for every expression shape.
Oxfmt uses its bundled Prettier path for Astro and MDX; removing the direct
Prettier dependencies does not remove that internal implementation.

## Zed

Install the Astro extension in Zed, then install project dependencies with the
frozen lockfile before opening files. Shared `.zed/settings.json` selects the
external command `pnpm exec oxfmt --stdin-filepath={buffer_path}` for Astro,
JavaScript, TypeScript, TSX, CSS, JSON/JSONC, and YAML and enables format-on-save
for those languages. This sends the buffer through stdin and resolves Oxfmt
from the project's pinned package. Markdown and MDX use no formatter and have
format-on-save disabled. The settings explicitly turn off common organize-import
and fix-all format actions for configured languages. Markdown, MDX, and YAML
also disable trailing-whitespace removal and final-newline cleanup so ignored
content (including Markdown hard breaks) is preserved on save; `.yml` retains
its configured Oxfmt formatter. Astro, TypeScript, CSS, and Tailwind diagnostic
providers remain enabled. The Oxc Zed extension is not required for formatting;
it also provides Oxlint, which is adopted separately below. Project settings
exclude Biome from Astro, JavaScript, TypeScript, and TSX language-server
selection while retaining other default servers. Oxlint's safe fixes are
available as manual code actions only. No lint fixes or import organization run
on save. Do not add personal machine paths to shared settings.

Owner checks still required before treating the pilot as verified:

- Record Zed, Astro extension, and Oxc extension versions and logs proving the
  local formatter/version and runtime were selected.
- Save intentionally misformatted Astro, TS, CSS, and JSON twice; compare the
  result with CLI output and check for oscillation, competing formatters,
  save-time actions, and noticeable delay.
- Save ignored Markdown/MDX/YAML files and verify code actions, trailing-space
  cleanup, final-newline cleanup, and all other bytes remain unchanged. Test MDX
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
pass changed zero bytes. A fresh baseline build from `f6f3d8d` and fresh final
build were compared across all 64 generated HTML pages. The comparator checked
element nesting, attributes, class token sets, normalized text, and exact text in
`pre`, `code`, `textarea`, `script`, and `style`; it normalized only class token
ordering and hashed `/_astro/` asset names. This is normalized HTML evidence, not
browser visual proof. See the task evidence directory's revision/hash manifest
and comparison record for exact provenance. Oxfmt reorders Tailwind class tokens
and inline whitespace, so raw HTML bytes and generated asset hashes differ.

The candidate's first ordinary dependency installation failed in Sharp's
install script because it attempted a system-libvips source build. The
repository README documents `SHARP_IGNORE_GLOBAL_LIBVIPS=1` for this machine.
A clean `SHARP_IGNORE_GLOBAL_LIBVIPS=1 pnpm install --frozen-lockfile` then
completed with install scripts enabled in a fresh isolated copy, and
`pnpm format:check` passed there.

The clean baseline at `f6f3d8d` had a Prettier `pnpm format:check` failure only
on `src/styles/global.css`; its Astro production build passed. This known
baseline failure is not evidence that the pilot's final check is green. Oxfmt's
read-only check passed after the candidate formatting pass. A badly formatted
valid TypeScript fixture failed `--check` and passed after formatting; malformed
TypeScript and Astro fixtures returned errors and retained their contents. The
valid TypeScript check was read-only. Ignored MDX explicit-path and MDX/YAML
stdin probes left bytes unchanged. Direct Oxfmt LSP formatting returned no edits
for ignored MDX and `.yaml`; it returned edits for an in-scope `.yml` document.
An isolated MDX fixture preserved its frontmatter, import/export, JSX and fenced
code with embedded formatting off; MDX was not Tailwind-sorted. Real Zed checks
remain pending and must not be inferred from CLI/LSP results.

## Rollback procedure and evidence

The pre-pilot baseline is `f6f3d8d`, followed by tooling commit `8bfafbf` and
mechanical formatting commit `da7d0d3`. On a branch containing this pilot,
preserve concurrent work and revert in reverse order: first revert the focused
save-safeguard/documentation fix commit(s), then `da7d0d3`, then `8bfafbf`. Do
not reset or force-update a shared branch. Reverting the tooling commit restores
the original Prettier dependencies and lockfile, scripts, formatter config and
ignore policy, project instructions, and shared Zed settings; reverting the
mechanical commit restores source formatting.

After the reverts, run `pnpm install --frozen-lockfile`, `pnpm format:check`,
and `pnpm build` on the restored baseline. Compare with `f6f3d8d`: the build
passes, while the original Prettier check fails only on
`src/styles/global.css`. Do not claim baseline formatting is green. This exact
reverse-order sequence was exercised in a disposable detached checkout; see the
task evidence directory's revision/hash manifest and command record.

## Oxlint adoption

Oxlint 1.89.0 is pinned exactly as a development dependency. The package
requires Node.js `^20.19.0 || >=22.12.0`; this project already requires Node.js
22.12 or later for Oxfmt. pnpm installs the platform package from the frozen
lockfile. CLI scripts resolve this local dependency. The current
[Oxc extension source](https://github.com/oxc-project/oxc-zed/blob/main/src/lsp.rs)
selects `node_modules/oxlint/bin/oxlint` when the root package declares Oxlint,
but also supports a latest-package download fallback. The installed extension
version and executed binary path/version have not been verified in Zed. Install
project dependencies first and confirm those details in the language-server logs;
do not treat download avoidance or editor/CLI parity as established yet. See `.oxlintrc.json` for the six explicitly enabled error-severity
correctness checks. The read-only `pnpm lint` command traverses the project;
`pnpm lint:fix` invokes Oxlint's safe fixes explicitly. Suggestions and
dangerous fixes have no project command and remain opt-in. Import sorting and
unused-import removal remain disabled because current `.astro` template usage
has not been demonstrated to be analyzed by the pinned release.

The ignore list excludes generated output (`.astro/`, `.vercel/`, `dist/`),
dependencies (`node_modules/`), Git metadata, the managed `.agent-workflows/`
submodule, agent-managed directories, and authored content (`*.md`, `*.mdx`,
`*.yaml`, `*.yml`). The CLI's supported-source discovery also leaves styles,
JSON/YAML, MDX and Markdown outside lint coverage. The formatter's separate
ignore policy remains unchanged.

At baseline the default 1.89.0 CLI produced no diagnostics across the files it
discovered. An isolated probe using unused declarations confirmed that `.js`
and `.ts` diagnostics are emitted. `.astro` paths were discovered by recursive
file enumeration, but probes in frontmatter, `<script>` blocks, template
expressions, and imports used only in markup emitted no diagnostics. Those Astro
regions have unverified coverage with pinned 1.89.0 and are not counted as
covered by the lint gate. The
[official guide](https://oxc.rs/docs/guide/usage/linter.html) claims Astro
`<script>` support; the absence of diagnostics in these probes is an unresolved
discrepancy, not proof that the region is unsupported. Excluding Biome for Astro
is intended to remove its Footer.astro false positive, but actual disappearance
requires Zed verification and would not prove Oxlint recognizes `Container`
usage. MDX is excluded by policy.
The rule set is intentionally small and syntax-level: no type-aware dependency,
Astro language parser, CSS/Tailwind linting, or replacement of Astro/TypeScript
diagnostics is implied.

The Oxc Zed extension provides Oxlint diagnostics for its supported JavaScript
and TypeScript languages. It reads the root config and uses only `safe_fix`
code actions when manually requested. `.zed/settings.json` excludes Biome from
relevant language-server lists but preserves other default servers and the
existing Oxfmt formatter and Astro/TypeScript/CSS/Tailwind services. The Oxc
Zed extension registers the Oxlint server for Astro, but the CLI probes do not
establish diagnostics in `.astro` regions, so those regions are not counted as
covered. Shared settings and CLI configuration indicate local resolution and
intended parity; actual Zed extension activation, diagnostic parity, Astro
coverage, save/restart behavior, ignored-file preservation, and responsiveness
require the owner's editor checks and are not claimed from CLI evidence.

Rollback: remove the Oxlint dependency and its lockfile entries, `lint` and
`lint:fix` scripts, `.oxlintrc.json`, and the Oxlint-specific Zed settings and
Biome exclusions. Restore the previous `AGENTS.md` lint statement and this
section's prior Oxfmt-only editor description. Do not revert the Oxfmt pilot or
alter personal Zed settings. Then run `pnpm install --frozen-lockfile`,
`pnpm format:check`, and `pnpm build`.
