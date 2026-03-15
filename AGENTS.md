Concise rules for building accessible, fast, delightful UIs. Use MUST/SHOULD/NEVER to guide decisions.

### Tokenized Styling Syntax

- MUST: Use scalable design tokens from `src/theme/index.js` for UI styling.
- MUST: Avoid hardcoded values when a design token already exists.
- MUST: Avoid extending design tokens; use the existing token set.
- MUST: Use `theme({...})` for any property supported by styled-system before using raw CSS declarations.
- MUST: Treat the following as styled-system-supported and therefore `theme({...})`-first properties:
- `animation`: `animation`, `animationName`, `animationDuration`, `animationTimingFunction`, `animationDelay`, `animationIterationCount`, `animationDirection`, `animationFillMode`, `animationPlayState`.
- `background`: `background`, `backgroundImage`, `backgroundClip`, `backgroundSize`, `backgroundPosition`, `backgroundRepeat`, `backgroundAttachment`; aliases: `bgImage`, `bgClip`, `bgSize`, `bgPosition`, `bgRepeat`, `bgAttachment`.
- `color`: `color`, `backgroundColor`, `opacity`, `bg`; alias: `bgColor`.
- `typography`: `fontFamily`, `fontSize`, `fontStyle`, `fontWeight`, `letterSpacing`, `lineHeight`, `textAlign`, `textDecoration`, `textOverflow`, `textTransform`, `whiteSpace`, `wordBreak`.
- `layout`: `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `display`, `size`, `verticalAlign`, `overflow`, `overflowX`, `overflowY`; aliases: `w`, `h`, `minW`, `maxW`, `minH`, `maxH`, `d`.
- `space`: `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `marginX`, `marginY`, `marginBlockStart`, `marginBlockEnd`, `marginInlineStart`, `marginInlineEnd`, `padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `paddingX`, `paddingY`, `paddingBlockStart`, `paddingBlockEnd`, `paddingInlineStart`, `paddingInlineEnd`; aliases: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `ms`, `me`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`, `ps`, `pe`, `marginStart`, `marginEnd`, `paddingStart`, `paddingEnd`.
- `flexbox`: `alignItems`, `alignContent`, `justifyItems`, `justifyContent`, `flexWrap`, `flexDirection`, `flex`, `flexFlow`, `flexGrow`, `flexShrink`, `flexBasis`, `justifySelf`, `alignSelf`, `order`, `placeItems`, `placeContent`, `placeSelf`, `gap`; alias: `flexDir`.
- `grid`: `gridGap`, `gap`, `gridRowGap`, `rowGap`, `gridColumnGap`, `columnGap`, `gridRow`, `gridColumn`, `gridAutoFlow`, `gridAutoRows`, `gridAutoColumns`, `gridTemplateRows`, `gridTemplateColumns`, `gridTemplateAreas`, `gridArea`.
- `border`: `border`, `borderWidth`, `borderStyle`, `borderColor`, `borderRadius`, `borderTop`, `borderTopLeftRadius`, `borderTopRightRadius`, `borderRight`, `borderBottom`, `borderBottomLeftRadius`, `borderBottomRightRadius`, `borderLeft`, `borderX`, `borderY`, `borderTopWidth`, `borderTopColor`, `borderTopStyle`, `borderBottomWidth`, `borderBottomColor`, `borderBottomStyle`, `borderLeftWidth`, `borderLeftColor`, `borderLeftStyle`, `borderRightWidth`, `borderRightColor`, `borderRightStyle`.
- `position`: `position`, `zIndex`, `top`, `right`, `bottom`, `left`; alias: `pos`.
- `shadow`: `boxShadow`, `textShadow`.
- `other`: `appearance`, `transform`, `transformOrigin`, `visibility`, `userSelect`, `pointerEvents`, `overflowWrap`, `boxSizing`, `cursor`, `resize`, `objectFit`, `objectPosition`, `float`, `fill`, `stroke`, `outline`, `outlineColor`.
- `transition`: `transition`, `transitionProperty`, `transitionDuration`, `transitionTiming`, `transitionDelay`.
- MUST: Decompose raw CSS declarations into styled-system keys whenever possible (for example use `py`/`px` instead of `padding`, `mt`/`mb` instead of `margin`, and `borderBottom` + `borderBottomColor` instead of raw `border-bottom`).
- MUST: For border tokens, prefer tokenized border props over string interpolation: `borderBottom: 1` + `borderBottomColor: 'black05'` (or `borderColor` if all sides share the same color).
- MUST: Consolidate related tokenized properties into a single `theme({...})` call per selector block (and per media block), instead of multiple adjacent `theme(...)` calls.
- MUST: Prefer semantic token references in `theme({...})`, such as `fontFamily: 'mono'`, `fontWeight: 'bold'`, `color: 'black'`, `fontSize: 1`, `lineHeight: 0`, `letterSpacing: 0`.
- MUST: Apply the same rule inside styled components and inline `css={theme({...})}` objects.
- NEVER: Use raw token interpolation (for example `font-size: ${fontSizes[0]}`) when the same style can be expressed via `theme({...})`.
- NEVER: Split tokenized style values across raw CSS and multiple `theme(...)` calls when one `theme({...})` object can express them.
- SHOULD: Keep raw CSS only for unsupported/states-only patterns (for example keyframes, browser-specific values, or dynamic runtime computed styles).

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
