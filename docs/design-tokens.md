# Design tokens

Reference for the tokens implemented in `src/styles/global.css`. Values come
from [design-system.md](design-system.md) sections 3 to 5. The site is
dark-only; there are no light or `.dark` variants of the role tokens.

## Colour roles

Declared as plain custom properties on `:root` with a `--ds-` prefix, then
exposed to Tailwind through `@theme inline` as `--color-<role>`. Utilities
such as `bg-surface` or `text-ink` use the role name.

| Role                 | Variable                   | Value     |
| -------------------- | -------------------------- | --------- |
| margin               | `--ds-margin`              | `#1B100A` |
| surface              | `--ds-surface`             | `#231710` |
| raised               | `--ds-raised`              | `#2B1D14` |
| rule                 | `--ds-rule`                | `#5A4030` |
| ink                  | `--ds-ink`                 | `#EADBC0` |
| ink-muted            | `--ds-ink-muted`           | `#C9B496` |
| ink-subtle           | `--ds-ink-subtle`          | `#A58769` |
| accent               | `--ds-accent`              | `#E0A24F` |
| accent-hover         | `--ds-accent-hover`        | `#EDB563` |
| accent-deep          | `--ds-accent-deep`         | `#D4923F` |
| on-accent            | `--ds-on-accent`           | `#231710` |
| paper                | `--ds-paper`               | `#EADBC0` |
| paper-margin         | `--ds-paper-margin`        | `#DDCBA8` |
| paper-rule           | `--ds-paper-rule`          | `#B89A80` |
| paper-ink            | `--ds-paper-ink`           | `#231710` |
| paper-ink-muted      | `--ds-paper-ink-muted`     | `#4A3426` |
| paper-ink-subtle     | `--ds-paper-ink-subtle`    | `#6B4E38` |

Use the `paper-*` roles on kraft bands, never the dark-theme inks.

## Fonts

| Token         | Stack                                                      | Use                                   |
| ------------- | ---------------------------------------------------------- | ------------------------------------- |
| `--font-sans` | `'Figtree Variable', ui-sans-serif, system-ui, sans-serif` | Display, headings, body               |
| `--font-mono` | `'IBM Plex Mono', ui-monospace, monospace`                 | Labels, dates, indices, metadata      |
| `--font-hand` | `'Caveat Variable', cursive`                               | Annotations only, never headings/body |

- Figtree Variable is imported by `BaseLayout.astro`.
- IBM Plex Mono is imported in `global.css` for weights 400 and 500, latin subset.
- Caveat Variable is declared in `global.css` with a latin-only `@font-face`
  pointing at the `@fontsource-variable/caveat` package file.

## Type scale

`--text-*` and `--tracking-*` are reset to `initial` before the scale is
defined, so the default Tailwind sizes and tracking values no longer exist.

| Token            | Size    | Line height |
| ---------------- | ------- | ----------- |
| `--text-label`   | 0.75rem (12px)  | 1rem (16px)     |
| `--text-xs`      | 0.875rem (14px) | 1.25rem (20px)  |
| `--text-sm`      | 1rem (16px)     | 1.5rem (24px)   |
| `--text-base`    | 1.125rem (18px) | 1.8rem (28.8px) |
| `--text-lg`      | 1.375rem (22px) | 1.75rem (28px)  |
| `--text-xl`      | 1.75rem (28px)  | 2.125rem (34px) |
| `--text-2xl`     | 2.125rem (34px) | 2.5rem (40px)   |
| `--text-3xl`     | 2.75rem (44px)  | 3rem (48px)     |
| `--text-4xl`     | 3.5rem (56px)   | 3.75rem (60px)  |
| `--text-5xl`     | 4rem (64px)     | 4.25rem (68px)  |
| `--text-6xl`     | 6rem (96px)     | 6.25rem (100px) |
| `--text-display` | 9.75rem (156px) | 9.75rem (156px) |

Line heights for `base` (160%) and the display sizes are the values chosen
for this implementation; the design system gives only the body ratio.

Page titles (112px, black weight) are not in the scale. Use the plain
property `--page-title-size: 112px` on `:root`.

## Tracking

| Token              | Value   | Use                                  |
| ------------------ | ------- | ------------------------------------ |
| `--tracking-display` | -0.05em | Display sizes, 92px and above        |
| `--tracking-tight`   | -0.04em | 44 to 64px                           |
| `--tracking-label`   | 0.14em  | Uppercase mono labels                |

The design system also mentions about -0.025em for 22 to 34px but names no
token for it, so no token is defined.

## Containers

| Token               | Value   | Use                  |
| ------------------- | ------- | -------------------- |
| `--container-label` | 420px   | Margin cell          |
| `--container-copy`  | 720px   | Reading measure      |
| `--container-page`  | 1440px  | Page width           |

## Breakpoints

| Token            | Value   | Note                                   |
| ---------------- | ------- | -------------------------------------- |
| `--breakpoint-sm` | 640px  |                                        |
| `--breakpoint-lg` | 1024px |                                        |
| `--breakpoint-xl` | 1440px | Overrides the Tailwind default 1280px  |

`md` (768px) and `2xl` (1536px) remain Tailwind defaults; the design system
does not name them.

## Preserved values

- Spacing is untouched: `--spacing` stays at Tailwind's `0.25rem`, so `p-4`
  is `1rem`. The design system's spacing scale is not defined as tokens.
- Radius, opacity, leading, and font-weight tokens are not defined here.
