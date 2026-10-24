# cupofcraft design system

Design specification for Andrea Barghigiani’s personal portfolio.

Version: 1.0 · Source reviewed: 23 October 2026.

This document describes the visual language, reusable patterns, content structure, and interaction requirements. It contains no implementation code. It uses the approved Paper direction and records remaining differences explicitly, so another designer or builder can continue without treating every historical frame as a new rule.

## 1. Design sources and authority

The working design file is [cupofcraft portfolio in Paper](https://app.paper.design/file/01M5KG3D6C0HQBV14KH1M6ZSAJ).

| Reference                                                                          | Use                                                                                                                                |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [Portfolio system](https://app.paper.design/file/01M5KG3D6C0HQBV14KH1M6ZSAJ/p-1-0) | Light layouts, original foundation board, reading and archive patterns.                                                            |
| [Dark theme](https://app.paper.design/file/01M5KG3D6C0HQBV14KH1M6ZSAJ/p-2-0)       | Current avatar-free desktop navigation, dark layouts, revised row highlights in 02, 04, and 07.                                    |
| [Project detail](https://app.paper.design/file/01M5KG3D6C0HQBV14KH1M6ZSAJ/p-4-0)   | Expanded desktop project presentation in both themes.                                                                              |
| [Mobile layouts](https://app.paper.design/file/01M5KG3D6C0HQBV14KH1M6ZSAJ/p-5-0)   | Mobile home composition, stacked content, and outer spacing. Some controls and project-detail content predate desktop refinements. |

Use the latest owner edits and explicit decisions first, then the relevant current composition. The original “00 — Design system” board is a foundation reference, not proof that its older interaction notes supersede later work. The “Round 2” exploration page does not automatically override the selected direction.

Status labels used here:

- **Established:** present in the selected compositions or explicitly retained by the owner.
- **Requirement:** behavior or accessibility constraint the finished experience must satisfy; a static drawing alone does not verify it.
- **Open:** not yet consistent or decided. Do not silently promote a suggestion into an approved decision.

## 2. Character and principles

**Warm by nature. Clear by design.**

The portfolio is a personal lab: writing, learning, and finished work presented with the same care. Its visual references are warm paper, espresso, and caramel. Figtree, generous spacing, and clear editorial hierarchy carry the identity.

- Lead with the person’s thinking and work. Use readable introductions and specific descriptions.
- Let content sit directly on the page. Use dividers and spacing before adding cards.
- Use large type for a small number of expressive moments, with quiet supporting labels.
- Reserve filled surfaces for meaningful emphasis, actions, and highlighted rows.
- Keep decorative coffee drops local to the portrait. They must not obscure labels or appear as button-hover decoration.
- Preserve the warmth in both themes. Light mode is a complete composition, not an inverted screenshot.
- Reuse established patterns across articles, courses, lessons, series, and projects.

## 3. Color foundation

Choose colors by their role on a particular surface. A heading color is not automatically suitable for a small navigation label or a filled background.

### Established theme roles

| Role              | Light     | Dark      | Purpose                                                                 |
| ----------------- | --------- | --------- | ----------------------------------------------------------------------- |
| Page background   | `#FAF7F2` | `#302017` | Warm paper / espresso canvas.                                           |
| Raised surface    | `#FFFFFF` | `#5C3E30` | Navigation and deliberate inset surfaces.                               |
| Foreground        | `#8C5D43` | `#D9C5A9` | Body text and readable supporting content.                              |
| Headings          | `#5C3E30` | `#BB8F5E` | Titles and editorial emphasis on the page background.                   |
| Muted text        | `#8C5D43` | `#B89A80` | Metadata, dates, and supporting labels.                                 |
| Structural border | `#E8DCCC` | `#795D4B` | Quiet separators; not a universal control or focus boundary.            |
| Accent            | `#BB8F5E` | `#BB8F5E` | Caramel emphasis and selected fills where the foreground pairing works. |

Paper names these roles `--color-background`, `--color-surface`, `--color-foreground`, `--color-headings`, `--color-muted`, `--color-border`, and `--color-accent`. Dark counterparts use the `-dark` suffix, except the shared accent. `--color-white` is also present.

### Established dark row-highlight roles

| Paper token                             | Value                                     | Purpose                                      |
| --------------------------------------- | ----------------------------------------- | -------------------------------------------- |
| `--color-row-highlight-dark`            | `#4A3428`                                 | Full-row highlighted background.             |
| `--color-row-highlight-foreground-dark` | `#D9C5A9`, aliased to the dark foreground | Highlighted title and arrow.                 |
| `--color-row-highlight-secondary-dark`  | `#C5AD94`                                 | Highlighted description, date, and metadata. |

These three roles form one combination. Do not retain the old dark title or description colors when applying the new background.

**Open:** an equivalent dedicated light-theme row-highlight combination is not yet established in Paper. Simply using the light border color as the highlight would give the existing body color only 4.13:1 contrast. It is not an approved counterpart.

### Measured contrast

Ratios below were calculated from the solid source colors using WCAG relative luminance. Rounded values are shown for reading; thresholds must be evaluated before rounding.

| Foreground / background                    |  Ratio | Interpretation                                         |
| ------------------------------------------ | -----: | ------------------------------------------------------ |
| Light body / light page                    | 5.22:1 | Passes normal-text AA contrast.                        |
| Light headings / light page                | 8.99:1 | Passes normal-text AA contrast.                        |
| Dark body / dark page                      | 9.30:1 | Passes normal-text AA contrast.                        |
| Dark muted / dark page                     | 5.93:1 | Passes normal-text AA contrast.                        |
| Dark headings / dark page                  | 5.36:1 | Passes normal-text AA contrast.                        |
| Highlight title and arrow / dark highlight | 6.90:1 | Suitable for readable text and meaningful icon detail. |
| Highlight secondary text / dark highlight  | 5.39:1 | Passes normal-text AA contrast.                        |
| Dark headings / raised dark surface        | 3.29:1 | Fails for the current 16px navigation labels.          |

The current dark navigation still demonstrates the last pairing. This is a documented exception to fix, not a pattern to reproduce. The existing dark foreground on that surface reaches 5.72:1 and is a candidate replacement, not a recorded owner-approved menu change.

Normal text must reach 4.5:1. Large text may use 3:1; meaningful icons and required state indicators need 3:1 against adjacent colors. Subtle decorative separators do not all need to become high-contrast borders. See [text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

## 4. Typography

Figtree is the primary family. Use regular 400 for body text, medium 500 for quieter headings, semibold 600 for emphasis, and bold 700 selectively. Use a monospace family for actual code; it is not an alternate editorial identity.

### Foundation scale

| Paper token      | Size | Typical purpose                             |
| ---------------- | ---: | ------------------------------------------- |
| `--text-xs`      | 14px | Dates, labels, and metadata.                |
| `--text-sm`      | 16px | Navigation and compact descriptions.        |
| `--text-base`    | 18px | Reading copy and standard descriptions.     |
| `--text-lg`      | 22px | Archive row titles and lead text.           |
| `--text-xl`      | 30px | Subheadings and project introduction lines. |
| `--text-2xl`     | 48px | Archive and detail titles.                  |
| `--text-display` | 60px | Foundation display style.                   |

The compositions extend this scale deliberately. The desktop home poster uses 120px semibold type, with approximately 124–138px line heights. The expanded project title uses 64/70px. Do not reduce either to 60px merely because the original token list stops there.

The mobile home uses 68/67px for “A little curiosity.” and 42/60px for the portrait-integrated second line. These are composition-specific styles, not general mobile heading sizes.

- Body leading: approximately 150–165%; the foundation body value is 160%.
- Heading leading: the foundation value is 120%; large display styles use tighter leading.
- Small uppercase labels: 14px with `0.08em` tracking; never apply display-style negative tracking to labels.
- Large titles: typically `-0.02em` to `-0.03em` tracking.
- Keep prose comfortable around the 720px copy measure. Wide media and titles can exceed it.
- Preserve hierarchy through size, weight, and spacing before reducing text opacity.

`--opacity-muted` exists at 72%. It is not a blanket instruction to dim metadata: use the actual muted color and check the resulting contrast before introducing transparency.

## 5. Layout, rhythm, and shape

| Foundation           | Value                                     |
| -------------------- | ----------------------------------------- |
| Spacing scale        | 0, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px |
| Copy container       | 720px                                     |
| Page container token | 1200px                                    |
| Small breakpoint     | 640px                                     |
| Large breakpoint     | 1024px                                    |
| Small radius         | 8px                                       |
| Media/card radius    | 16px                                      |
| Pill radius          | 999px                                     |

Spacing tokens are named `--spacing-*`; container, breakpoint, and radius tokens use `--container-*`, `--breakpoint-*`, and `--radius-*` respectively.

Desktop references are 1440px wide. Home and header commonly use 96px side insets, while archives and project detail use a centered 1120px content area with 160px side insets. These measured compositions are not identical to the 1200px container token; preserve the intended content measure instead of forcing every section into one width.

Use 8–12px within compact groups, 16–24px within rows and controls, 32px between related blocks, and 48–80px between larger sections. Let headings and media establish rhythm rather than giving every section identical padding.

Mobile references are 390px wide with 24px side insets, leaving 342px for content. Stack wide sections, facts, and project media/copy arrangements. Put dates or sequence numbers above the text when horizontal lanes no longer fit. Keep action groups readable and allow them to wrap or stack.

Reserve media space to prevent layout jumps. Preserve screenshot aspect ratios and the meaningful parts of the interface. Crop portraits intentionally; do not use a portrait crop rule for product screenshots.

## 6. Header and navigation

**Established:** the current desktop direction has the cupofcraft wordmark on the left, a centered pill containing Home, Writing with a chevron, and Changelog, plus a separate circular theme control on the right. There is no avatar in the navigation.

The dark reference uses 24px vertical header padding, a 6px pill inset, 8px item gaps, 16/20px labels, and a 40px filled Writing item. The theme control is 44px square; its icon is 16px. The wordmark is approximately 22/28px bold.

- Keep the wordmark, navigation, and theme control in stable positions between states.
- Keep readable label/icon contrast on the navigation surface; see the known exception in section 3.
- Distinguish current page, open submenu, hover, and keyboard focus. A filled item alone does not specify which state the drawing represents.
- The Writing chevron indicates a submenu. Its expanded state and keyboard behavior must be clear in the finished experience.
- Give the icon-only theme control an accessible name and expose its action or state.
- Keep touch and keyboard navigation usable without requiring pointer hover.

**Open:** older notes disagree on revealing navigation after 24px or 500px of scrolling. Keeping it visible immediately was suggested but not explicitly approved. The timing, top-of-page state, and mobile navigation contents still need one consistent decision. The light and mobile references also retain older Light/Dark controls. Do not infer a new default from these contradictions.

The original foundation board describes dark as the default. Initial theme selection and persistence are behavior requirements still to be finalized; both visual themes are supported.

## 7. Buttons, links, icons, and focus

### Actions

| Pattern      | Appearance                           | Use                                            |
| ------------ | ------------------------------------ | ---------------------------------------------- |
| Primary      | Filled pill, semibold readable label | Main next step in a section.                   |
| Secondary    | Outline pill, readable text          | Supporting action beside the primary.          |
| Text link    | Text aligned with its content        | Reading links, captions, back navigation.      |
| Icon control | Fixed circular or compact hit area   | Theme control and genuinely icon-only actions. |

The expanded project design uses 18/24px action labels, approximately 16px vertical and 24px horizontal padding. Its primary pair is cream on espresso in light mode, and espresso on cream in dark mode. The home uses closely related pill proportions; avoid forcing every context to the exact same height.

Hover changes the surface tone without moving the label or changing the control’s dimensions. Keyboard focus must be visible independently of hover. Existing interaction notes specify a 2px outline with a 4px offset, but the final per-theme focus colors are still open and must contrast with adjacent surfaces.

### Arrow convention

**Established owner preference:** keep the diagonal `↗` arrow on highlighted content rows, including internal article, course, and series destinations. The straight-arrow experiment was reverted. Older “internal links have no arrows” notes do not override this choice.

Use `↗` on external project, demo, social, and course-site actions too. Because this glyph also appears on internal rows, do not use its shape alone to communicate that a link is external or opens a new tab. Make that behavior clear through context or an accessible label where needed.

The highlighted row uses a 24px arrow in a fixed trailing slot. The Writing chevron is 16px. Keep icon strokes visually consistent and hide decorative arrows from assistive technology when the adjacent text already names the link.

## 8. Shared editorial rows

Use one row family across writing archives, course-note archives, lesson lists, and series entries. Each context supplies its own metadata, not a different interaction vocabulary.

| Variant        | Content                                                          |
| -------------- | ---------------------------------------------------------------- |
| Article        | Date, title, short description; optional “Latest” badge.         |
| Course         | Course title and short description.                              |
| Lesson         | Lesson title and optional description, grouped under its module. |
| Series entry   | Sequence number, article title, optional supporting information. |
| Series summary | Series title, description, and a short invitation to begin.      |

Use 24px vertical padding and 16px horizontal padding as the archive-row reference. Article rows use a 128px date slot with a 32px gap on desktop. Course rows use 24px gaps. Keep the trailing arrow in a fixed-width slot, so its appearance cannot shift the title or reflow the description.

### Row states

| State          | Treatment                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Rest           | Page background, normal heading/body/metadata roles, quiet divider. The whole destination remains understandable without an arrow.    |
| Highlight      | Full-row highlight surface, paired title/arrow and secondary foregrounds. No text inversion using unrelated border or surface tokens. |
| Keyboard focus | Same readable highlight plus a separate visible focus indicator.                                                                      |
| Touch          | Title remains an obvious link; no essential information depends on hover.                                                             |

A highlighted row is an interaction example, not a permanently selected item by default. Avoid nesting separate controls inside a row-wide destination unless the interaction is designed explicitly.

The series summary can retain its rounded outer shape. Shared colors and state behavior do not require every list to become a rounded card.

**Current coverage:** the revised dark highlight is demonstrated in 02 Writing archive, 04 Learning notes, and 07 Series archive. The owner accepted these as a starting point. 05 Course detail and 08 Series detail still contain earlier treatments. Light-theme equivalents are not yet normalized. This document defines the common direction without claiming those Paper frames were updated.

## 9. Home composition

The home is a typographic introduction followed by evidence of work:

1. Avatar-free header.
2. “A little curiosity. A lot of craft.” poster with a portrait embedded in the second line.
3. Short personal introduction and work/writing actions.
4. Social links.
5. Three working principles.
6. Selected projects, with room for a featured project description.
7. Writing feature with one prominent article and smaller supporting entries.
8. About section and work history.
9. Closing conversation invitation and footer.

The header’s missing avatar does not mean removing the portrait from the hero or About section. Preserve its reserved slot and upright crop. Decorative drops stay inside that local composition.

The dark home intentionally contains a contrasting light writing section and a caramel closing section. Theme consistency does not require every section to have the same background. Evaluate text against each local surface.

## 10. Reading, courses, series, and changelog

- **Article detail:** clear title and metadata, a comfortable reading column, and an obvious return path. Images, code, and captions support the reading flow.
- **Course archive:** course title and summary per row; avoid treating the course provider’s branding as the portfolio identity.
- **Course detail:** return link, course title, instructor/context, optional external course link, introduction, then named modules containing lessons.
- **Lesson detail:** preserve course context and orientation. Reading is primary; lesson navigation supports it.
- **Series archive:** series summary and an invitation to begin.
- **Series detail:** introductory context followed by ordered entries. Keep numbering and trailing icons aligned.
- **Changelog:** chronological content with readable dates and clear hierarchy. Do not introduce dashboard-style status colors without a content need.

Use badges sparingly for meaningful metadata. They must not outrank the title or rely on color alone.

## 11. Project presentation

The expanded desktop project pages are the current reference for presenting a project with enough substance. careercraft.ing is the worked example; its copy is draft project content, not mandatory text for every project.

### Content order

1. **Introduction:** project identity, concise positioning line, and a short explanation of who it serves and what it does.
2. **Actions:** primary project destination and an optional demo or walkthrough action.
3. **Lead media:** a meaningful product image or video poster, with a caption and an explicit walkthrough action when available.
4. **At a glance:** a few useful facts, such as audience, product type, and experience. Change the fields to suit the project.
5. **Project story:** the problem, context, and approach in readable prose.
6. **Product detail:** supporting media with adjacent explanatory text, or a gallery when there are several useful screenshots.
7. **Contribution:** Andrea’s role, decisions, constraints, and specific work. Use verified outcomes when available; never invent metrics to fill a layout.
8. **Closing action:** a clear invitation to explore the project, followed by return navigation.

### Optional assets and sections

| Content                  | Design rule                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Logo                     | Optional. Place near the identity at a restrained scale. Preserve its proportions and do not fabricate one.               |
| Cover or lead screenshot | Optional. Prefer a real, informative product view over decoration.                                                        |
| Screenshot gallery       | Optional. Use meaningful views with individual captions. Keep UI text legible; avoid tiny mosaics.                        |
| Video introduction       | Optional. Use a real poster, clear action, and captions/transcript in the finished experience. Avoid autoplay with sound. |
| Demo                     | Optional. Name whether it is a live demo or a video walkthrough; do not imply that a poster is interactive.               |
| Website/source links     | Include only when a real, appropriate destination exists. A private project need not expose source code.                  |
| Outcomes                 | Optional. Include only supported results; qualitative learning is valid when metrics are unavailable.                     |

Omit absent media and actions cleanly. The introduction, story, and contribution must still form a complete page. Do not show empty frames, disabled “Coming soon” links, missing-logo boxes, or authoring instructions to visitors.

The present desktop example uses a 1120×630px lead-media slot, a caption/action line, three compact facts, and asymmetric story sections with a roughly 304px heading column and 64px gap. The supporting media row uses a 640×440px slot beside text. These are composition references: preserve the actual asset’s aspect ratio rather than forcing unrelated images into those dimensions.

The example’s media comes from the public careercraft.ing site: a demo poster and an existing product illustration. The illustration is not evidence of a newly captured app screenshot. Paper displays a static video poster; playback and destinations still require implementation and validation later.

**Open:** the older mobile project-detail drawings have not been expanded to match this desktop structure. Stack the new sections and retain their content order when developing the mobile design; do not treat the old short page as equivalent coverage.

## 12. Motion and accessible behavior

Motion should clarify a state change or add a small personal accent. It should not compete with reading.

- Existing header notes use a 180ms reveal, but the reveal trigger remains open.
- Existing portrait notes use a local drop reveal over approximately 420ms. Keep the text, portrait, and buttons still; animate decorative elements inside the reserved slot.
- With reduced motion, show the final static decorative state and remove unnecessary transforms and transitions.
- Buttons and rows retain their dimensions across hover, focus, and activation.
- Keep keyboard focus visible and unobscured by sticky elements.
- Do not require hover to reveal a title, description, destination, or action needed to use the page.
- A submenu must support keyboard entry, exit, and dismissal. A static chevron is not proof of this behavior.
- Meaningful images need suitable alternative text; purely decorative drops do not need narration.
- Video needs appropriate text alternatives. Playback is never inferred from a still image.
- Check text reflow, zoom, touch targets, theme changes, and screen-reader names in the finished experience.

## 13. Outstanding alignment and handoff checks

The design direction is established. The following items remain explicit follow-through work rather than reasons to redesign it:

| Item                             | Current evidence / next decision                                                         |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| Row coverage                     | Carry the common treatment into 05 and 08 when those frames are next refined.            |
| Light row highlight              | Establish and measure a dedicated foreground/background combination.                     |
| Dark navigation contrast         | Replace the failing small-label pairing while preserving the owner’s menu layout.        |
| Hover versus selected/open state | Define each state separately, including the Writing submenu.                             |
| Header reveal                    | Resolve 24px, 500px, or immediate availability; reconcile mobile contents.               |
| Focus and motion roles           | Finalize per-theme focus colors and a consistent interaction timing set.                 |
| Mobile consistency               | Update older controls and expand project detail to follow the desktop content structure. |
| Project copy and assets          | Review the contribution draft and use project-specific, verified media and outcomes.     |

Before extending this system, check the relevant current Paper composition, preserve the owner’s manual edits, and use an existing pattern when it fits. Add a new visual role only when its purpose and foreground/background pairing are clear.

Before calling a finished experience verified, inspect both themes and narrow/wide layouts, confirm row and navigation states with pointer and keyboard, check reduced motion, measure contrast on the actual local surfaces, and verify the optional-media/no-media project cases. The calculations and static Paper reviews recorded here do not establish full accessibility compliance.
