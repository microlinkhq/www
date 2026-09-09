import React from 'react'
import { Code, LogIn, Monitor } from 'react-feather'

import { Terminal as TerminalPromptIcon } from 'components/icons/Terminal'
import { SEARCH_LAYOUT_WIDE_MAX_WIDTH } from 'components/pages/search'

import pkg from '../../../../node_modules/microlink.io/package.json'
import { colors } from 'theme'

export const CLI_VERSION = pkg.version
export const ACCENT = 'red6'
export const CLI_COMMAND = 'microlink'
export const MIN_TERMINAL_COLS = 96

export const isCompactCli = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 768px)').matches)
export const ATTRACT_COMMANDS = [
  ['metadata', 'news.ycombinator.com/'],
  ['screenshot', 'stripe.com'],
  ['markdown', 'motherfuckingwebsite.com']
]
export const INSTALL_SNIPPET = 'npm install -g microlink.io'

export const HERO_LAYOUT_MAX_WIDTH = [
  '100%',
  '100%',
  '100%',
  SEARCH_LAYOUT_WIDE_MAX_WIDTH
]

const TOUCH_PAN = {
  touchAction: 'manipulation',
  overscrollBehavior: 'contain',
  '-webkit-overflow-scrolling': 'touch'
}

export const XTERM_SURFACE_CSS = {
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto',
  overflowY: 'hidden',
  ...TOUCH_PAN,
  '& [data-cli-pin]': {
    flexShrink: 0,
    bg: 'black',
    color: 'white',
    fontFamily: 'mono',
    lineHeight: 1.2,
    whiteSpace: 'pre',
    cursor: 'text'
  },
  '& [data-cli-pin="command"]': {
    overflow: 'hidden',
    maxHeight: '3em',
    opacity: 1,
    pb: 2,
    mb: 2,
    borderBottom: 1,
    borderBottomColor: 'white10',
    '@media (prefers-reduced-motion: no-preference)': {
      transition:
        'max-height 160ms ease, padding 160ms ease, margin 160ms ease, opacity 160ms ease, border-width 160ms ease'
    },
    '&[data-collapsed="true"]': {
      maxHeight: 0,
      opacity: 0,
      pb: 0,
      mb: 0,
      borderBottom: 0
    }
  },
  '& [data-cli-pin="prompt"]': {
    pt: 3,
    pb: 'max(8px, env(safe-area-inset-bottom))',
    '&::after': {
      content: '"▋"',
      color: 'white'
    }
  },
  '& [data-cli-host]': {
    flex: 1,
    minHeight: 0,
    width: 'max-content',
    minWidth: '100%',
    position: 'relative'
  },
  '& .xterm': {
    height: '100%',
    width: 'max-content',
    minWidth: '100%'
  },
  '& .xterm span': {
    padding: 0
  },
  '& .xterm-rows > div > span': {
    padding: 0
  },
  '& .xterm-viewport': {
    overflowY: 'auto',
    overflowX: 'hidden',
    bg: 'black',
    ...TOUCH_PAN
  },
  '& .xterm-screen': {
    touchAction: 'manipulation'
  }
}

const FEATURE_ICON_SIZE = 20

const featureIconProps = {
  size: FEATURE_ICON_SIZE,
  strokeWidth: 2.25,
  color: colors.red7
}

export const HERO_FEATURES = [
  {
    title: 'Every product',
    description:
      'Pass a URL for metadata, or a subcommand like markdown, screenshot, pdf, or search.',
    icon: (
      <TerminalPromptIcon
        width={FEATURE_ICON_SIZE}
        height={FEATURE_ICON_SIZE}
        color={colors.red7}
        aria-hidden='true'
      />
    )
  },
  {
    title: 'Pretty JSON',
    description:
      'Objects pretty-print as JSON. Add --trace to inspect the request and response.',
    icon: <Code {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'Login once',
    description: 'Run microlink login to save an API key from your account.',
    icon: <LogIn {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'Terminal previews',
    description:
      'Pretty output includes cache status, fetch mode, and request timing.',
    icon: <Monitor {...featureIconProps} aria-hidden='true' />
  }
]
