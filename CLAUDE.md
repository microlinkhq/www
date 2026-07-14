Concise rules for building accessible, fast, delightful UIs. Use MUST/SHOULD/NEVER to guide decisions.

## Code Style

- NEVER: Add inline or block code comments. Let names and structure carry intent; the code should read on its own.
- SHOULD: Rename or restructure instead of annotating when something is unclear.

### Tokenized Styling Syntax

- MUST: Use scalable design tokens from `src/theme/index.js` for UI styling.
- MUST: Avoid hardcoded values when a design token already exists.
- MUST: Avoid extending design tokens; use the existing token set.
- MUST: Use `theme({...})` for any property supported by styled-system before using raw CSS declarations.
- MUST: Treat every styled-system-supported property (see styled-system's prop groups and `src/theme/index.js`) as a `theme({...})`-first property, aliases included.
- MUST: Decompose raw CSS declarations into styled-system keys whenever possible (for example use `py`/`px` instead of `padding`, `mt`/`mb` instead of `margin`, and `borderBottom` + `borderBottomColor` instead of raw `border-bottom`).
- MUST: For border tokens, prefer tokenized border props over string interpolation: `borderBottom: 1` + `borderBottomColor: 'black05'` (or `borderColor` if all sides share the same color).
- MUST: Consolidate related tokenized properties into a single `theme({...})` call per selector block (and per media block), instead of multiple adjacent `theme(...)` calls.
- MUST: Prefer responsive arrays/objects for styled-system props inside one `theme({...})` call (for example `p: [3, 3, 4, 4]`) instead of token-only media-query overrides.
- MUST: Prefer semantic token references in `theme({...})`, such as `fontFamily: 'mono'`, `fontWeight: 'bold'`, `color: 'black'`, `fontSize: 1`, `lineHeight: 0`, `letterSpacing: 0`.
- MUST: Apply the same rule inside styled components and inline `css={theme({...})}` objects.
- NEVER: Use raw token interpolation (for example `font-size: ${fontSizes[0]}`) when the same style can be expressed via `theme({...})`.
- NEVER: Split tokenized style values across raw CSS and multiple `theme(...)` calls when one `theme({...})` object can express them.
- NEVER: Add media queries only to change styled-system token values that can be expressed as responsive arrays/objects in `theme({...})`.
- MUST: When a component needs responsive visibility, use responsive arrays (e.g. `display: ["none", "flex"]`) instead of hand-writing `@media` blocks that only change `display`. For `position: fixed`/`absolute` elements, always state the target `display` value explicitly (e.g. `"flex"`, `"block"`) because `inherit` resolves against the DOM parent, not the visual stacking context, and fixed/absolute elements are out of normal flow.
- SHOULD: Keep raw CSS only for unsupported/states-only patterns (for example keyframes, browser-specific values, or dynamic runtime computed styles).

### Typography Components

The typography components own their size. Compose pages from them; do not restyle their size at the call site.

| Component | Tag | Size (mobile → desktop) | Role |
| --- | --- | --- | --- |
| `Heading` | `h1` | 52 → 64 | Page title (gradient) |
| `Subhead` | `h2` | 52 | Section title |
| `Caption` | `h3` | 20 → 28 | Section/hero supporting text (the lead under a heading) |
| `Text` | `div`/`p` | 16 → 20 | Body copy, card/inline text, meta lines |
| `Caps` | `span` | 16 | Uppercase micro-labels |

- MUST: Use `Heading`/`Subhead`/`Caption` for headings and supporting text, and `Text` for body/card/meta copy. The section pattern is `Subhead` (title) + `Caption` (supporting text).
- NEVER: Pass `fontSize`, `lineHeight`, or `letterSpacing` to `Heading`, `Subhead`, or `Caption`. The component default carries them so every page stays consistent. Passing a size at the call site is the drift this repo spent PRs #2128–#2136 removing.
- MUST: If text needs to be smaller than a section `Caption` (28px), it is body copy — use `Text`, not a shrunk `Caption`.
- MUST: Left-aligned editorial pages (`/features/*`, the `CustomerStory`/`UseCaseStory`/`ExtensionStory` patterns) use these SAME components — pass `textAlign: 'left'` (an allowed layout prop) and `variant={null}` for a plain, non-gradient `Heading`. Do not fork a parallel size system with `SubheadBase` + a custom `fontSize`; that drift was folded back in.
- Sanctioned escapes only (each is a real, reviewed reason a heading needs a different size): `fontSize: 'inherit'` (a gradient sub-span tracking its parent), `forwardedAs='div'` (a stat-number display reusing the heading style), or a named `UPPER_SNAKE_CASE` constant (a deliberate, centrally-defined token, e.g. `CARD_TITLE_FONT_SIZE`, `SUBSECTION_TITLE_FONT_SIZE`).
- ENFORCED: `test/typography-overrides.js` fails the build on any per-call override outside those escapes — including the raw `SubheadBase`/`HeadingBase`/`CaptionBase` import aliases, so renaming the import does not bypass it. Run `npm test`; do not weaken the test to pass — fix the call site.

## Interactions

### Keyboard

- MUST: Full keyboard support per [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/)
- MUST: Visible focus rings (`:focus-visible`; group with `:focus-within`)
- MUST: Manage focus (trap, move, return) per APG patterns
- NEVER: `outline: none` without visible focus replacement

### Targets & Input

- MUST: Hit target ≥24px (mobile ≥44px); if visual <24px, expand hit area
- MUST: Mobile `<input>` font-size ≥16px to prevent iOS zoom
- NEVER: Disable browser zoom (`user-scalable=no`, `maximum-scale=1`)
- MUST: `touch-action: manipulation` to prevent double-tap zoom
- SHOULD: Set `-webkit-tap-highlight-color` to match design

### Forms

- MUST: Hydration-safe inputs (no lost focus/value)
- NEVER: Block paste in `<input>`/`<textarea>`
- MUST: Loading buttons show spinner and keep original label
- MUST: Enter submits focused input; in `<textarea>`, ⌘/Ctrl+Enter submits
- MUST: Keep submit enabled until request starts; then disable with spinner
- MUST: Accept free text, validate after—don't block typing
- MUST: Allow incomplete form submission to surface validation
- MUST: Errors inline next to fields; on submit, focus first error
- MUST: `autocomplete` + meaningful `name`; correct `type` and `inputmode`
- SHOULD: Disable spellcheck for emails/codes/usernames
- SHOULD: Placeholders end with `…` and show example pattern
- MUST: Warn on unsaved changes before navigation
- MUST: Compatible with password managers & 2FA; allow pasting codes
- MUST: Trim values to handle text expansion trailing spaces
- MUST: No dead zones on checkboxes/radios; label+control share one hit target

### State & Navigation

- MUST: URL reflects state (deep-link filters/tabs/pagination/expanded panels)
- MUST: Back/Forward restores scroll position
- MUST: Links use `<a>`/`<Link>` for navigation (support Cmd/Ctrl/middle-click)
- NEVER: Use `<div onClick>` for navigation

### Feedback

- SHOULD: Optimistic UI; reconcile on response; on failure rollback or offer Undo
- MUST: Confirm destructive actions or provide Undo window
- MUST: Use polite `aria-live` for toasts/inline validation
- SHOULD: Ellipsis (`…`) for options opening follow-ups ("Rename…") and loading states ("Loading…")

### Touch & Drag

- MUST: Generous targets, clear affordances; avoid finicky interactions
- MUST: Delay first tooltip; subsequent peers instant
- MUST: `overscroll-behavior: contain` in modals/drawers
- MUST: During drag, disable text selection and set `inert` on dragged elements
- MUST: If it looks clickable, it must be clickable

### Autofocus

- SHOULD: Autofocus on desktop with single primary input; rarely on mobile

## Animation

- MUST: Honor `prefers-reduced-motion` (provide reduced variant or disable)
- SHOULD: Prefer CSS > Web Animations API > JS libraries
- MUST: Animate compositor-friendly props (`transform`, `opacity`) only
- NEVER: Animate layout props (`top`, `left`, `width`, `height`)
- NEVER: `transition: all`—list properties explicitly
- SHOULD: Animate only to clarify cause/effect or add deliberate delight
- SHOULD: Choose easing to match the change (size/distance/trigger)
- MUST: Animations interruptible and input-driven (no autoplay)
- MUST: Correct `transform-origin` (motion starts where it "physically" should)
- MUST: SVG transforms on `<g>` wrapper with `transform-box: fill-box`

## Layout

- SHOULD: Optical alignment; adjust ±1px when perception beats geometry
- MUST: Deliberate alignment to grid/baseline/edges—no accidental placement
- MUST: Space big page sections with the shared `SECTION_VERTICAL_SPACING = [4, 4, 5, 5]` rhythm (64px desktop) so the seam between adjacent components stays a consistent 128px; every product page already follows this.
- NEVER: Rely on `Container`'s default `pt` for section spacing—set `pt`/`py` explicitly, or two padded sections stack into uneven 192–256px seams.
- SHOULD: Reserve heavier padding (`[5, 5, 6, 6]`/128px) for full-bleed or colored emphasis bands, not plain content sections.
- SHOULD: Balance icon/text lockups (weight/size/spacing/color)
- MUST: Verify mobile, laptop, ultra-wide (simulate ultra-wide at 50% zoom)
- MUST: Respect safe areas (`env(safe-area-inset-*)`)
- MUST: Avoid unwanted scrollbars; fix overflows
- SHOULD: Flex/grid over JS measurement for layout

## Content & Accessibility

- SHOULD: Inline help first; tooltips last resort
- MUST: Skeletons mirror final content to avoid layout shift
- MUST: `<title>` matches current context
- MUST: No dead ends; always offer next step/recovery
- MUST: Design empty/sparse/dense/error states
- SHOULD: Curly quotes (" "); avoid widows/orphans (`text-wrap: balance`)
- MUST: `font-variant-numeric: tabular-nums` for number comparisons
- MUST: Redundant status cues (not color-only); icons have text labels
- MUST: Accessible names exist even when visuals omit labels
- MUST: Use `…` character (not `...`)
- MUST: `scroll-margin-top` on headings; "Skip to content" link; hierarchical `<h1>`–`<h6>`
- MUST: Resilient to user-generated content (short/avg/very long)
- MUST: Locale-aware dates/times/numbers (`Intl.DateTimeFormat`, `Intl.NumberFormat`)
- MUST: Accurate `aria-label`; decorative elements `aria-hidden`
- MUST: Icon-only buttons have descriptive `aria-label`
- MUST: Prefer native semantics (`button`, `a`, `label`, `table`) before ARIA
- MUST: Non-breaking spaces: `10&nbsp;MB`, `⌘&nbsp;K`, brand names

## Content Handling

- MUST: Text containers handle long content (`truncate`, `line-clamp-*`, `break-words`)
- MUST: Flex children need `min-w-0` to allow truncation
- MUST: Handle empty states—no broken UI for empty strings/arrays

## Performance

- SHOULD: Test iOS Low Power Mode and macOS Safari
- MUST: Measure reliably (disable extensions that skew runtime)
- MUST: Track and minimize re-renders (React DevTools/React Scan)
- MUST: Profile with CPU/network throttling
- MUST: Batch layout reads/writes; avoid reflows/repaints
- MUST: Mutations (`POST`/`PATCH`/`DELETE`) target <500ms
- SHOULD: Prefer uncontrolled inputs; controlled inputs cheap per keystroke
- MUST: Virtualize large lists (>50 items)
- MUST: Preload above-fold images; lazy-load the rest
- MUST: Prevent CLS (explicit image dimensions)
- SHOULD: `<link rel="preconnect">` for CDN domains
- SHOULD: Critical fonts: `<link rel="preload" as="font">` with `font-display: swap`

## Dark Mode & Theming

- MUST: Use existing design tokens from `src/theme/index.js` (do not add new tokens for task-specific styling).
- MUST: `color-scheme: dark` on `<html>` for dark themes
- SHOULD: `<meta name="theme-color">` matches page background
- MUST: Native `<select>`: explicit `background-color` and `color` (Windows fix)

## Hydration

- MUST: Inputs with `value` need `onChange` (or use `defaultValue`)
- SHOULD: Guard date/time rendering against hydration mismatch

## Design

- SHOULD: Layered shadows (ambient + direct)
- SHOULD: Crisp edges via semi-transparent borders + shadows
- SHOULD: Nested radii: child ≤ parent; concentric
- SHOULD: Hue consistency: tint borders/shadows/text toward bg hue
- MUST: Accessible charts (color-blind-friendly palettes)
- MUST: Meet contrast—prefer [APCA](https://apcacontrast.com/) over WCAG 2
- MUST: Increase contrast on `:hover`/`:active`/`:focus`
- SHOULD: Match browser UI to bg
- SHOULD: Avoid dark color gradient banding (use background images when needed)
