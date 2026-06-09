import { colors, theme, transition } from 'theme'
import React, { useCallback, useMemo, useState } from 'react'
import { ArrowRight, RotateCcw } from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import mql from '@microlink/mql'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import MultiCodeEditor from 'components/patterns/MultiCodeEditor/MultiCodeEditor'
import { useLocalStorage } from 'components/hook/use-local-storage'
import { cdnUrl } from 'helpers/cdn-url'
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
import { GENERATORS } from './generators'
import { MOBILE_BP } from 'components/pages/screenshot'

/* ─── Config ───────────────────────────────────────────── */

const LOCAL_STORAGE_KEY = 'builder-config'

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
  height: 0
}

const TABS = [
  { id: 'layout', label: 'Layout' },
  { id: 'frame', label: 'Frame' },
  { id: 'fonts', label: 'Fonts' },
  { id: 'colors', label: 'Colors' }
]

// Shown in the live preview before (and if) the user fetches a real URL.
const SAMPLE_DATA = {
  url: 'https://microlink.io',
  title: 'Microlink — Turn websites into data',
  description:
    'Enter a URL, receive structured data. Get relevant information from any website, take a screenshot, or turn it into a PDF.',
  publisher: 'Microlink',
  author: null,
  date: null,
  image: { url: cdnUrl('banner/sdk.jpeg'), palette: ['#e94560'] },
  logo: { url: 'https://icons.duckduckgo.com/ip3/microlink.io.ico' }
}

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

const Tab = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold',
    px: 2,
    py: '12px',
    cursor: 'pointer'
  })}
  background: transparent;
  border: none;
  color: ${({ $active }) => ($active ? colors.black : colors.black60)};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? colors.link : 'transparent')};
  margin-bottom: -1px;
  transition: color ${transition.short}, border-color ${transition.short};

  &:hover {
    color: ${colors.black};
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

const Grid = styled(Flex)`
  ${theme({ gap: 3 })}
  flex-direction: column;
  align-items: stretch;

  @media (min-width: ${MOBILE_BP}px) {
    flex-direction: row;
  }
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

const LayoutTab = ({ config, set }) => (
  <Box>
    <SegmentedField
      label='Size'
      options={SIZE_OPTIONS}
      value={config.size}
      onChange={size => set({ size, ...SIZE_PRESETS[size] })}
    />
    <SegmentedField
      label='Image position'
      options={IMAGE_POSITION_OPTIONS}
      value={config.imagePosition}
      onChange={imagePosition => set({ imagePosition })}
    />
    <RangeField
      label='Width'
      value={config.width}
      min={280}
      max={680}
      suffix='px'
      onChange={width => set({ width })}
    />
    <RangeField
      label='Image height'
      value={config.height}
      min={0}
      max={400}
      suffix={config.height === 0 ? 'auto' : 'px'}
      onChange={height => set({ height })}
    />
    <SectionLabel>Elements</SectionLabel>
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

const FrameTab = ({ config, set }) => (
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

const FontsTab = ({ config, set }) => (
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

const ColorsTab = ({ config, set }) => {
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

const TAB_COMPONENTS = {
  layout: LayoutTab,
  frame: FrameTab,
  fonts: FontsTab,
  colors: ColorsTab
}

/* ─── Omnibar ──────────────────────────────────────────── */

const Omnibar = ({ url, setUrl, onSubmit, isLoading }) => {
  const [error, setError] = useState('')

  const handleSubmit = useCallback(() => {
    const next = prependHttp((url || '').trim())
    if (!next || !isUrl(next)) {
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
          placeholder='Paste a URL to preview…'
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
  const config = useMemo(
    () => ({ ...BUILDER_DEFAULT_CONFIG, ...stored }),
    [stored]
  )

  const [url, setUrl] = useState('')
  const [data, setData] = useState(SAMPLE_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('layout')

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
      setError('Could not fetch that URL. Showing the sample preview.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const ActiveTab = TAB_COMPONENTS[tab]

  return (
    <Box css={{ width: '100%' }}>
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

      <Grid>
        {/* Editor */}
        <Card
          css={theme({
            width: ['100%', '100%', '380px', '380px'],
            flexShrink: 0
          })}
        >
          <Flex
            css={theme({ px: 3, borderBottom: 1, borderColor: 'black05' })}
            style={{ gap: 4 }}
          >
            {TABS.map(({ id, label }) => (
              <Tab key={id} $active={tab === id} onClick={() => setTab(id)}>
                {label}
              </Tab>
            ))}
          </Flex>
          <Box css={theme({ px: 3, py: 2 })}>
            <ActiveTab config={config} set={set} />
          </Box>
          <Flex
            css={theme({ px: 3, py: 2, borderTop: 1, borderColor: 'black05' })}
            style={{ justifyContent: 'flex-end' }}
          >
            <GhostButton onClick={reset}>
              <RotateCcw size={13} />
              Reset
            </GhostButton>
          </Flex>
        </Card>

        {/* Preview */}
        <Card
          css={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <PreviewStage>
            <Box
              css={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Box dangerouslySetInnerHTML={{ __html: previewHtml }} />
            </Box>
          </PreviewStage>
        </Card>
      </Grid>

      {/* Generated component */}
      <Box css={theme({ pt: 4 })}>
        <SectionLabel>Copy your component</SectionLabel>
        <MultiCodeEditor autoHeight languages={snippets} />
      </Box>
    </Box>
  )
}

export default Builder
