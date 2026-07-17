import { colors, theme, transition } from 'theme'
import React, { useCallback, useMemo, useState } from 'react'
import { ArrowRight, ChevronDown, RotateCcw } from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import mql from '@microlink/mql'

import Box from 'components/elements/Box'
import { TOOLBAR_PRIMARY_HEIGHT } from 'components/elements/Toolbar'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import MultiCodeEditor from 'components/patterns/MultiCodeEditor/MultiCodeEditor'
import { useLocalStorage } from 'components/hook/use-local-storage'
import {
  COLOR_FIELDS,
  DEFAULT_CONFIG,
  ELEMENT_GROUPS,
  FONT_FAMILY_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  SHADOW_OPTIONS,
  THEME_OPTIONS,
  buildCardHtml,
  deriveVariant
} from 'helpers/link-card'
import { FILENAMES, GENERATORS, HIGHLIGHT_ALIASES } from './generators'
import { MOBILE_BP } from 'components/pages/screenshot'

/* ─── Config ───────────────────────────────────────────── */

const LOCAL_STORAGE_KEY = 'builder-config'

// Above this width the settings panel docks as a rail on the left edge of the
// page and the rest of the builder is a single column centered in the page.
// Below it, everything stacks. The centered column caps its width to
// `100% - 2×(RAIL_WIDTH + RAIL_GAP)` (see `Content`) so it always stays clear of
// the rail and visually centered — no matter the viewport.
//
const RAIL_WIDTH = 360
const RAIL_GAP = 24
const RAIL_BREAKPOINT = 1320
const CONTENT_MAX_WIDTH = '760px'
const RAIL_TOP_OFFSET = `calc(${TOOLBAR_PRIMARY_HEIGHT} + ${RAIL_GAP}px)`

const SIZE_OPTIONS = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' }
]

const IMAGE_POSITION_OPTIONS = [
  { id: 'top', label: 'Top' },
  { id: 'left', label: 'Left' },
  { id: 'right', label: 'Right' }
]

// A size preset applies sensible width + type sizes; the user can still tweak
// any of them afterwards.
const SIZE_PRESETS = {
  small: { width: 360, headlineSize: 14, descriptionSize: 12, metaSize: 11 },
  medium: { width: 460, headlineSize: 16, descriptionSize: 13, metaSize: 11 },
  large: { width: 560, headlineSize: 20, descriptionSize: 15, metaSize: 12 }
}

const BUILDER_DEFAULT_CONFIG = {
  ...DEFAULT_CONFIG,
  size: 'medium',
  imagePosition: 'top',
  width: 460,
  height: 0,
  // Output mode: when true the generated components use Tailwind classes
  // instead of inline styles (Vanilla JS always stays inline). Doesn't affect
  // the live preview, which always renders with inline styles.
  tailwind: false
}

// Default URL previewed in the builder, and the placeholder shown in the
// omnibar — a recognizable, well-designed card to land on.
const DEFAULT_URL = 'stripe.com'

// Shown in the live preview by default, before the user fetches another URL.
// Baked from the Microlink API so the default card renders instantly (no
// fetch-on-load), then any real URL the user enters replaces it.
const SAMPLE_DATA = {
  url: 'https://stripe.com',
  title: 'Stripe | Financial Infrastructure to Grow Your Revenue',
  description:
    'Stripe is a financial services platform that helps all types of businesses accept payments, build flexible billing models, and manage money movement.',
  publisher: 'stripe.com',
  author: null,
  date: null,
  image: {
    url: 'https://images.stripeassets.com/fzn2n1nzq965/XtX984S1GJVsVOXFC7kMu/01988281e867728dfb09aa7793a6e3b9/Stripe.jpg?q=80',
    palette: ['#ED87D8']
  },
  logo: {
    url: 'https://images.stripeassets.com/fzn2n1nzq965/4vVgZi0ZMoEzOhkcv7EVwK/8cce6fdcf2733b2ec8e99548908847ed/favicon.png?w=180&h=180'
  }
}

// The props the generated component exposes. Unlike the v0 reference — which
// makes you pass every metadata field by hand — our component is self-contained:
// give it a `url` and it fetches the metadata from Microlink itself.
const COMPONENT_PROPS = [
  {
    name: 'url',
    type: 'string',
    required: true,
    description:
      'The link to preview. The component fetches its metadata from the Microlink API and renders the card you designed.'
  },
  {
    name: 'apiKey',
    type: 'string',
    required: false,
    description:
      'Your Microlink Pro key. Switches requests to pro.microlink.io for higher rate limits and Pro features. Omit it to use the free tier.'
  }
]

/* ─── Styled controls ──────────────────────────────────── */

const Card = styled(Box)`
  background: #fff;
  border: 1px solid ${colors.black10};
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow: hidden;
`

const Segmented = styled(Flex)`
  ${theme({ gap: 1, p: 1 })}
  background: ${colors.black05};
  border-radius: 10px;
  width: 100%;
`

const SegButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    py: 2,
    borderRadius: '8px',
    cursor: 'pointer'
  })}
  flex: 1 1 0;
  min-width: 0;
  border: none;
  background: ${({ $active }) => ($active ? colors.white : 'transparent')};
  color: ${({ $active }) => ($active ? colors.black : colors.black60)};
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 2px rgba(0, 0, 0, 0.08)' : 'none'};
  transition: background ${transition.short}, color ${transition.short};
  touch-action: manipulation;
`

const SectionHeader = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold',
    color: 'black',
    py: '14px'
  })}
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: color ${transition.short};

  &:hover {
    color: ${colors.black60};
  }

  & svg {
    flex-shrink: 0;
    color: ${colors.black40};
    transition: transform ${transition.short};
    transform: rotate(${({ $open }) => ($open ? '0deg' : '-90deg')});
  }
`

const SectionBody = styled(Box)`
  ${theme({ pb: 2 })}
`

const SectionDivider = styled(Box)`
  border-top: 1px solid ${colors.black05};

  &:first-child {
    border-top: none;
  }
`

const FieldRow = styled(Flex)`
  ${theme({ gap: 2, py: '8px' })}
  align-items: center;
  justify-content: space-between;
`

const FieldLabel = styled(Text)`
  ${theme({ fontFamily: 'sans', fontSize: 0, color: 'black80' })}
`

const SectionLabel = styled(Caps)`
  ${theme({
    fontSize: 0,
    fontWeight: 'bold',
    color: 'black60',
    pt: 3,
    pb: 1,
    letterSpacing: 1
  })}
  display: block;
`

const RangeInput = styled.input.attrs({ type: 'range' })`
  flex: 1;
  min-width: 80px;
  accent-color: ${colors.link};
  cursor: pointer;
`

const NumberField = styled.input`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    px: 2,
    py: '6px',
    borderRadius: '6px',
    border: 1,
    borderColor: 'black10',
    color: 'black80',
    width: '64px'
  })}
  background: white;
  text-align: right;

  &:focus {
    outline: none;
    border-color: ${colors.link};
    box-shadow: 0 0 0 1px ${colors.link};
  }
`

const SelectField = styled.select`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    px: 2,
    py: '6px',
    borderRadius: '6px',
    border: 1,
    borderColor: 'black10',
    color: 'black80'
  })}
  background: white;
  cursor: pointer;
  min-width: 96px;
`

const ColorField = styled.input.attrs({ type: 'color' })`
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid ${colors.black10};
  border-radius: 6px;
  background: white;
  cursor: pointer;
  flex-shrink: 0;
`

const HexField = styled.input`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    px: 2,
    py: '6px',
    borderRadius: '6px',
    border: 1,
    borderColor: 'black10',
    color: 'black80',
    width: '88px'
  })}
  background: white;
  text-transform: lowercase;

  &:focus {
    outline: none;
    border-color: ${colors.link};
    box-shadow: 0 0 0 1px ${colors.link};
  }
`

const CheckboxWrap = styled(Flex).attrs({ as: 'label' })`
  ${theme({ gap: 2, py: '6px' })}
  align-items: center;
  cursor: pointer;
  user-select: none;

  & input {
    accent-color: ${colors.link};
    cursor: pointer;
  }
`

const GhostButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    px: 2,
    py: '6px',
    borderRadius: '6px',
    cursor: 'pointer'
  })}
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${colors.black10};
  background: white;
  color: ${colors.black60};

  &:hover {
    color: ${colors.black};
    background: ${colors.black05};
  }
`

const PreviewStage = styled(Flex)`
  ${theme({ p: 4 })}
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at 1px 1px,
    ${colors.black10} 1px,
    transparent 0
  );
  background-size: 16px 16px;
  min-height: 320px;
  width: 100%;
`

const OmniboxWrapper = styled(Flex)`
  ${theme({
    alignItems: 'center',
    bg: 'white',
    borderRadius: '999px',
    border: 1,
    borderColor: 'black10',
    py: '6px',
    pl: '6px',
    pr: '6px',
    gap: '6px',
    width: '100%',
    fontFamily: 'sans'
  })}
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03);

  &:focus-within {
    border-color: ${colors.black20};
  }
`

const OmniboxInput = styled.input`
  ${theme({ fontFamily: 'sans', fontSize: [1, 1, 2, 2], color: 'black80' })}
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  padding: 10px 14px;

  &::placeholder {
    color: ${colors.black30};
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    font-size: 16px;
  }
`

const OmniboxButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    borderRadius: '999px',
    cursor: 'pointer',
    flexShrink: 0
  })}
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  background: ${colors.link};
  color: white;
  white-space: nowrap;

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    padding: 10px 14px;

    .btn-label {
      display: none;
    }
  }
`

// Layout shell. The builder is a single centered column (`Content`); on wide
// screens the settings rail is lifted out of flow and docked to the left edge,
// so it stays visible while scrolling and the centered column reads as the
// middle of the page.
const Root = styled(Box)`
  width: 100%;

  /* Positioning context the rail docks against. */
  @media (min-width: ${RAIL_BREAKPOINT}px) {
    position: relative;
  }
`

/* Spans the builder section at its left edge, so the rail inside can stick
   against it: parked at the section's top before you reach it, pinned while
   it is on screen, parked at its bottom once you pass. */
const RailDock = styled(Box)`
  display: contents;

  @media (min-width: ${RAIL_BREAKPOINT}px) {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${RAIL_WIDTH}px;
    z-index: 3;
    pointer-events: none;
  }
`

const Content = styled(Box)`
  ${theme({ mx: 'auto' })}
  width: 100%;
  max-width: ${CONTENT_MAX_WIDTH};

  /* While the rail is docked, shrink the centered column before it could slide
     under the rail, so it stays clear of it and centered in the page. */
  @media (min-width: ${RAIL_BREAKPOINT}px) {
    max-width: min(
      ${CONTENT_MAX_WIDTH},
      calc(100% - ${2 * (RAIL_WIDTH + RAIL_GAP)}px)
    );
  }
`

const SettingsRail = styled(Card)`
  ${theme({ mb: 4 })}
  width: 100%;
  align-self: flex-start;

  @media (min-width: ${RAIL_BREAKPOINT}px) {
    position: sticky;
    top: ${RAIL_TOP_OFFSET};
    max-height: calc(100vh - ${RAIL_TOP_OFFSET} - ${RAIL_GAP}px);
    margin-bottom: 0;
    overflow-y: auto;
    pointer-events: auto;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const InlineCode = styled.code`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    px: 1,
    py: '2px',
    borderRadius: '4px',
    color: 'black80'
  })}
  background: ${colors.black05};
  white-space: nowrap;
`

const PropRow = styled(Flex)`
  ${theme({ py: '10px', gap: 3 })}
  flex-direction: column;
  border-top: 1px solid ${colors.black05};

  @media (min-width: ${MOBILE_BP}px) {
    flex-direction: row;
    align-items: baseline;
  }
`

const PropName = styled(Flex)`
  ${theme({ gap: 2 })}
  align-items: baseline;
  flex-shrink: 0;
  width: 180px;
`

const PropPill = styled(Box)`
  ${theme({
    fontFamily: 'sans',
    fontSize: '10px',
    fontWeight: 'bold',
    px: 1,
    py: '1px',
    borderRadius: '4px',
    letterSpacing: 1
  })}
  text-transform: uppercase;
  color: ${({ $required }) => ($required ? colors.link : colors.black40)};
  background: ${({ $required }) =>
    $required ? 'rgba(0, 102, 255, 0.08)' : colors.black05};
`

/* ─── Small control helpers ────────────────────────────── */

const RangeField = ({ label, value, min, max, step = 1, suffix, onChange }) => (
  <FieldRow>
    <FieldLabel>{label}</FieldLabel>
    <Flex css={{ alignItems: 'center', gap: 10, flex: 1, marginLeft: 16 }}>
      <RangeInput
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={label}
      />
      <NumberField
        type='number'
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={`${label} value`}
      />
      {suffix && (
        <Text
          css={theme({ fontFamily: 'mono', fontSize: 0, color: 'black40' })}
        >
          {suffix}
        </Text>
      )}
    </Flex>
  </FieldRow>
)

const SegmentedField = ({ label, options, value, onChange }) => (
  <Box css={theme({ pb: 2 })}>
    {label && <SectionLabel>{label}</SectionLabel>}
    <Segmented>
      {options.map(({ id, label }) => (
        <SegButton
          key={id}
          $active={value === id}
          aria-pressed={value === id}
          onClick={() => onChange(id)}
        >
          {label}
        </SegButton>
      ))}
    </Segmented>
  </Box>
)

const SelectRow = ({ label, options, value, onChange }) => (
  <FieldRow>
    <FieldLabel>{label}</FieldLabel>
    <SelectField value={value} onChange={e => onChange(e.target.value)}>
      {options.map(({ id, label }) => (
        <option key={id} value={id}>
          {label}
        </option>
      ))}
    </SelectField>
  </FieldRow>
)

const ColorRow = ({ label, value, onChange }) => (
  <FieldRow>
    <FieldLabel>{label}</FieldLabel>
    <Flex css={{ alignItems: 'center', gap: 8 }}>
      <ColorField
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label={label}
      />
      <HexField
        value={value}
        onChange={e => onChange(e.target.value)}
        spellCheck={false}
        aria-label={`${label} hex`}
      />
    </Flex>
  </FieldRow>
)

/* ─── Tabs ─────────────────────────────────────────────── */

const LayoutSection = ({ config, set }) => {
  // The Small variant is a compact, icon-only card: it has no hero image, so
  // image position and image height don't apply — hide them to avoid dead
  // controls that look like they do nothing.
  const hasImage = config.size !== 'small'
  return (
    <Box>
      <SegmentedField
        label='Size'
        options={SIZE_OPTIONS}
        value={config.size}
        onChange={size => set({ size, ...SIZE_PRESETS[size] })}
      />
      {hasImage && (
        <SegmentedField
          label='Image position'
          options={IMAGE_POSITION_OPTIONS}
          value={config.imagePosition}
          onChange={imagePosition => set({ imagePosition })}
        />
      )}
      <RangeField
        label='Width'
        value={config.width}
        min={280}
        max={680}
        suffix='px'
        onChange={width => set({ width })}
      />
      {hasImage && (
        <RangeField
          label='Image height'
          value={config.height}
          min={0}
          max={400}
          suffix={config.height === 0 ? 'auto' : 'px'}
          onChange={height => set({ height })}
        />
      )}
    </Box>
  )
}

const ElementsSection = ({ config, set }) => (
  <Box>
    {ELEMENT_GROUPS.map(group =>
      group.fields.map(({ id, label }) => (
        <CheckboxWrap key={id}>
          <input
            type='checkbox'
            checked={!!config.elements[id]}
            onChange={e =>
              set({ elements: { ...config.elements, [id]: e.target.checked } })}
          />
          <FieldLabel>{label}</FieldLabel>
        </CheckboxWrap>
      ))
    )}
    <CheckboxWrap>
      <input
        type='checkbox'
        checked={!!config.metaBefore}
        onChange={e => set({ metaBefore: e.target.checked })}
      />
      <FieldLabel>Site name above title</FieldLabel>
    </CheckboxWrap>
  </Box>
)

const FrameSection = ({ config, set }) => (
  <Box>
    <RangeField
      label='Border'
      value={config.border}
      min={0}
      max={8}
      suffix='px'
      onChange={border => set({ border })}
    />
    <RangeField
      label='Radius'
      value={config.radius}
      min={0}
      max={32}
      suffix='px'
      onChange={radius => set({ radius })}
    />
    <SelectRow
      label='Shadow'
      options={SHADOW_OPTIONS}
      value={config.shadow}
      onChange={shadow => set({ shadow })}
    />
    <ColorRow
      label='Shadow color'
      value={config.shadowColor}
      onChange={shadowColor => set({ shadowColor })}
    />
  </Box>
)

const TypographySection = ({ config, set }) => (
  <Box>
    <SelectRow
      label='Typeface'
      options={FONT_FAMILY_OPTIONS}
      value={config.fontBase}
      onChange={fontBase => set({ fontBase })}
    />
    <SelectRow
      label='Weight'
      options={FONT_WEIGHT_OPTIONS}
      value={config.fontWeight}
      onChange={fontWeight => set({ fontWeight })}
    />
    <RangeField
      label='Line height'
      value={config.lineHeight}
      min={1}
      max={2}
      step={0.1}
      onChange={lineHeight => set({ lineHeight })}
    />
    <RangeField
      label='Headline size'
      value={config.headlineSize}
      min={10}
      max={32}
      suffix='px'
      onChange={headlineSize => set({ headlineSize })}
    />
    <RangeField
      label='Description size'
      value={config.descriptionSize}
      min={8}
      max={24}
      suffix='px'
      onChange={descriptionSize => set({ descriptionSize })}
    />
    <RangeField
      label='Meta size'
      value={config.metaSize}
      min={8}
      max={20}
      suffix='px'
      onChange={metaSize => set({ metaSize })}
    />
  </Box>
)

const ColorsSection = ({ config, set }) => {
  const themeKey = config.theme === 'dark' ? 'darkColors' : 'lightColors'
  const palette = config[themeKey]
  return (
    <Box>
      <SegmentedField
        options={THEME_OPTIONS}
        value={config.theme}
        onChange={t => set({ theme: t })}
      />
      {COLOR_FIELDS.map(({ id, label }) => (
        <ColorRow
          key={id}
          label={label}
          value={palette[id]}
          onChange={value => set({ [themeKey]: { ...palette, [id]: value } })}
        />
      ))}
    </Box>
  )
}

const SECTIONS = [
  { id: 'layout', label: 'Layout', Component: LayoutSection },
  { id: 'elements', label: 'Elements', Component: ElementsSection },
  { id: 'frame', label: 'Frame', Component: FrameSection },
  { id: 'fonts', label: 'Typography', Component: TypographySection },
  { id: 'colors', label: 'Colors', Component: ColorsSection }
]

const Section = ({ label, isOpen, onToggle, children }) => (
  <SectionDivider>
    <SectionHeader $open={isOpen} aria-expanded={isOpen} onClick={onToggle}>
      {label}
      <ChevronDown size={16} />
    </SectionHeader>
    {isOpen && <SectionBody>{children}</SectionBody>}
  </SectionDivider>
)

/* ─── Omnibar ──────────────────────────────────────────── */

const Omnibar = ({ url, setUrl, onSubmit, isLoading }) => {
  const [error, setError] = useState('')

  const handleSubmit = useCallback(() => {
    // An empty submit previews the placeholder URL rather than erroring.
    const next = prependHttp((url || '').trim() || DEFAULT_URL)
    if (!isUrl(next)) {
      setError('Please enter a valid URL (e.g. stripe.com)')
      return
    }
    setError('')
    setUrl(next)
    onSubmit(next)
  }, [url, setUrl, onSubmit])

  return (
    <Box css={{ width: '100%' }}>
      <OmniboxWrapper>
        <OmniboxInput
          type='url'
          inputMode='url'
          placeholder={DEFAULT_URL}
          value={url}
          onChange={e => {
            setUrl(e.target.value)
            if (error) setError('')
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              if (!isLoading) handleSubmit()
            }
          }}
          aria-invalid={!!error}
        />
        <OmniboxButton
          onClick={handleSubmit}
          disabled={isLoading}
          aria-label='Fetch preview'
        >
          <span className='btn-label'>
            {isLoading ? 'Fetching…' : 'Preview'}
          </span>
          <ArrowRight size={16} />
        </OmniboxButton>
      </OmniboxWrapper>
      {error && (
        <Text
          role='alert'
          css={theme({ color: 'fullscreen', fontSize: 0, pt: 1, pl: 3 })}
        >
          {error}
        </Text>
      )}
    </Box>
  )
}

/* ─── Builder ──────────────────────────────────────────── */

const Builder = () => {
  const [stored, setStored] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    BUILDER_DEFAULT_CONFIG
  )
  // Deep-merge the nested objects so a config saved by an older version (which
  // may be missing element/color keys added later) backfills from the defaults
  // instead of shallow-replacing them.
  const config = useMemo(
    () => ({
      ...BUILDER_DEFAULT_CONFIG,
      ...stored,
      elements: { ...BUILDER_DEFAULT_CONFIG.elements, ...stored?.elements },
      lightColors: {
        ...BUILDER_DEFAULT_CONFIG.lightColors,
        ...stored?.lightColors
      },
      darkColors: {
        ...BUILDER_DEFAULT_CONFIG.darkColors,
        ...stored?.darkColors
      }
    }),
    [stored]
  )

  const [url, setUrl] = useState('')
  const [data, setData] = useState(SAMPLE_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  // Accordion: only the Layout section starts open; the rest start collapsed.
  const [openSections, setOpenSections] = useState(['layout'])

  const toggleSection = useCallback(
    id =>
      setOpenSections(prev =>
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      ),
    []
  )

  const set = useCallback(
    patch =>
      setStored(prev => ({ ...BUILDER_DEFAULT_CONFIG, ...prev, ...patch })),
    [setStored]
  )

  const reset = useCallback(
    () => setStored(BUILDER_DEFAULT_CONFIG),
    [setStored]
  )

  // The variant is derived from the size + image-position axes.
  const resolvedConfig = useMemo(
    () => ({ ...config, variant: deriveVariant(config) }),
    [config]
  )

  const previewHtml = useMemo(
    () => buildCardHtml(data, resolvedConfig),
    [data, resolvedConfig]
  )

  const snippets = useMemo(() => {
    const out = {}
    for (const [name, generate] of Object.entries(GENERATORS)) {
      out[name] = generate(resolvedConfig)
    }
    return out
  }, [resolvedConfig])

  const handleFetch = useCallback(async nextUrl => {
    setIsLoading(true)
    setError('')
    try {
      const { data } = await mql(nextUrl, { palette: true })
      setData(data)
    } catch (err) {
      setError('Could not fetch that URL. Keeping the current preview.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <Root>
      <Content>
        <Box css={theme({ maxWidth: '720px', mx: 'auto', pb: 4 })}>
          <Omnibar
            url={url}
            setUrl={setUrl}
            onSubmit={handleFetch}
            isLoading={isLoading}
          />
          {error && (
            <Text css={theme({ color: 'black40', fontSize: 0, pt: 2, pl: 3 })}>
              {error}
            </Text>
          )}
        </Box>

        {/* Settings — a docked rail on the left on wide screens, an inline card
            above the preview once the layout stacks */}
        <RailDock>
          <SettingsRail>
            <Box css={theme({ px: 3 })}>
              {SECTIONS.map(({ id, label, Component }) => (
                <Section
                  key={id}
                  label={label}
                  isOpen={openSections.includes(id)}
                  onToggle={() => toggleSection(id)}
                >
                  <Component config={config} set={set} />
                </Section>
              ))}
            </Box>
            <Flex
              css={theme({
                px: 3,
                py: 2,
                borderTop: 1,
                borderColor: 'black05'
              })}
              style={{ justifyContent: 'flex-end' }}
            >
              <GhostButton onClick={reset}>
                <RotateCcw size={13} />
                Reset
              </GhostButton>
            </Flex>
          </SettingsRail>
        </RailDock>

        {/* Preview — centered, using the full width of the column */}
        <Card css={{ display: 'flex', flexDirection: 'column' }}>
          <PreviewStage>
            <Box
              css={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Box dangerouslySetInnerHTML={{ __html: previewHtml }} />
            </Box>
          </PreviewStage>
        </Card>

        {/* Generated component */}
        <Box css={theme({ pt: [4, 4, 5, 5] })}>
          <SectionLabel>Component code</SectionLabel>
          <Text css={theme({ fontSize: 1, color: 'black60', pb: 3 })}>
            A single self-contained file — no SDK, no build step, no npm
            install. Pick your framework, copy it in, and render it with a{' '}
            <InlineCode>url</InlineCode>.
          </Text>
          {/* `maxHeight` keeps the snippet in a scrollable, fade-edged box
              instead of one enormous block — the runtime renderer is long. */}
          <MultiCodeEditor
            autoHeight
            languages={snippets}
            download={FILENAMES}
            aliases={HIGHLIGHT_ALIASES}
            style={{ maxHeight: 460 }}
          />
          <Flex
            css={theme({
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              mt: 3,
              px: 3,
              py: 2,
              borderRadius: '10px'
            })}
            style={{ background: colors.black05, flexWrap: 'wrap' }}
          >
            <CheckboxWrap>
              <input
                type='checkbox'
                checked={!!config.tailwind}
                onChange={e => set({ tailwind: e.target.checked })}
              />
              <FieldLabel style={{ fontWeight: 600 }}>
                Use Tailwind CSS classes
              </FieldLabel>
            </CheckboxWrap>
            <Text
              css={theme({ fontFamily: 'sans', fontSize: 0, color: 'black40' })}
            >
              Every framework except Vanilla JS
            </Text>
          </Flex>
        </Box>

        {/* Usage */}
        <Box css={theme({ pt: [4, 4, 5, 5] })}>
          <SectionLabel>Usage</SectionLabel>
          <Text css={theme({ fontSize: 1, color: 'black60', pb: 2 })}>
            The component is self-contained: pass a <InlineCode>url</InlineCode>{' '}
            and it fetches the metadata from Microlink and renders the card. Add
            an <InlineCode>apiKey</InlineCode> to go Pro. These are the only
            props it accepts:
          </Text>
          <Box css={theme({ pt: 1 })}>
            {COMPONENT_PROPS.map(({ name, type, required, description }) => (
              <PropRow key={name}>
                <PropName>
                  <InlineCode>{name}</InlineCode>
                  <PropPill $required={required}>
                    {required ? 'required' : 'optional'}
                  </PropPill>
                </PropName>
                <Box css={{ flex: 1, minWidth: 0 }}>
                  <Text
                    css={theme({
                      fontFamily: 'mono',
                      fontSize: 0,
                      color: 'black40',
                      pb: 1
                    })}
                  >
                    {type}
                  </Text>
                  <Text css={theme({ fontSize: 1, color: 'black80' })}>
                    {description}
                  </Text>
                </Box>
              </PropRow>
            ))}
          </Box>
        </Box>
      </Content>
    </Root>
  )
}

export default Builder
