import React from 'react'
import { Code, LogIn, Monitor } from 'react-feather'

import { Terminal as TerminalPromptIcon } from 'components/icons/Terminal'
import { SEARCH_LAYOUT_WIDE_MAX_WIDTH } from 'components/pages/search'

import pkg from '../../../../node_modules/microlink.io/package.json'
import { colors } from 'theme'

export const CLI_VERSION = pkg.version
export const ACCENT = 'red6'
export const CLI_REPOSITORY = 'https://github.com/microlinkhq/microlink'
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

export const XTERM_SURFACE_CSS = {
  overflowX: 'auto',
  overflowY: 'hidden',
  touchAction: 'pan-x pan-y',
  overscrollBehavior: 'contain',
  '-webkit-overflow-scrolling': 'touch',
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
    touchAction: 'pan-x pan-y',
    overscrollBehavior: 'contain',
    '-webkit-overflow-scrolling': 'touch'
  },
  '& .xterm-screen': {
    touchAction: 'pan-x pan-y'
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
