# Core parts

Reference for the parts in `src/components/ui/`. Behaviour comes from
[design-system.md](design-system.md) section 8. In development, `/dev/parts`
renders every part live for review (hover, Tab through it); in production that
route answers 404.

| Part          | Props                                                                                   | Notes                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `Button`      | `variant` (`solid` \| `outline` \| `text`), `href` or `type`/`disabled`, `arrow`        | `href` renders a link (`→` internal, `↗` external, new tab, `rel`, sr-only hint); otherwise a `<button>`. 56px tall and full width below `lg`. |
| `ArrowLink`   | `href`, `direction` (`back` \| `up` \| `down`), `arrow`, `inline`                       | Destination type comes from `href`. `inline` drops the 48px minimum for links inside running text.     |
| `Tag`         | `kind="status"` + `status` (`NEW` \| `LATEST`), or `kind="topic"` + slot                | Outline only, never filled. At most one status tag per row. No links.                                   |
| `TopicTags`   | `topics: string[]`                                                                      | One chip per value; renders nothing when empty.                                                         |
| `Annotation`  | `as` (`p` \| `span`)                                                                    | Caveat 28px, accent, tilted -2deg. One per page.                                                        |
| `BackToTop`   | none                                                                                    | Untilted handwritten link to `#top`; keeps real text. Used by the footer.                               |
| `Figure`      | `src` (image), `alt` (required), `caption`, `number`                                    | Frame with always-on corner marks; `FIG. 01 — caption`. Do not clip with `overflow-hidden`.             |
| `ExternalLink`| `href` or `isGFE`                                                                       | Thin wrapper over `ArrowLink` kept for MDX content (`EL`). Prefer `ArrowLink` in Astro code.            |

Corner marks are the `corner-marks` (always on) and `corner-marks-interactive`
(hover and keyboard focus) classes in `src/styles/global.css`. Solid buttons
never use them.

## Topic values from content

`getTopics()` in `src/lib/tags.ts` turns content input (the comma-separated
`tags: til, javascript` string older posts use, or an array) into trimmed,
de-duplicated values, and returns `[]` for missing input. It never adds values.
Topic chips are plain text. Wiring it to routes and adding `tags` to a content
schema are deliberately left open: tag values for older posts, notes and series
are an owner decision.
