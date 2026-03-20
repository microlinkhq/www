import { borders, colors, layout, theme, transition, space } from 'theme'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  Globe,
  ArrowRight,
  HelpCircle,
  FileText,
  Settings,
  Download,
  Clipboard,
  Check,
  Loader,
  Edit2,
  Save,
  Code,
  ChevronDown,
  X
} from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled, { keyframes } from 'styled-components'
import mql from '@microlink/mql'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import { Button } from 'components/elements/Button/Button'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Tooltip from 'components/patterns/Tooltip/Tooltip'
import { Pencil } from 'components/icons/PencilLine'
import NerdStatsOverlay, {
  NerdStatsToggle,
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import { useClipboard } from 'components/hook/use-clipboard'
import { useLocalStorage } from 'components/hook/use-local-storage'
import { withTitle } from 'helpers/hoc/with-title'

import {
  OptionLabel,
  CheckboxLabel,
  StepCard,
  SectionIcon,
  UseCaseCard,
  FadeIn,
  ActionButton,
  HistoryScrollContainer,
  MOBILE_BP
} from 'components/pages/screenshot'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ─── Constants ────────────────────────────────────────── */

const MAX_MARKDOWN_HISTORY = 20
const PREVIEW_HEIGHT = '450px'
const PREVIEW_HEIGHT_MOBILE = '400px'

const RE_EXCESS_NEWLINES = /\n{3,}/g
const RE_BLANK_LINES = /^[\t ]+$/gm
const RE_WWW_PREFIX = /^www\./

const cleanMarkdown = raw =>
  raw.replace(RE_EXCESS_NEWLINES, '\n\n').replace(RE_BLANK_LINES, '').trim()

const FEATURES_LIST = [
  {
    title: 'Fast CDN Delivery',
    description:
      'Web to markdown conversion served via a global CDN with 240+ edge locations. Lightning-fast URL to md delivery anywhere in the world.'
  },
  {
    title: 'Smart Caching',
    description:
      "Automatic edge caching with configurable TTL. Cached URL to markdown responses are free and don't count against your plan."
  },
  {
    title: 'Zero-Config API',
    description:
      'Convert any URL to a markdown file with a simple REST call. No browsers to manage, no infrastructure to maintain.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a URL',
    description:
      'Enter any website URL — blogs, docs, SPAs, or JavaScript-rendered pages.'
  },
  {
    icon: Settings,
    title: 'Set Options',
    description:
      'Block ads, target specific HTML selectors, or enable full-page rendering for dynamic content.'
  },
  {
    icon: FileText,
    title: 'Get Markdown',
    description:
      'Hit Convert and get clean, structured markdown from the web page in seconds.'
  },
  {
    icon: Download,
    title: 'Edit, Copy & Download',
    description:
      'Edit the result inline, copy to clipboard, or download as a .md file. Your history is saved locally.'
  }
]

const REASON_TO_USE = [
  {
    title: 'Clean Markdown Output',
    description:
      'Convert any webpage to well-structured markdown. Headings, lists, links, images, code blocks, and tables are all preserved with proper formatting.'
  },
  {
    title: 'Works on Any Website',
    description: (
      <>
        Static sites, SPAs, JavaScript-rendered pages — it handles them all.
        Enable{' '}
        <Link href='/docs/guides/markdown/choosing-scope'>prerendering</Link>{' '}
        for client-side apps.
      </>
    )
  },
  {
    title: 'Target Specific Content',
    description: (
      <>
        Extract the full page by default, or use an HTML selector to target
        specific sections. All matching elements are joined automatically.{' '}
        <Link href='/docs/guides/markdown/choosing-scope'>
          Learn about choosing scope
        </Link>
        .
      </>
    )
  },
  {
    title: 'Edit Before Saving',
    description:
      'Edit the extracted markdown directly in the browser. Fix formatting, remove sections, or add notes — then save, copy, or download the final version.'
  },
  {
    title: 'Free + No Login',
    description:
      'Free website to markdown tool with 50 conversions per day. No account needed, no branding, no strings attached.'
  },
  {
    title: 'API Integration Ready',
    description: (
      <>
        Built on the <Link href='/markdown'>Microlink Markdown API</Link>.
        Integrate with any language via REST or the{' '}
        <Link href='https://www.npmjs.com/package/@microlink/mql'>
          @microlink/mql
        </Link>{' '}
        SDK.
      </>
    )
  }
]

const USE_CASES = [
  {
    title: 'For AI & LLM Pipelines',
    items: [
      'Turn any URL into markdown context for AI agents',
      'Build RAG pipelines with clean web-to-markdown extraction',
      'Cut token costs with structured markdown instead of raw HTML',
      'Automate web research and feed results into LLM workflows'
    ],
    link: {
      href: '/docs/guides/markdown',
      alt: 'Markdown extraction guide',
      text: 'Read the markdown guide'
    }
  },
  {
    title: 'For Content Teams',
    items: [
      'Migrate web pages to markdown-based CMS platforms',
      'Archive webpages as portable .md files',
      'Repurpose blog posts, articles, and documentation',
      'Edit extracted markdown before exporting'
    ],
    link: {
      href: '/docs/guides/markdown/choosing-scope',
      alt: 'Choosing scope guide for targeted extraction',
      text: 'Learn about scope options'
    }
  },
  {
    title: 'For Developers',
    items: [
      'Automate URL to markdown file conversion via API',
      'Build content pipelines with clean, structured data',
      'Convert web documentation to markdown files at scale',
      'Integrate into CI/CD for automated content syncing'
    ],
    link: {
      href: '/markdown',
      alt: 'Markdown API landing page',
      text: 'Explore the Markdown API'
    }
  }
]

/* ─── Page-specific Styled Components ──────────────────── */

const PaperSheet = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: #fff;
  border: 1px solid ${colors.black10};
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);
`

const markdownTextStyles = `
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.8);
  white-space: pre-wrap;
  word-break: break-word;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${colors.black10} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.black10};
    border-radius: 3px;
  }
`

const MarkdownPre = styled.pre`
  ${theme({ m: 0, p: 4 })}
  ${markdownTextStyles}
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`

const MarkdownTextarea = styled.textarea`
  ${theme({ m: 0, p: 4 })}
  ${markdownTextStyles}
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  background: #fffff8;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
  }
`

const SaveBadge = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold'
  })}
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid ${colors.black10};
  background: white;
  color: ${colors.black60};
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: background ${transition.short}, color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    background: ${colors.black};
    color: white;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalBox = styled(Box)`
  ${theme({
    bg: 'white',
    borderRadius: '12px',
    p: 4,
    fontFamily: 'sans'
  })}
  width: 380px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
`

const ModalTitle = styled(Text)`
  ${theme({
    fontSize: 2,
    fontWeight: 'bold',
    color: 'black80',
    pb: 2
  })}
`

const ModalDesc = styled(Text)`
  ${theme({
    fontSize: 1,
    color: 'black60',
    pb: 4
  })}
`

const ModalActions = styled(Flex)`
  ${theme({ gap: 2 })}
  justify-content: flex-end;
`

const ModalBtn = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    borderRadius: '6px',
    cursor: 'pointer'
  })}
  padding: 8px 16px;
  border: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: opacity ${transition.short};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const UnsavedChangesModal = ({ onSave, onDiscard, onClose }) => (
  <ModalBackdrop onClick={onClose}>
    <ModalBox onClick={e => e.stopPropagation()}>
      <Flex css={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <ModalTitle>Unsaved changes</ModalTitle>
        <Box
          as='button'
          type='button'
          onClick={onClose}
          css={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: colors.black40,
            padding: 0,
            lineHeight: 1,
            '&:hover': { color: colors.black80 }
          }}
          aria-label='Close'
        >
          <X size={18} />
        </Box>
      </Flex>
      <ModalDesc>You have unsaved edits. What would you like to do?</ModalDesc>
      <ModalActions>
        <ModalBtn
          onClick={onDiscard}
          css={{
            background: 'transparent',
            color: colors.black60,
            '&:hover': { opacity: 0.7 }
          }}
        >
          Don't save
        </ModalBtn>
        <ModalBtn
          onClick={onSave}
          css={{
            background: colors.black,
            color: 'white',
            '&:hover': { opacity: 0.85 }
          }}
        >
          Save changes
        </ModalBtn>
      </ModalActions>
    </ModalBox>
  </ModalBackdrop>
)

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const SpinningLoader = styled(Loader)`
  animation: ${spinAnimation} 1s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const pencilSpin = keyframes`
  0% { transform: rotate(0deg); }
  75% { transform: rotate(360deg); }
  100% { transform: rotate(360deg); }
`

const PencilAnimated = styled.div`
  animation: ${pencilSpin} 1.2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const LoadingDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${colors.black30};
  animation: ${keyframes`
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
  `} 1.4s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.5;
  }
`

const SelectorInput = styled.input`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    px: 2,
    py: '7px',
    borderRadius: '6px',
    border: 1,
    borderColor: 'black10',
    color: 'black80'
  })}
  width: 100%;
  min-width: 0;
  background: white;

  &::placeholder {
    color: ${colors.black30};
  }

  &:focus {
    outline: none;
    border-color: ${colors.link};
    box-shadow: 0 0 0 1px ${colors.link};
  }

  &:focus-visible {
    outline: none;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    font-size: 16px;
    min-height: 44px;
  }
`

const AdvancedToggle = styled(Flex).attrs({ as: 'button', type: 'button' })`
  ${theme({
    alignItems: 'center',
    gap: '6px',
    py: 2,
    px: 0,
    fontSize: 0,
    fontWeight: 'bold',
    fontFamily: 'sans',
    color: 'black60',
    cursor: 'pointer'
  })}
  background: none;
  border: none;
  width: 100%;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: ${colors.black80};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  svg {
    transition: transform 200ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }
  }
`

/* ─── Omnibox + Settings Popover ──────────────────────── */

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
  transition: border-color ${transition.medium}, box-shadow ${transition.medium};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:focus-within {
    border-color: ${colors.black20};
  }
`

const OmniboxInput = styled.input`
  ${theme({
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    color: 'black80'
  })}
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  padding: 8px 4px;

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }

  &::placeholder {
    color: ${colors.black30};
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    font-size: 16px;
  }
`

const OmniboxConvertButton = styled(Box).attrs({
  as: 'button',
  type: 'button'
})`
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
  transition: transform ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    padding: 10px 14px;

    .omnibox-btn-label {
      display: none;
    }
  }
`

const SettingsIconButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    borderRadius: '50%',
    cursor: 'pointer',
    color: 'black50',
    flexShrink: 0
  })}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  transition: background ${transition.short}, color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  position: relative;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    background: ${colors.black05};
    color: ${colors.black80};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const PopoverBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99;

  @media (max-width: ${MOBILE_BP - 1}px) {
    background: rgba(0, 0, 0, 0.3);
  }
`

const popoverEnter = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`

const PopoverPanel = styled(Box)`
  ${theme({
    bg: 'white',
    borderRadius: 3,
    border: 1,
    borderColor: 'black10',
    p: 3,
    fontFamily: 'sans'
  })}
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 100;
  width: 340px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  animation: ${popoverEnter} 200ms cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: ${MOBILE_BP - 1}px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    border-radius: 16px 16px 0 0;
    padding-bottom: calc(${space[3]} + env(safe-area-inset-bottom));
    animation: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ActiveDot = styled.span`
  position: absolute;
  top: 7px;
  right: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #8b5cf6;
  pointer-events: none;
`

const SettingsPopover = ({
  options,
  setOptions,
  showAdvanced,
  setShowAdvanced
}) => (
  <PopoverPanel onClick={e => e.stopPropagation()}>
    <CheckboxLabel>
      <input
        type='checkbox'
        checked={options.adblock}
        onChange={e =>
          setOptions(prev => ({
            ...prev,
            adblock: e.target.checked
          }))
        }
      />
      <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
        Block ads and banners
      </Text>
      <Tooltip
        content={
          <Tooltip.Content>
            Removes ads and cookie banners before extraction
          </Tooltip.Content>
        }
      >
        <HelpCircle
          size={16}
          color={colors.black60}
          style={{ marginLeft: '6px', marginTop: '5px' }}
        />
      </Tooltip>
    </CheckboxLabel>

    <CheckboxLabel>
      <input
        type='checkbox'
        checked={options.cache}
        onChange={e =>
          setOptions(prev => ({
            ...prev,
            cache: e.target.checked
          }))
        }
      />
      <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
        Use cache
      </Text>
      <Tooltip
        content={
          <Tooltip.Content>
            Uses cached markdown if available, otherwise generates fresh
          </Tooltip.Content>
        }
      >
        <HelpCircle
          size={16}
          color={colors.black60}
          style={{ marginLeft: '6px', marginTop: '5px' }}
        />
      </Tooltip>
    </CheckboxLabel>

    <Box css={theme({ pt: 2, borderTop: 1, borderColor: 'black05', mt: 2 })}>
      <AdvancedToggle
        onClick={() => setShowAdvanced(prev => !prev)}
        aria-expanded={showAdvanced}
        aria-controls='md-advanced-options'
      >
        <ChevronDown
          size={16}
          style={{
            transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
        Advanced options
      </AdvancedToggle>

      {showAdvanced ? (
        <Box id='md-advanced-options' css={theme({ pt: 1 })}>
          <CheckboxLabel>
            <input
              type='checkbox'
              checked={options.waitForLoad}
              onChange={e =>
                setOptions(prev => ({
                  ...prev,
                  waitForLoad: e.target.checked
                }))
              }
            />
            <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
              Wait for all the elements to load
            </Text>
            <Tooltip
              content={
                <Tooltip.Content>
                  Renders the page in a real browser and waits for every
                  resource to load — slower but sees all content including
                  lazy-loaded elements, SPAs, and client-side rendered pages
                </Tooltip.Content>
              }
            >
              <HelpCircle
                size={16}
                color={colors.black60}
                style={{ marginLeft: '6px', marginTop: '5px' }}
              />
            </Tooltip>
          </CheckboxLabel>

          <Box css={theme({ pt: 2 })}>
            <Flex css={{ alignItems: 'center', gap: '6px' }}>
              <OptionLabel as='span'>HTML Selector</OptionLabel>
              <Tooltip
                content={
                  <Tooltip.Content>
                    Target specific elements on the page using a CSS selector.
                    When set, the tool matches <b>all</b> elements and joins
                    their markdown with a line break — useful for repeating
                    structures like article lists, cards, or table rows.
                  </Tooltip.Content>
                }
              >
                <HelpCircle
                  size={16}
                  color={colors.black60}
                  style={{ marginTop: '1px', cursor: 'help', flexShrink: 0 }}
                />
              </Tooltip>
            </Flex>
            <SelectorInput
              id='md-selector'
              type='text'
              placeholder='article, main, .content…'
              value={options.customSelector}
              onChange={e =>
                setOptions(prev => ({
                  ...prev,
                  customSelector: e.target.value
                }))
              }
              spellCheck={false}
              autoComplete='off'
              aria-label='HTML selector to target specific content'
            />
          </Box>
        </Box>
      ) : null}
    </Box>
  </PopoverPanel>
)

/* ─── Animated Results Wrapper ────────────────────────── */

const ResultsExpandWrapper = styled(Box).withConfig({
  shouldForwardProp: prop => !['$expanded'].includes(prop)
})`
  display: grid;
  transition: grid-template-rows 500ms cubic-bezier(0.4, 0, 0.2, 1);
  grid-template-rows: ${({ $expanded }) => ($expanded ? '1fr' : '0fr')};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const ResultsExpandInner = styled(Box)`
  overflow: hidden;
  min-height: 0;
`

const MARKDOWN_HISTORY_KEY = 'markdown-history'

const HistoryCard = styled(Box).withConfig({
  shouldForwardProp: prop => !['$active'].includes(prop)
})`
  position: relative;
  flex-shrink: 0;
  width: 250px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  scroll-snap-align: start;
  background: white;
  border: 2px solid ${({ $active }) => ($active ? colors.link : colors.black10)};
  transition: border-color ${transition.medium}, box-shadow ${transition.medium},
    transform ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    border-color: ${({ $active }) => ($active ? colors.link : colors.black20)};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const HistoryCardContent = styled(Box)`
  ${theme({
    p: 2,
    fontFamily: 'mono',
    fontSize: '10px',
    lineHeight: 1,
    color: 'black50'
  })}
  height: 100%;
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-word;
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
`

const HistoryCardUrl = styled(Text)`
  ${theme({
    fontSize: 0,
    fontWeight: 'bold',
    fontFamily: 'sans',
    color: 'black80',
    pb: 1
  })}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const HistoryDeleteButton = styled(Box).attrs({
  as: 'button',
  type: 'button'
})`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.9);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${transition.short}, background ${transition.short};
  z-index: 1;
  padding: 0;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${HistoryCard}:hover &,
  ${HistoryCard}:focus-within & {
    opacity: 1;
  }

  &:hover {
    background: rgba(185, 28, 28, 1);
  }

  &:focus-visible {
    opacity: 1;
    outline: 2px solid white;
    outline-offset: 1px;
  }
`

const EditedTag = styled.span`
  ${theme({
    fontFamily: 'sans',
    fontSize: '9px',
    fontWeight: 'bold',
    color: 'white',
    borderRadius: '4px'
  })}
  position: absolute;
  bottom: 6px;
  left: 6px;
  padding: 2px 6px;
  background: ${colors.link};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 1;
  pointer-events: none;
`

const HistoryCardAction = styled(Box).attrs({
  as: 'button',
  type: 'button'
})`
  position: absolute;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${transition.short}, background ${transition.short};
  z-index: 1;
  padding: 0;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${HistoryCard}:hover &,
  ${HistoryCard}:focus-within & {
    opacity: 1;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &:focus-visible {
    opacity: 1;
    outline: 2px solid white;
    outline-offset: 1px;
  }
`

/* ─── Markdown History ─────────────────────────────────── */

const MarkdownHistory = ({
  entries,
  activeId,
  onSelect,
  onDelete,
  onCopy,
  onDownload,
  disabled
}) => {
  const scrollRef = useRef(null)
  const prevFirstIdRef = useRef(null)
  const [copiedId, setCopiedId] = useState(null)
  const [downloadedId, setDownloadedId] = useState(null)

  const handleCopy = useCallback(
    (e, entry) => {
      e.stopPropagation()
      if (disabled) return
      onCopy(entry)
      setCopiedId(entry.id)
      setTimeout(() => setCopiedId(null), 1500)
    },
    [disabled, onCopy]
  )

  const handleDownload = useCallback(
    (e, entry) => {
      e.stopPropagation()
      if (disabled) return
      onDownload(entry)
      setDownloadedId(entry.id)
      setTimeout(() => setDownloadedId(null), 1500)
    },
    [disabled, onDownload]
  )

  useEffect(() => {
    const firstId = entries?.[0]?.id
    if (firstId && firstId !== prevFirstIdRef.current && scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
    prevFirstIdRef.current = firstId
  }, [entries])

  if (!entries || entries.length === 0) return null

  return (
    <Box css={theme({ pt: [3, 3, 4, 4] })}>
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2
        })}
      >
        <Text
          css={theme({
            fontSize: 1,
            fontWeight: 'bold',
            color: 'black50',
            fontFamily: 'sans'
          })}
        >
          Recent conversions
        </Text>
      </Flex>
      <HistoryScrollContainer
        ref={scrollRef}
        role='list'
        aria-label='Conversion history'
      >
        {entries.map(entry => (
          <HistoryCard
            key={entry.id}
            role='listitem'
            $active={entry.id === activeId}
            tabIndex={disabled ? -1 : 0}
            aria-label={`Load markdown of ${entry.settings.url}`}
            aria-disabled={disabled || undefined}
            onClick={() => !disabled && onSelect(entry)}
            onKeyDown={e => {
              if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                onSelect(entry)
              }
            }}
            style={
              disabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined
            }
          >
            {entry.edited ? <EditedTag>edited</EditedTag> : null}
            <HistoryCardContent>
              <HistoryCardUrl>{entry.settings.url}</HistoryCardUrl>
              {entry.markdown?.slice(0, 300)}
            </HistoryCardContent>
            <HistoryCardAction
              aria-label={`Copy markdown of ${entry.settings.url}`}
              disabled={disabled || undefined}
              style={{ bottom: 8, right: 50 }}
              onClick={e => handleCopy(e, entry)}
            >
              {copiedId === entry.id ? (
                <Check size={15} />
              ) : (
                <Clipboard size={15} />
              )}
            </HistoryCardAction>
            <HistoryCardAction
              aria-label={`Download markdown of ${entry.settings.url}`}
              disabled={disabled || undefined}
              style={{ bottom: 8, right: 8 }}
              onClick={e => handleDownload(e, entry)}
            >
              {downloadedId === entry.id ? (
                <SpinningLoader size={15} />
              ) : (
                <Download size={15} />
              )}
            </HistoryCardAction>
            <HistoryDeleteButton
              aria-label={`Delete markdown of ${entry.settings.url}`}
              disabled={disabled || undefined}
              onClick={e => {
                e.stopPropagation()
                if (!disabled) onDelete(entry.id)
              }}
            >
              <X size={12} />
            </HistoryDeleteButton>
          </HistoryCard>
        ))}
      </HistoryScrollContainer>
    </Box>
  )
}

/* ─── Markdown Preview Display ─────────────────────────── */

const MarkdownPreviewDisplay = ({
  markdown,
  jsonData,
  isLoading,
  error,
  onRetry,
  nerdStats,
  mqlQuery,
  responseData,
  showNerdStats,
  onToggleNerdStats,
  isEditing,
  onToggleEdit,
  editedMarkdown,
  onEditChange,
  onSave,
  saveState
}) => {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const [copied, setCopied] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const currentMarkdown = isEditing ? editedMarkdown : markdown

  const ensureSavedThen = useCallback(
    action => {
      if (isEditing && editedMarkdown !== markdown) {
        onSave()
        setTimeout(() => action(editedMarkdown), 50)
      } else {
        action(currentMarkdown)
      }
    },
    [isEditing, editedMarkdown, markdown, onSave, currentMarkdown]
  )

  const handleCopy = useCallback(() => {
    ensureSavedThen(text => {
      toClipboard({
        copy: text || '',
        text: Tooltip.TEXT.COPIED('Markdown')
      })
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [ensureSavedThen, toClipboard])

  const handleDownload = useCallback(() => {
    ensureSavedThen(text => {
      if (!text) return
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `markdown-${Date.now()}.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 1500)
    })
  }, [ensureSavedThen])

  const displayContent = jsonData || markdown

  return (
    <PaperSheet
      css={{
        height: PREVIEW_HEIGHT_MOBILE,
        [`@media (min-width: ${MOBILE_BP}px)`]: {
          height: PREVIEW_HEIGHT
        }
      }}
    >
      <Choose>
        <Choose.When condition={isLoading}>
          <FadeIn
            key='loading'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1
            })}
          >
            <Box css={{ flex: '1 1 45%' }} />
            <Box css={{ color: colors.black80, marginBottom: space[3] }}>
              <PencilAnimated>
                <Pencil width='34' height='34' />
              </PencilAnimated>
            </Box>
            <Text
              css={theme({
                color: 'black80',
                fontSize: 2,
                fontFamily: 'sans'
              })}
              aria-live='polite'
            >
              Converting to markdown
            </Text>
            <Flex css={{ gap: '5px', marginTop: space[2] }}>
              <LoadingDot />
              <LoadingDot />
              <LoadingDot />
            </Flex>
            <Box css={{ flex: '1 1 55%' }} />
          </FadeIn>
        </Choose.When>

        <Choose.When condition={!!error}>
          <FadeIn
            key='error'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              px: 4,
              textAlign: 'center'
            })}
          >
            <Text css={theme({ color: 'fullscreen', fontSize: 3, pb: 3 })}>
              {error?.statusCode === 429 ? (
                <>
                  You've reached your free daily limit.
                  <Text css={theme({ fontSize: 2, color: 'black60' })}>
                    We allow 50 requests per day for free users.
                  </Text>
                </>
              ) : (
                error?.message || 'Something went wrong. Please try again.'
              )}
            </Text>
            {error?.statusCode !== 429 ? (
              <Button onClick={onRetry}>
                <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
              </Button>
            ) : null}
          </FadeIn>
        </Choose.When>

        <Choose.When condition={!!displayContent}>
          <FadeIn
            key='result'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0
            })}
          >
            <Box
              css={theme({
                flex: 1,
                minHeight: 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              })}
            >
              {isEditing ? (
                <SaveBadge onClick={onSave} aria-label='Save changes'>
                  {saveState === 'saved' ? (
                    <Check size={15} />
                  ) : (
                    <Save size={15} />
                  )}
                  {saveState === 'saved' ? 'Saved' : 'Save'}
                </SaveBadge>
              ) : null}
              {showNerdStats && nerdStats ? (
                <NerdStatsOverlay
                  stats={nerdStats}
                  mqlQuery={mqlQuery}
                  responseData={responseData}
                />
              ) : isEditing ? (
                <MarkdownTextarea
                  value={editedMarkdown}
                  onChange={e => onEditChange(e.target.value)}
                  spellCheck={false}
                  aria-label='Edit markdown content'
                />
              ) : (
                <MarkdownPre>
                  <code>{displayContent}</code>
                </MarkdownPre>
              )}
            </Box>

            <Flex
              css={theme({
                p: 3,
                gap: 2,
                flexShrink: 0,
                flexWrap: 'wrap'
              })}
              style={{
                borderTop: `1px solid ${colors.black05}`,
                background: '#fafafa'
              }}
            >
              <ActionButton
                as='button'
                type='button'
                onClick={handleCopy}
                css={theme({
                  bg: 'black',
                  color: 'white',
                  _hover: { bg: 'black80' }
                })}
              >
                {copied ? <Check size={15} /> : <Clipboard size={15} />}
                <Caps css={theme({ fontSize: 0 })}>
                  {copied ? 'Copied' : 'Copy'}
                </Caps>
              </ActionButton>

              <ActionButton
                as='button'
                type='button'
                onClick={handleDownload}
                css={theme({
                  bg: 'white',
                  color: 'black80',
                  border: 1,
                  borderColor: 'black10',
                  _hover: { bg: 'gray1', borderColor: 'black20' }
                })}
              >
                {downloaded ? (
                  <SpinningLoader size={15} />
                ) : (
                  <Download size={15} />
                )}
                <Caps css={theme({ fontSize: 0 })}>
                  {downloaded ? 'Saving' : 'Download'}
                </Caps>
              </ActionButton>

              <ActionButton
                as='button'
                type='button'
                onClick={onToggleEdit}
                css={theme({
                  bg: isEditing ? 'black' : 'white',
                  color: isEditing ? 'white' : 'black80',
                  border: 1,
                  borderColor: isEditing ? 'black' : 'black10',
                  _hover: isEditing
                    ? { bg: 'black80' }
                    : { bg: 'gray1', borderColor: 'black20' }
                })}
              >
                {isEditing ? <X size={15} /> : <Edit2 size={15} />}
                <Caps css={theme({ fontSize: 0 })}>
                  {isEditing ? 'Stop' : 'Edit'}
                </Caps>
              </ActionButton>

              {nerdStats ? (
                <NerdStatsToggle
                  active={showNerdStats}
                  onClick={onToggleNerdStats}
                />
              ) : null}
            </Flex>
          </FadeIn>
          <ClipboardComponent />
        </Choose.When>

        <Choose.Otherwise>{null}</Choose.Otherwise>
      </Choose>
    </PaperSheet>
  )
}

/* ─── Omnibar (replaces sidebar OptionsPanel) ─────────── */

const Omnibar = ({ options, setOptions, onSubmit, isLoading }) => {
  const [urlError, setUrlError] = useState('')
  const [showPopover, setShowPopover] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const popoverAnchorRef = useRef(null)

  const hasNonDefaultSettings =
    !options.adblock ||
    !options.cache ||
    options.waitForLoad ||
    options.customSelector.trim() !== ''

  const handleUrlChange = useCallback(
    e => {
      const val = e.target.value
      setOptions(prev => ({ ...prev, url: val }))
      setUrlError(prev => (prev ? '' : prev))
    },
    [setOptions]
  )

  const normalizeUrl = rawUrl => {
    const trimmed = rawUrl.trim()
    if (!trimmed) return ''
    return prependHttp(trimmed)
  }

  const handleSubmit = useCallback(() => {
    const url = normalizeUrl(options.url)
    if (!url || !isUrl(url)) {
      setUrlError('Please enter a valid URL (e.g., example.com)')
      return
    }

    setOptions(prev => ({ ...prev, url }))
    setUrlError('')
    setShowPopover(false)
    onSubmit(url)
  }, [options.url, onSubmit, normalizeUrl, setOptions])

  return (
    <Box css={{ width: '100%' }}>
      <OmniboxWrapper>
        <OmniboxInput
          id='md-url'
          type='url'
          inputMode='url'
          autoComplete='url'
          placeholder='Paste a URL…'
          value={options.url}
          onChange={handleUrlChange}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              if (!isLoading) handleSubmit()
            }
          }}
          aria-describedby={urlError ? 'md-url-error' : undefined}
          aria-invalid={!!urlError}
          style={{ order: 1 }}
        />

        <Box
          ref={popoverAnchorRef}
          css={{ position: 'relative', flexShrink: 0, order: 0 }}
        >
          <SettingsIconButton
            onClick={() => setShowPopover(prev => !prev)}
            aria-label='Conversion settings'
            aria-expanded={showPopover}
          >
            <Settings size={18} />
            {hasNonDefaultSettings ? <ActiveDot /> : null}
          </SettingsIconButton>
          {showPopover ? (
            <>
              <PopoverBackdrop onClick={() => setShowPopover(false)} />
              <SettingsPopover
                options={options}
                setOptions={setOptions}
                showAdvanced={showAdvanced}
                setShowAdvanced={setShowAdvanced}
              />
            </>
          ) : null}
        </Box>

        <OmniboxConvertButton
          onClick={handleSubmit}
          disabled={isLoading}
          style={{ order: 2 }}
        >
          <span className='omnibox-btn-label'>Convert</span>
          <ArrowRight size={16} />
        </OmniboxConvertButton>
      </OmniboxWrapper>
      {urlError ? (
        <Text
          id='md-url-error'
          role='alert'
          css={theme({ color: 'fullscreen', fontSize: 0, pt: 1, pl: 3 })}
        >
          {urlError}
        </Text>
      ) : null}
    </Box>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const MarkdownTool = () => {
  const [options, setOptions] = useState({
    url: '',
    customSelector: '',
    adblock: true,
    cache: true,
    waitForLoad: false
  })

  const [isLoading, setIsLoading] = useState(false)
  const [markdown, setMarkdown] = useState(null)
  const [error, setError] = useState(null)
  const [lastUrl, setLastUrl] = useState('')
  const [nerdStats, setNerdStats] = useState(null)
  const [mqlQuery, setMqlQuery] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [showNerdStats, setShowNerdStats] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedMarkdown, setEditedMarkdown] = useState('')
  const [saveState, setSaveState] = useState(null)
  const [showUnsavedModal, setShowUnsavedModal] = useState(false)
  const pendingActionRef = useRef(null)

  const [localStorageData] = useLocalStorage('mql-api-key')
  const [history, setHistory] = useLocalStorage(MARKDOWN_HISTORY_KEY, [])
  const [activeHistoryId, setActiveHistoryId] = useState(null)

  const safeHistory = Array.isArray(history) ? history : []

  const hasUnsavedEdits = isEditing && editedMarkdown !== markdown

  const persistEdits = useCallback(
    md => {
      setMarkdown(md)
      if (activeHistoryId) {
        setHistory(prev => {
          const items = Array.isArray(prev) ? prev : []
          return items.map(entry =>
            entry.id === activeHistoryId
              ? { ...entry, markdown: md, edited: true }
              : entry
          )
        })
      }
    },
    [activeHistoryId, setHistory]
  )

  const exitEditMode = useCallback(() => {
    setIsEditing(false)
    setSaveState(null)
  }, [])

  const guardUnsavedEdits = useCallback(
    action => {
      if (hasUnsavedEdits) {
        pendingActionRef.current = action
        setShowUnsavedModal(true)
        return true
      }
      return false
    },
    [hasUnsavedEdits]
  )

  const handleModalSave = useCallback(() => {
    persistEdits(editedMarkdown)
    exitEditMode()
    setShowUnsavedModal(false)
    const action = pendingActionRef.current
    pendingActionRef.current = null
    if (action) action()
  }, [persistEdits, editedMarkdown, exitEditMode])

  const handleModalDiscard = useCallback(() => {
    exitEditMode()
    setShowUnsavedModal(false)
    const action = pendingActionRef.current
    pendingActionRef.current = null
    if (action) action()
  }, [exitEditMode])

  const handleModalClose = useCallback(() => {
    setShowUnsavedModal(false)
    pendingActionRef.current = null
  }, [])

  const markdownRef = useRef(markdown)
  markdownRef.current = markdown

  const handleToggleEdit = useCallback(() => {
    if (isEditing) {
      if (hasUnsavedEdits) {
        guardUnsavedEdits(() => {})
        return
      }
      exitEditMode()
      return
    }
    setEditedMarkdown(markdownRef.current || '')
    setSaveState(null)
    setIsEditing(true)
  }, [isEditing, hasUnsavedEdits, guardUnsavedEdits, exitEditMode])

  const executeSubmit = useCallback(
    async url => {
      setIsLoading(true)
      setError(null)
      setMarkdown(null)
      setShowNerdStats(false)
      setIsEditing(false)
      setSaveState(null)
      setLastUrl(url)

      try {
        const selectorAll = options.customSelector.trim()
        const dataRule = selectorAll
          ? { selectorAll, attr: 'markdown' }
          : { attr: 'markdown' }

        const mqlOpts = {
          apiKey: localStorageData,
          meta: false,
          data: { markdown: dataRule },
          adblock: options.adblock,
          force: !options.cache
        }

        if (options.waitForLoad) {
          mqlOpts.prerender = true
          mqlOpts.waitUntil = 'load'
        }

        const queryStr = buildMqlQuery(url, mqlOpts)
        setMqlQuery(queryStr)

        let response = null
        let headerStats = null
        let truncatedResponseStr = null
        let md = null
        try {
          response = await mql(url, mqlOpts)
          const raw = response.data?.markdown
          md = cleanMarkdown(Array.isArray(raw) ? raw.join('\n\n') : raw || '')
          setMarkdown(md)
          headerStats = extractNerdStats(response.response?.headers)
          setNerdStats(headerStats)

          const truncatedData = { ...response.data }
          const mdForTruncation = Array.isArray(truncatedData.markdown)
            ? truncatedData.markdown.join('\n\n')
            : truncatedData.markdown || ''
          if (mdForTruncation.length > 300) {
            truncatedData.markdown = mdForTruncation.slice(0, 300) + '\u2026'
          } else {
            truncatedData.markdown = mdForTruncation
          }
          truncatedResponseStr = JSON.stringify(
            { status: response.status, data: truncatedData },
            null,
            2
          )
          setResponseData(truncatedResponseStr)
        } catch (err) {
          setError({
            message:
              err.description ||
              err.message ||
              'Failed to convert to markdown.',
            statusCode: err.statusCode || err.code
          })
        }

        if (md) {
          const entryId = String(Date.now())
          setHistory(prev => {
            const items = Array.isArray(prev) ? prev : []
            return [
              {
                id: entryId,
                createdAt: Date.now(),
                markdown: md,
                nerdStats: headerStats,
                mqlQuery: queryStr,
                responseData: truncatedResponseStr,
                settings: {
                  url,
                  customSelector: options.customSelector,
                  adblock: options.adblock,
                  cache: options.cache,
                  waitForLoad: options.waitForLoad
                }
              },
              ...items
            ].slice(0, MAX_MARKDOWN_HISTORY)
          })
          setActiveHistoryId(entryId)
        }
      } catch (err) {
        setError({
          message:
            err.description || err.message || 'Failed to convert to markdown.',
          statusCode: err.statusCode || err.code
        })
      } finally {
        setIsLoading(false)
      }
    },
    [options, localStorageData, setHistory]
  )

  const handleSubmit = useCallback(
    url => {
      if (guardUnsavedEdits(() => executeSubmit(url))) return
      executeSubmit(url)
    },
    [guardUnsavedEdits, executeSubmit]
  )

  const applyHistoryEntry = useCallback(entry => {
    const { settings } = entry
    setOptions({
      url: settings.url,
      customSelector: settings.customSelector || '',
      adblock: settings.adblock !== undefined ? settings.adblock : true,
      cache: settings.cache !== undefined ? settings.cache : true,
      waitForLoad: settings.waitForLoad || false
    })
    setMarkdown(cleanMarkdown(entry.markdown || ''))
    setLastUrl(settings.url)
    setNerdStats(entry.nerdStats || null)
    setMqlQuery(entry.mqlQuery || null)
    setResponseData(entry.responseData || null)
    setError(null)
    setIsEditing(false)
    setSaveState(null)
    setActiveHistoryId(entry.id)
  }, [])

  const handleHistorySelect = useCallback(
    entry => {
      if (guardUnsavedEdits(() => applyHistoryEntry(entry))) return
      applyHistoryEntry(entry)
    },
    [guardUnsavedEdits, applyHistoryEntry]
  )

  const handleHistoryDelete = useCallback(
    id => {
      setHistory(prev => {
        const items = Array.isArray(prev) ? prev : []
        return items.filter(entry => entry.id !== id)
      })
      setActiveHistoryId(prev => (prev === id ? null : prev))
    },
    [setHistory]
  )

  const [HistoryClipboard, historyToClipboard] = useClipboard()

  const handleHistoryCopy = useCallback(
    entry => {
      historyToClipboard({
        copy: entry.markdown || '',
        text: Tooltip.TEXT.COPIED('Markdown')
      })
    },
    [historyToClipboard]
  )

  const handleHistoryDownload = useCallback(entry => {
    if (!entry.markdown) return
    const blob = new Blob([entry.markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    try {
      const hostname = new URL(entry.settings.url).hostname.replace(
        RE_WWW_PREFIX,
        ''
      )
      a.download = `${hostname}.md`
    } catch {
      a.download = 'markdown.md'
    }
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  const handleEditChange = useCallback(val => {
    setEditedMarkdown(val)
    setSaveState(null)
  }, [])

  const handleSave = useCallback(() => {
    persistEdits(editedMarkdown)
    setSaveState('saved')
    setTimeout(() => setSaveState(null), 1500)
  }, [persistEdits, editedMarkdown])

  const handleRetry = useCallback(() => {
    if (lastUrl) handleSubmit(lastUrl)
  }, [lastUrl, handleSubmit])

  const hasContent = !!(markdown || error || isLoading)

  return (
    <Container
      as='section'
      id='tool'
      css={theme({
        px: ['16px', '25px'],
        maxWidth: [layout.normal, layout.normal, layout.normal, layout.normal],
        pb: [2, 2, 4, 4],
        pt: [3, 3, 4, 5]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%'
        })}
      >
        <Omnibar
          options={options}
          setOptions={setOptions}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <Box css={{ width: '100%' }}>
          <ResultsExpandWrapper $expanded={hasContent}>
            <ResultsExpandInner>
              <MarkdownPreviewDisplay
                markdown={markdown}
                isLoading={isLoading}
                error={error}
                onRetry={handleRetry}
                nerdStats={nerdStats}
                mqlQuery={mqlQuery}
                responseData={responseData}
                showNerdStats={showNerdStats}
                onToggleNerdStats={() => setShowNerdStats(prev => !prev)}
                isEditing={isEditing}
                onToggleEdit={handleToggleEdit}
                editedMarkdown={editedMarkdown}
                onEditChange={handleEditChange}
                onSave={handleSave}
                saveState={saveState}
              />
            </ResultsExpandInner>
          </ResultsExpandWrapper>

          {/* {!hasContent && (
            <Flex
              css={theme({
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                py: [4, 4, 5, 5]
              })}
            >
              <Flex
                css={{
                  color: colors.black80,
                  alignItems: 'center',
                  gap: space[2],
                  marginBottom: space[3]
                }}
              >
                <LinkIcon width='30' height='30' />
                <ArrowBig
                  width='28'
                  height='28'
                  css={{ color: colors.black40 }}
                />
                <FileText width='32' height='32' />
              </Flex>
              <Text css={theme({ color: 'black80', fontSize: 2 })}>
                Paste a URL and press Convert
              </Text>
              <Text
                css={theme({
                  color: 'black60',
                  fontSize: 1,
                  pt: 1
                })}
              >
                The markdown will appear here
              </Text>
            </Flex>
          )} */}
        </Box>
      </Flex>

      {safeHistory.length > 0 ? (
        <MarkdownHistory
          entries={safeHistory}
          activeId={activeHistoryId}
          onSelect={handleHistorySelect}
          onDelete={handleHistoryDelete}
          onCopy={handleHistoryCopy}
          onDownload={handleHistoryDownload}
          disabled={isLoading}
        />
      ) : null}
      <HistoryClipboard />
      {showUnsavedModal ? (
        <UnsavedChangesModal
          onSave={handleModalSave}
          onDiscard={handleModalDiscard}
          onClose={handleModalClose}
        />
      ) : null}
    </Container>
  )
}

/* ─── Hero Section ─────────────────────────────────────── */

const Hero = () => (
  <Flex
    as='section'
    id='hero'
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      pt: [1],
      pb: [1]
    })}
  >
    <Heading
      css={theme({
        px: [3, 3],
        maxWidth: layout.large,
        fontSize: [3, '35px', '40px', '50px']
      })}
    >
      Website to Markdown <LineBreak breakpoints={[0, 1]} /> Converter
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 2, 3, 3]
      })}
    >
      Turn any URL into clean, structured markdown.
      <br /> Edit, copy, or download instantly.
    </Caption>
  </Flex>
)

/* ─── How It Works ─────────────────────────────────────── */

const HowItWorks = () => (
  <Container
    as='section'
    id='how-it-works'
    css={theme({
      alignItems: 'center',
      width: '100%',
      pt: 0,
      pb: [2, 2, 3, 3],
      mt: 2
    })}
  >
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 3, 3, '28px']
      })}
    >
      How to convert a web page to markdown
    </Caption>
    <Flex
      css={theme({
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: [2, 2, 3, 4],
        pt: [2, 2, 3, 3]
      })}
    >
      {HOW_IT_WORKS.map(({ icon: Icon, title, description }) => (
        <StepCard key={title} css={theme({ px: 1, py: [3, 3, 4, 4] })}>
          <SectionIcon icon={Icon} />
          <Caps
            as='h3'
            css={theme({ fontWeight: 'regular', pb: 2, fontSize: 1 })}
          >
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </StepCard>
      ))}
    </Flex>
  </Container>
)

/* ─── Explanation ────────────────────────────────────── */

const Explanation = () => (
  <Container
    as='section'
    id='why-choose'
    css={theme({
      alignItems: 'center',
      pb: [4, 4, 5, 5],
      pt: [4, 4, 5, 5],
      mt: [3, 3, 4, 4],
      bg: 'pinky'
    })}
  >
    <Subhead
      variant='gradient'
      css={theme({ fontSize: [3, '30px', '35px', '45px'] })}
    >
      Why use this free URL to markdown tool?
    </Subhead>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large]
      })}
    >
      {REASON_TO_USE.map(({ title, description }) => (
        <UseCaseCard key={title}>
          <Caps as='h3' css={theme({ fontWeight: 'bold', pb: 2, fontSize: 1 })}>
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </UseCaseCard>
      ))}
    </Box>
    <Caption
      css={theme({
        pt: [4, 4, 5, 5],
        px: [1, 1, 3, 3],
        fontSize: '24px',
        maxWidth: layout.large
      })}
    >
      <Text css={theme({ fontSize: 3, color: 'black' })}>
        How can a web to markdown converter be free?
      </Text>
      <Text
        css={theme({ fontSize: 2, color: 'black80', lineHeight: 2, mt: 2 })}
      >
        This tool runs on the{' '}
        <Link href='/markdown'>Microlink Markdown API</Link> — the same
        infrastructure powering AI pipelines and content workflows at scale. You
        get enterprise-grade URL to markdown conversion at no cost.
      </Text>
    </Caption>
  </Container>
)

/* ─── Use Cases ───────────────────────────────────────── */

const UseCasesSection = () => (
  <Container
    as='section'
    id='use-cases'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6],
      pt: [4, 4, 5, 5]
    })}
  >
    <Subhead
      variant='gradient'
      css={theme({ fontSize: [3, '30px', '35px', '45px'] })}
    >
      Use cases for website to markdown conversion
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      From AI agent workflows to content migration, converting web pages to
      markdown powers workflows across every team.
    </Caption>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        width: '100%'
      })}
    >
      {USE_CASES.map(({ title, items, link }) => (
        <Box
          key={title}
          css={theme({
            p: 4,
            border: 1,
            borderColor: 'black10',
            borderRadius: 3,
            bg: 'white'
          })}
        >
          <Caps
            as='h3'
            titleize='false'
            css={theme({ fontWeight: 'bold', pb: 3, fontSize: 1 })}
          >
            {title}
          </Caps>
          <Box
            as='ul'
            css={{
              padding: 0,
              margin: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: space[2]
            }}
          >
            {items.map(item => (
              <Flex
                key={item}
                as='li'
                css={{
                  alignItems: 'baseline',
                  gap: space[2]
                }}
              >
                <ArrowRight
                  size={12}
                  css={{ flexShrink: 0, position: 'relative', top: 1 }}
                />
                <Text
                  css={theme({
                    fontSize: 1,
                    color: 'black60',
                    lineHeight: 2
                  })}
                >
                  {item}
                </Text>
              </Flex>
            ))}
          </Box>
          {link ? (
            <Box css={theme({ pt: 3 })}>
              <Link href={link.href} aria-label={link.alt}>
                {link.text}
              </Link>
            </Box>
          ) : null}
        </Box>
      ))}
    </Box>
  </Container>
)

/* ─── Banner ─────────────────────────────────────────── */

const Banner = () => (
  <Block
    forwardedAs='section'
    id='pricing'
    flexDirection='column'
    css={theme({
      px: 4,
      maxHeight: '800px',
      pb: 0,
      pt: 5,
      width: '100%',
      overflow: 'hidden',
      backgroundImage: `radial-gradient(
        circle at center right,
        #850ba7 0%,
        #850ba7 48%,
        #a31b91 48%,
        #a31b91 52%,
        #c12a78 52%,
        #c12a78 65%,
        #df3a61 65%,
        #df3a61 79%,
        #fd494a 79%,
        #fd494a 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`
    })}
    blockOne={
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Subhead css={theme({ fontSize: [3, 4, 6, 6], color: 'white' })}>
          Markdown API{' '}
          <span css={theme({ display: 'block', color: 'white60' })}>
            for developers
          </span>
        </Subhead>
      </Flex>
    }
    blockTwo={
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          justifyContent: 'center',
          alignItems: 'flex-start',
          maxHeight: ['200px', '300px', '400px', '650px'],
          overflow: 'hidden'
        })}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        <img
          css={theme({
            width: ['300px', '500px', '700px', '900px']
          })}
          src='/images/screenshot-tool-landing.png' // TODO: add the definitive landing image
          alt='Microlink landing API'
        />
      </Flex>
    }
  />
)

/* ─── API Docs Card ───────────────────────────────────── */

const MarkdownApiDocsCard = () => (
  <Container
    as='section'
    id='api-docs'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [2, 2, 3, 3],
      pt: [5, 5, 5, 5],
      mb: [4, 4, 5, 5]
    })}
  >
    <Box
      css={theme({
        width: '100%',
        p: [3, 4],
        borderRadius: 3,
        textAlign: 'center'
      })}
    >
      <Flex css={theme({ justifyContent: 'center', pb: 4 })}>
        <SectionIcon icon={Code} />
      </Flex>
      <Subhead css={theme({ fontSize: 4 })}>
        URL to Markdown API Documentation
      </Subhead>
      <Caption
        css={theme({
          pt: 3,
          maxWidth: layout.normal,
          mx: 'auto',
          fontSize: 3
        })}
      >
        Explore the full Markdown API guide with interactive examples, HTML
        selectors, caching strategies, and ready-to-use code snippets.
      </Caption>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          fontSize: [2, 2, 3, 3]
        })}
      >
        <ArrowLink href='/docs/guides/markdown'>Getting started</ArrowLink>
      </Flex>
    </Box>
  </Container>
)

/* ─── Product Information (FAQ) ────────────────────────── */

const ProductInformation = () => (
  <Faq
    css={theme({
      fontSize: [1, 1, 1, 1],
      pt: [2, 2, 4, 4],
      pb: 4,
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      {
        question: 'Is this website to markdown converter free?',
        answer: (
          <>
            <div>
              Yes! You can convert up to <b>50&nbsp;URLs per day</b> for free,
              with no credit card required. Free conversions include all
              features — ad blocking, HTML selectors, prerendering, inline
              editing, and download.
            </div>
            <div>
              Need more? Check our <Link href='/#pricing'>pricing plans</Link>{' '}
              for higher limits and priority processing.
            </div>
          </>
        )
      },
      {
        question: 'What content does the URL to markdown tool extract?',
        answer: (
          <>
            <div>
              The tool converts any web page to clean markdown, preserving
              headings, paragraphs, lists, links, images, code blocks, tables,
              and emphasis. It strips navigation, scripts, and non-content
              elements automatically.
            </div>
            <div>
              Use an <b>HTML Selector</b> in Advanced options to target the
              article or documentation body. See the{' '}
              <Link href='/docs/guides/markdown/choosing-scope'>
                choosing scope guide
              </Link>{' '}
              for details.
            </div>
          </>
        )
      },
      {
        question: 'Can I target specific sections of a webpage?',
        answer: (
          <>
            <div>
              Absolutely. Open <b>Advanced options</b> and enter any HTML
              selector in the <b>HTML Selector</b> field — for example{' '}
              <code>article</code>, <code>.post-body</code>, or{' '}
              <code>#main-content</code>. All matching elements are joined
              automatically into one markdown output.
            </div>
          </>
        )
      },
      {
        question: 'How does it handle JavaScript-rendered pages?',
        answer: (
          <>
            <div>
              Enable <b>Wait for all the elements to load</b> in Advanced
              options. The tool renders the page in a real browser, waiting for
              every resource to finish before extracting content. This handles
              SPAs, client-side rendered frameworks, and lazy-loaded content.
            </div>
            <div>
              Learn more in the{' '}
              <Link href='/docs/guides/markdown/choosing-scope#prepare-the-page-before-conversion'>
                choosing scope guide
              </Link>
              .
            </div>
          </>
        )
      },
      {
        question: 'Can I edit the markdown before downloading?',
        answer: (
          <>
            <div>
              Yes. Click the <b>Edit</b> button to enter edit mode. You can
              modify, delete, or add content directly in the browser. Click{' '}
              <b>Save</b> to persist your changes — edited conversions are
              marked in your history.
            </div>
            <div>
              Copy and download actions always use the latest saved version. If
              you have unsaved edits, the tool will prompt you before switching
              to another conversion.
            </div>
          </>
        )
      },
      {
        question: 'Does it keep a history of my conversions?',
        answer: (
          <>
            <div>
              Yes. Your last <b>20&nbsp;conversions</b> are saved in your
              browser's local storage — no account needed. Click any history
              item to reload the markdown, or use the copy and download buttons
              directly from the history card.
            </div>
            <div>
              History never expires and persists across sessions. Edited
              conversions are flagged so you can tell them apart.
            </div>
          </>
        )
      },
      {
        question: 'Can I integrate URL to markdown conversion into my app?',
        answer: (
          <>
            <div>
              Yes. This tool is built on the{' '}
              <Link href='/markdown'>Microlink Markdown API</Link>, which
              provides a simple REST endpoint. Integrate with any language —
              Node.js, Python, Ruby, or plain cURL.
            </div>
            <div>
              Use the{' '}
              <Link href='https://www.npmjs.com/package/@microlink/mql'>
                @microlink/mql
              </Link>{' '}
              SDK for Node.js, or hit the API directly from any HTTP client.
              Check the{' '}
              <Link href='/docs/guides/markdown/delivery-and-response'>
                delivery guide
              </Link>{' '}
              for response formats.
            </div>
          </>
        )
      },
      {
        question: 'How does caching work?',
        answer: (
          <>
            <div>
              Markdown responses are cached on our global CDN by default. Cached
              responses are served instantly and{' '}
              <b>don't count against your limit</b>. Cache lasts for
              24&nbsp;hours.
            </div>
            <div>
              Uncheck <b>Use cache</b> if you need fresh content from a
              frequently updated page. Read the{' '}
              <Link href='/docs/guides/markdown/delivery-and-response'>
                delivery and response guide
              </Link>{' '}
              for advanced caching strategies.
            </div>
          </>
        )
      }
    ]}
  />
)

/* ─── Page Head (SEO) ──────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Website to Markdown Converter — Free URL to Markdown Tool'
    noSuffix
    description='Convert any URL to markdown instantly. Free online tool to turn web pages into clean, structured markdown files — edit, copy, and download. No login required.'
    image='https://cdn.microlink.io/banner/markdown.jpeg'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/url-to-markdown',
        name: 'Website to Markdown Converter',
        description:
          'Free URL to markdown converter with inline editing, ad blocking, HTML selectors, and JavaScript rendering support. Convert any webpage to a markdown file — edit, copy, and download.',
        url: 'https://microlink.io/tools/url-to-markdown',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'url to markdown',
          'webpage to markdown',
          'web to markdown',
          'link to md',
          'web page to markdown',
          'download url to markdown',
          'url to markdown converter'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 conversions per day'
        },
        featureList: [
          'Convert URL to markdown',
          'Edit markdown inline',
          'Copy to clipboard',
          'Download as .md file',
          'HTML selector targeting',
          'Ad and banner blocking',
          'JavaScript rendering',
          'Conversion history (20 entries)',
          'No login required'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is this website to markdown converter really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can convert up to 50 URLs per day for free, with no credit card required. Free conversions include all features — ad blocking, HTML selectors, prerendering, inline editing, and download.'
            }
          },
          {
            '@type': 'Question',
            name: 'What content does the URL to markdown tool extract?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool converts any web page to clean markdown, preserving headings, paragraphs, lists, links, images, code blocks, tables, and emphasis. It strips navigation, scripts, and non-content elements automatically.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I target specific sections of a webpage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Open Advanced options and enter any HTML selector — for example article, .post-body, or #main-content. All matching elements are joined automatically into one markdown output.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does it handle JavaScript-rendered pages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Enable "Wait for all the elements to load" in Advanced options. The tool renders the page in a real browser, waiting for every resource to finish before extracting content. This handles SPAs, client-side rendered frameworks, and lazy-loaded content.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I edit the markdown before downloading?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Click the Edit button to modify, delete, or add content directly in the browser. Click Save to persist your changes. Copy and download actions always use the latest saved version.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does it keep a history of my conversions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Your last 20 conversions are saved in your browser local storage — no account needed. Click any history item to reload the markdown, or use the copy and download buttons directly from the history card. History never expires.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I integrate URL to markdown conversion into my app?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. This tool is built on the Microlink Markdown API, which provides a simple REST endpoint. Integrate with any language — Node.js, Python, Ruby, or plain cURL. Use the @microlink/mql SDK for Node.js, or hit the API directly from any HTTP client.'
            }
          }
        ]
      }
    ]}
  />
)

/* ─── Page Component ───────────────────────────────────── */

const UrlToMarkdownPage = () => (
  <Layout>
    <Hero />
    <MarkdownTool />
    <HowItWorks />
    <Explanation />
    <UseCasesSection />
    <Banner />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          URL to Markdown{' '}
          <span
            css={{
              display: 'block',
              color: '#fd494a',
              width: '100%',
              textAlign: 'left'
            }}
          >
            API for Automated Extraction.
          </span>
        </Subhead>
      }
      caption={
        <>
          No servers to maintain, no browsers to manage. Convert any URL to
          markdown at scale — easy integration via{' '}
          <Link href='/markdown'>API</Link>.
        </>
      }
      features={FEATURES_LIST}
    />
    <MarkdownApiDocsCard />
    <ProductInformation />
  </Layout>
)

export default UrlToMarkdownPage
