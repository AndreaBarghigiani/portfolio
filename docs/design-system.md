# cupofcraft design system

Design specification for Andrea Barghigiani’s personal portfolio: the “spec sheet” direction.

Version: 2.0 · Source reviewed: 28 October 2026.

This document describes the visual language, reusable parts, page patterns, behaviour, and open decisions. It contains no implementation code. It replaces the earlier 1.0 document, which described a different (light-first, pill-based) direction that has been retired. Nothing in 1.0 should be treated as current unless it is restated here.

## 1. Design sources and authority

The design lives in one Paper file: [cupofcraft portfolio](https://app.paper.design/file/01M5KG3D6C0HQBV14KH1M6ZSAJ).

| Paper page      | Contains                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Design system   | Tokens, colour, type, layout, parts, contrast, **States & parts**, and the **Behaviour** sheet (header reveal, reading bar).  |
| Home            | Desktop home (`Home — Spec sheet / dark`).                                                                                    |
| Writing archive | Posts archive; the reference for every archive.                                                                               |
| Course notes    | Notes archive.                                                                                                                |
| Series archive  | Series list.                                                                                                                  |
| Changelog       | Merged-PR changelog.                                                                                                          |
| Article detail  | The reference for every detail page.                                                                                          |
| Course detail   | Course with modules and lessons.                                                                                              |
| Lesson detail   | One lesson inside a course.                                                                                                   |
| Series detail   | Series with ordered entries.                                                                                                  |
| Project detail  | One project.                                                                                                                  |
| Mobile          | 390px home, archive template, detail template, and mobile behaviour. Archive and detail are templates, not one page per type. |

Precedence: the owner’s latest explicit decision, then the Design system page, then the page compositions. Where a composition disagrees with the Design system page, the Design system page wins and the composition is out of date.

Status labels used here:

- **Established:** drawn in the Paper file and accepted by the owner.
- **Requirement:** behaviour or accessibility a finished build must satisfy. A static drawing does not verify it.
- **Open:** undecided or only proposed. Do not promote an Open item into a rule.

## 2. Character and principles

**Warm, ruled, precise.** A dark roastery palette, drawn like a drafting sheet, with one human voice.

- **One accent.** Amber carries emphasis, primary fills, and key labels. Do not add a second accent.
- **Weight contrast.** Pair light (300) with black (900) type. Large display text is the main expressive device.
- **Hairlines, not cards.** Structure comes from 1px rules and a fixed margin column. Avoid boxed cards and shadows.
- **Square corners.** There are no rounded corners. The only circle in the system is reserved for an avatar, and the current designs do not use it.
- **Restrained decoration.** The corner marks (section 8), the handwritten annotation, and tonal bands are the whole decorative vocabulary.
- **Real content only.** Use verbatim titles and copy. Never invent metrics, tags, dates, or media to fill a layout.
- **Dark only.** The site ships dark-only (owner decision, 28 October 2026). Light mode is not designed and the theme toggle is removed.

## 3. Tokens and colour

Tokens are named by **role**, so a future theme is a remap of the same names. All values below are the dark theme, the only theme drawn and shipped. Role naming keeps a future theme possible, but none is planned.

| Token                       | Value     | Role                                                    |
| --------------------------- | --------- | ------------------------------------------------------- |
| `--color-margin`            | `#1B100A` | Margin column, title-cell backgrounds, footer.          |
| `--color-surface`           | `#231710` | Main page ground.                                       |
| `--color-raised`            | `#2B1D14` | One step up: About band, hover rows, pull quotes.       |
| `--color-rule`              | `#5A4030` | All hairlines.                                          |
| `--color-ink`               | `#EADBC0` | Primary text and headings.                              |
| `--color-ink-muted`         | `#C9B496` | Body copy and secondary text.                           |
| `--color-ink-subtle`        | `#A58769` | Mono labels and metadata (12px and up only).            |
| `--color-accent`            | `#E0A24F` | The single accent.                                      |
| `--color-accent-hover`      | `#EDB563` | Hover state of accent fills.                            |
| `--color-accent-deep`       | `#D4923F` | Margin column on an accent band.                        |
| `--color-on-accent`         | `#231710` | Text and fills placed on the accent.                    |
| `--color-paper`             | `#EADBC0` | Kraft band ground (writing, “keep reading”).            |
| `--color-paper-margin`      | `#DDCBA8` | Margin column on a kraft band.                          |
| `--color-paper-rule`        | `#B89A80` | Hairlines on a kraft band.                              |
| `--color-paper-ink`         | `#231710` | Headings on kraft.                                      |
| `--color-paper-ink-muted`   | `#4A3426` | Body copy on kraft.                                     |
| `--color-paper-ink-subtle`  | `#6B4E38` | Mono labels on kraft.                                   |

Use the surface that matches the role: text on the kraft band uses the `paper-*` inks, never the dark-theme inks.

### Contrast

Ratios are approximate, calculated by hand from WCAG relative luminance, and must be re-measured with a tool before being treated as final. Body text needs 4.5:1.

| Pair                                  |   Ratio |
| ------------------------------------- | ------: |
| ink / surface                         | ≈ 12.8:1 |
| ink-muted / surface                   |  ≈ 8.7:1 |
| ink-subtle / surface                  |  ≈ 5.2:1 |
| ink-subtle / margin                   |  ≈ 5.6:1 |
| accent / surface                      |  ≈ 7.9:1 |
| on-accent / accent                    |  ≈ 7.9:1 |
| paper-ink-muted / paper               |  ≈ 8.5:1 |
| paper-ink-subtle / paper              |  ≈ 5.5:1 |

Hairlines (`--color-rule`) are structural and do not need to meet 3:1. Anything that conveys state (focus, hover, current) must not rely on a hairline alone.

## 4. Typography

Three families, each with one job. Paper loads them by name.

| Family        | Token         | Use                                                              |
| ------------- | ------------- | ---------------------------------------------------------------- |
| Figtree       | `--font-sans` | Display, headings, body.                                         |
| IBM Plex Mono | `--font-mono` | Labels, dates, indices, metadata, code.                          |
| Caveat        | `--font-hand` | Annotations only (section 8). Never for headings, body, or nav.  |

Weights in use: 300 (light), 400, 600, 700, 800, 900 (black).

### Scale

| Token            |   Size | Typical use                                         |
| ---------------- | -----: | --------------------------------------------------- |
| `--text-label`   |   12px | Mono labels, tags (uppercase).                      |
| `--text-xs`      |   14px | Mono values, dates, indices.                        |
| `--text-sm`      |   16px | Navigation, buttons, compact text.                  |
| `--text-base`    |   18px | Body, descriptions.                                 |
| `--text-lg`      |   22px | Lead text, small titles, company names.             |
| `--text-xl`      |   28px | Entry titles, annotation size.                      |
| `--text-2xl`     |   34px | Row titles; mobile section titles.                  |
| `--text-3xl`     |   44px | Section titles in the margin; large row titles.     |
| `--text-4xl`     |   56px | Section titles, About statement.                    |
| `--text-5xl`     |   64px | Principle numerals; mobile hero emphasis.           |
| `--text-6xl`     |   96px | Hero light line; CTA headline.                      |
| `--text-display` |  156px | Hero emphasis line only.                            |

Page titles on archive and detail pages use 112px (a one-off step above the scale) with black weight; treat it as a page-title style, not a general size.

### Rules

- **Display tracking** `--tracking-display` (−0.05em) at 92px and above; `--tracking-tight` (−0.04em) for 44–64px; about −0.025em for 22–34px.
- **Labels** are mono, uppercase, 12px, `--tracking-label` (+0.14em). Never apply negative tracking to a label.
- **Body leading** is about 160% (28–34px on 18–20px text). Reading text is 20/34px on desktop and 18/30px on mobile.
- **Reading measure** is 720px (`--container-copy`).
- **Hierarchy comes from size, weight, and spacing**, not from reducing opacity.
- **Standfirsts** (the line under a page title) are light 28px in the accent on desktop, 22px on mobile.

## 5. Layout, rhythm, and surfaces

### The sheet

Every desktop page is a stack of **rows**. Each row has two cells separated by a vertical rule:

- a **margin cell**, 420px wide (`--container-label`), on `--color-margin`;
- a **content cell**, flexible, on `--color-surface` unless a band says otherwise.

Cells use 48px padding (`--spacing-48`). Rows are separated by 1px `--color-rule` hairlines. Pages are drawn at 1440px.

**Established:**

- **Titled sections** (projects, writing, experience, archive years): the title sits in the margin cell.
- **Untitled sections** (About, contact): the margin cell stays empty. The content carries its own title.
- **Labels:** a small mono label appears only where it clarifies a section (“You can find me”, “Method”, “On this page”). There is no section numbering.
- **Tonal play is deliberate and small:** margin one step darker than surface; one raised band (About); one kraft band (writing, “keep reading”, “more projects”, “next up”); one accent band (contact).

### Spacing and shape

| Foundation   | Value                                                      |
| ------------ | ---------------------------------------------------------- |
| Spacing      | 0, 4, 8, 12, 16, 24, 32, 48, 64, 96px (`--spacing-*`)      |
| Margin cell  | 420px (`--container-label`)                                |
| Reading copy | 720px (`--container-copy`)                                 |
| Page         | 1440px (`--container-page`)                                |
| Breakpoints  | 640 (`--breakpoint-sm`), 1024 (`--breakpoint-lg`), 1440    |
| Radius       | none (`--radius-none`); `--radius-round` reserved          |

Use 8–16px inside compact groups, 24–32px inside rows, and 48–96px between larger blocks.

### Responsive behaviour

**Established at 390px; tablet is Open.** At narrow widths the margin cell stops being a column. Its title or label becomes a darker band above its section, and an empty margin cell is dropped. Side padding is 24px. Sections stack. Rows keep their internal structure (date above title, arrow at the right edge).

Below 1024px the desktop margin column must not be shown. The widths between 390px and 1024px have not been designed.

## 6. Header, footer, and navigation

### Title block (header)

**Established.** The header is a four-cell title block: the wordmark in the margin cell, a `SHEET` cell, a `DRAWN BY` cell, and the navigation (Home, Writing, Changelog) in the last cell. The current page is accent and bold. Writing opens a submenu (see below).

The `SHEET` cell carries the page code. The numbering in the designs is: 01 Home, 02 Article, 03 Writing, 04 Notes, 05 Series, 06 Series entry, 07 Changelog, 08 Course notes, 09 Lesson, 10 Project. Whether this numbering is kept in the build is **Open**; if kept, it must be derived from the route and not hand-maintained.

On mobile the header is two rows: wordmark and sheet code, then a three-cell navigation strip (48px tall).

### Writing submenu

**Established (owner decision, 28 October 2026).** Writing opens a submenu with Posts, Series, and Notes: on hover on desktop, and after a tap on mobile.

**Requirement.** Hover alone is not enough (section 10): the submenu must also open from keyboard focus or Enter, close with Escape and when focus leaves, and expose its expanded state. The current Writing section stays marked while the submenu is closed. The archive heads keep their in-page Posts / Series / Notes sub-nav unless the owner decides otherwise.

**Open.** The submenu is not drawn yet: the desktop dropdown and the mobile expanded state still need a design.

### Header behaviour

**Requirement.** The header is in flow at the top of the page, not fixed. On scroll-down it hides; on scroll-up it returns in about 180ms with an accent rule underneath. It stays visible while it holds keyboard focus. With reduced motion it appears without a slide. In-page anchors need scroll padding equal to the revealed header height so targets are not hidden. On mobile only the navigation strip returns, not the wordmark row.

### Footer

**Established.** A margin cell with the wordmark and copyright, a link cell (Writing, Notes, Changelog), and a right cell. The right cell differs by page type:

| Page type                                                          | Right cell                                 |
| ------------------------------------------------------------------ | ------------------------------------------ |
| Home and archives                                                  | Handwritten “back to top ↑”.               |
| Detail pages (article, lesson, course, series entry, project)      | “← Back to {archive}” (plain Figtree 16px). |

On short pages the footer sits at the bottom of the viewport, and the margin column runs the full page height. Draw the column once at layout level, not per row, so short pages do not show a gap.

### Reading bar

**Requirement.** Detail pages only. A slim bar fixed to the bottom of the viewport, 56px on desktop and 48px on mobile, with a 2px progress line above it. It shows the current section, reading progress, and the handwritten “back to top ↑”. It does not repeat the “← Back to …” link, which appears once in the page head and once at the end of the footer. The bar hides when the footer enters the viewport. Archives have no bar.

“Back to top” keeps its real text for assistive technology even though it is set in the annotation font.

## 7. Back links and navigation scheme

Each link appears once per place:

- The page head carries “← Back to {archive}” (detail pages only).
- The reading bar carries “back to top”.
- The detail-page footer ends with “← Back to {archive}”.
- Archive and home footers carry “back to top”.

## 8. Parts

All parts below are specified, with states, on the **States & parts** and **Parts** areas of the Design system page.

### Buttons

| Pattern | Rest                          | Hover                                    | Focus                                          |
| ------- | ----------------------------- | ---------------------------------------- | ---------------------------------------------- |
| Solid   | Accent fill, on-accent label  | `--color-accent-hover` fill              | 2px ink ring, 3px offset. No corner marks.     |
| Outline | 1px `ink-subtle`, ink label   | Accent border plus corner marks          | Same as hover.                                 |
| Text    | Accent, semibold              | Underline in accent                      | Visible focus indicator independent of hover.  |

**Corner marks** are two small L-shaped accent brackets at opposite corners (top-left and bottom-right), 11–13px, offset just outside the box. They belong to outline buttons on hover and focus, and to figures (below). Solid buttons never get them. Buttons never move or resize between states. Mobile buttons are 56px tall and full width.

### Figure

A framed media slot with corner marks always on, and a mono caption (`FIG. 01 — …`) below or in the margin. The hero portrait is “Fig. 01”.

### Tags

Two kinds, never filled:

- **Status** (`NEW`, `LATEST`): accent outline, accent mono text. One per row. `NEW` is an experiment the owner may drop.
- **Topic** (`AI`, `AGENTS`): neutral outline, one chip per value. Never render several topics as one string.

Topic chips render only where the content already has tags. They are plain text for now: they do not link anywhere, and tag archive pages are deferred. Never invent tags.

Tags must not carry meaning by colour alone.

### Annotation

A short human aside in Caveat, 28px, accent, tilted −2°. Rules:

- One per page, a few words, in a margin or beside a figure, never over content.
- The documented uses are: the home portrait (“↑ that’s me, mid-refill”), the show-more row (“more cool stuff →”, “keep going →”, “all the receipts →”, “the good part’s in here”), and the article pull quote.
- **Exception:** “back to top” is a permanent resident in the footer and the reading bar. It is untilted.

### Rows

Archive, series, course, lesson, and changelog entries use one row family. A row is a date or index (mono), a title, an optional description, and a trailing arrow in a fixed-width slot so the arrow never shifts the text.

| State | Treatment                                                                                           |
| ----- | --------------------------------------------------------------------------------------------------- |
| Rest  | Surface ground, ink title, muted description, hairline below.                                       |
| Hover | Row on `--color-raised`; title, date, and index turn accent. Dimensions never change.               |
| Focus | The hover treatment plus a separate visible focus indicator.                                        |
| Touch | The whole row is the tap target (at least 48px). Nothing essential depends on hover.                |

The designs show one row in hover state per page as an example. A row is not “selected” by default.

### Show more

**Established.** Collections show a few items, then a button reveals the rest of that page in **one click**, with a count (for example “13 more on this page”).

| Collection           | Visible before the button |
| -------------------- | ------------------------: |
| Posts                |                         3 |
| Notes                |                         3 |
| Series entries       |                         3 |
| Changelog            |                         6 |
| Lessons, per module  |                         3 |

**Requirements:** nothing is fetched; all items are present in the HTML and, without JavaScript, all are shown. After activation, focus moves to the first newly shown item and a polite announcement states the count.

### Pagination

Archives are grouped by year, at most three years per page, regardless of post count. The control shows the current range (“Page 1 · 2026 — 2024”), the next range, and Newer / Older links. A single-page collection has no pagination row.

### Arrow convention

**Established.** The arrow glyph says where a link goes:

- `→` marks an **internal** link: a row, “Read the article”, “View project”, “Older”.
- `↗` marks an **external** link, including a button that points outside the site: GitHub, LinkedIn, Bluesky, a course site, a reference link, a pull request, a project’s Website or Source link. “External” means leaving the site, including other subdomains and `mailto:` links.
- `←` is a back link. `↑` and `↓` are directional controls (back to top, the table-of-contents toggle). Directional arrows do not signal internal or external.

The glyph is never the only signal. An external link also needs an accessible name or context (for example “opens in a new tab”) and `rel="noopener noreferrer"`. Decorative arrows whose adjacent text already names the link are hidden from assistive technology.

### Other recurring parts

- **Code block:** margin-tone ground, hairline border, mono header (filename or language), mono body. Horizontal scrolling on mobile is signalled by a “scrolls →” label.
- **Pull quote:** a full-width raised band, light 56px (34px on mobile) with the key phrase in black accent.
- **Kraft band:** a section on `--color-paper` with its own margin tone, used for writing and for “keep reading”, “next up”, and “more projects”.
- **Facts:** small mono label/value pairs in the margin cell (published, reading time, instructor, source, entries).

## 9. Page patterns

Real content must come from the content collections or the live site. Titles are verbatim, including any typos the source still contains, until fixed at the source.

### Home

In order: title block; hero (portrait in the margin cell, light line over the black emphasis line, lead text, solid and outline buttons); “You can find me” links; “Method” principles; projects (one featured row, then compact rows); the writing band on kraft; About on the raised ground with an empty margin cell; experience; the accent contact band with an empty margin cell; footer.

### Archives (posts, notes, series, changelog)

Title block; head with a Posts / Series / Notes sub-nav in the margin and the page title in the content cell; entries grouped by year with the year and count in the margin cell; the show-more row; pagination where it applies; footer. The sub-nav shows counts. Notes and series entries that have no dates are not grouped by year.

### Detail pages

Title block; head (back link and facts in the margin, title and standfirst in the content cell); body in a 720px reading column; a closing “keep reading” kraft band; footer. The margin carries the table of contents where one applies (“On this page”), or the module’s lesson list on a lesson.

| Type          | Specifics                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| Article       | Table of contents, figure, pull quote, code, previous and next articles.                               |
| Course        | Instructor, course site, intro blurbs on a raised band, modules each showing three lessons.            |
| Lesson        | Module lesson list in the margin, code, a reference link, previous and next lesson.                    |
| Series entry  | Large sequence numerals in the margin, all entries listed in order, with show-more.                    |
| Project       | Summary, links (Website, Source code only when they exist), optional cover, story, other projects.     |

### Project presentation

Show only what exists. The logo, cover, media list, Website link, and Source link are all optional; when absent, omit them cleanly. Do not show empty frames, disabled “Coming soon” links, missing-logo boxes, or authoring instructions. The introduction and story must form a complete page on their own. Never invent outcomes or metrics; qualitative learning is valid when numbers are unavailable.

## 10. Accessibility and behaviour requirements

These are requirements for the finished build, not facts established by the drawings.

- Text meets 4.5:1. Verify the contrast table in section 3 with a tool.
- Keyboard focus is always visible and not obscured by the revealed header or the reading bar.
- Hover is never required to reveal a title, description, destination, or action.
- Tap targets are at least 48px on mobile.
- Respect reduced motion: no slide for the header reveal; no decorative transforms beyond the static annotation tilt.
- The show-more control follows the requirements in section 8, and the “back to top” control keeps real text.
- Arrow glyphs that duplicate adjacent link text are hidden from assistive technology.
- External links follow the arrow convention in section 8 and are identifiable by more than glyph shape alone.
- Images need suitable alternative text. Video needs captions or a transcript, no autoplay with sound, and playback is never inferred from a poster.
- Check text reflow, zoom, and screen-reader names in the finished build, on narrow and wide viewports.

## 11. Open decisions

Do not silently resolve these.

| Item                       | Question                                                                                                                                      |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Light mode                 | Out of scope: the site ships dark-only and the theme toggle is removed. Tokens stay role-named so a theme remains possible later, but nothing is planned. |
| Tablet widths              | Only 390px and 1440px are drawn.                                                                                                              |
| Writing submenu design     | The behaviour is decided (section 6) and a simple dropdown ships; its design is not drawn. Does the archive sub-nav stay alongside it?         |
| Topic tag values           | Decided: show tags when the content has them, as plain text. Values are never invented; older posts, notes, and series may simply have none.   |
| Author block               | Decided: the author block ships on single articles only (owner decision, 28 October 2026).                                                    |
| Experience “Tools used”    | The live home lists tools per job. The designed home does not.                                                                                |
| Lesson previous / next     | Decided: the previous / next lesson navigation ships (owner decision, 28 October 2026).                                                       |
| Reading-bar progress       | Decided: show both the percentage and the progress line; the label is a single line with an ellipsis (owner decision, 28 October 2026).      |
| Sheet numbering            | Decided: the page codes ship, derived from the route (owner decision, 28 October 2026).                                                       |
| NEW tag                    | An experiment; keep or remove.                                                                                                                |
| Notes count                | The live site shows four notes; the repository has a fifth note folder. Confirm what is published.                                           |
| Paper limits               | Paper does not render `font-family` tokens, so the designs use literal font names. The code export resolves `--font-*`.                       |

## 12. Handoff checks

Before calling a finished page verified: compare it to the matching Paper page and to the Mobile page; confirm tokens, not raw values, drive colour, type size, spacing, and tracking; check the row, button, and focus states with pointer and keyboard; check the header reveal, reading bar, and show-more behaviour; check reduced motion; confirm that no tags, dates, metrics, or media were invented; and re-measure contrast on the real surfaces. The calculations here do not establish accessibility compliance.
