import Dot from 'components/elements/Dot/Dot'
import { trackEvent } from 'helpers/gtag'
import { INSTALL_COMMAND } from 'helpers/install-command'
import { REDUCED_MOTION_MEDIA } from 'helpers/reduced-motion'
import { visuallyHiddenCss } from 'helpers/visually-hidden'
import { space, speed, timings, theme } from 'theme'
import React, { useEffect, useRef, useState } from 'react'
import { Check as CheckIcon } from 'react-feather'
import styled, { keyframes } from 'styled-components'

import analyticsData from '../../../../../data/analytics.json'

const [{ reqs_pretty: reqsPretty }] = analyticsData

const SWAP_CYCLE_MS = 8000
const SWAP_SHIFT = space[1]
const SWAP_PHASE_PERCENT = (speed.quickly / SWAP_CYCLE_MS) * 100
const EXIT_END_PERCENT = 50 - SWAP_PHASE_PERCENT
const EXIT_START_PERCENT = EXIT_END_PERCENT - SWAP_PHASE_PERCENT
const ENTER_START_PERCENT = 100 - SWAP_PHASE_PERCENT

const COPIED_FEEDBACK_MS = 1500
const PROMPT_SIZE = '12px'
const HIT_AREA_OVERFLOW_Y = '-12px'
const HIT_AREA_OVERFLOW_X = `-${space[3]}`

const swapCopy = keyframes`
  0%, ${EXIT_START_PERCENT}% { opacity: 1; z-index: 1; transform: translateY(0) }
  ${EXIT_END_PERCENT}% { opacity: 0; z-index: 0; transform: translateY(-${SWAP_SHIFT}) }
  ${ENTER_START_PERCENT}% { opacity: 0; z-index: 0; transform: translateY(${SWAP_SHIFT}) }
  100% { opacity: 1; z-index: 1; transform: translateY(0) }
`

const fadeCopy = keyframes`
  0%, ${EXIT_START_PERCENT}% { opacity: 1; z-index: 1 }
  ${EXIT_END_PERCENT}%, ${ENTER_START_PERCENT}% { opacity: 0; z-index: 0 }
  100% { opacity: 1; z-index: 1 }
`

const Copy = styled.span`
  grid-area: 1 / 1;
  animation: ${fadeCopy} ${SWAP_CYCLE_MS}ms ${timings.long} infinite;
  position: relative;
  z-index: 1;
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    whiteSpace: 'nowrap'
  })};

  &::after {
    content: '';
    position: absolute;
    inset: ${HIT_AREA_OVERFLOW_Y} ${HIT_AREA_OVERFLOW_X};
  }

  &:nth-child(n + 2) {
    opacity: 0;
    z-index: 0;
    animation-delay: -${SWAP_CYCLE_MS / 2}ms;
  }

  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${swapCopy};
  }

  ${REDUCED_MOTION_MEDIA} {
    animation-duration: ${SWAP_CYCLE_MS}ms !important;
    animation-iteration-count: infinite !important;
  }
`

const CommandCopy = styled(Copy).attrs({ as: 'button', type: 'button' })`
  cursor: pointer;
  touch-action: manipulation;
  font: inherit;
  ${theme({ p: 0, border: 0, bg: 'transparent', color: 'inherit' })};

  &[data-copied='true'] {
    ${theme({ color: 'green8' })};
  }
`

const Pill = styled.span`
  ${theme({
    display: 'inline-grid',
    alignItems: 'center',
    fontSize: 0,
    fontWeight: 'regular',
    bg: 'white',
    color: 'gray8',
    border: 1,
    borderColor: 'gray2',
    py: '7px',
    px: 3,
    borderRadius: '999px',
    mb: '26px'
  })};

  &[data-copied='true'] ${Copy} {
    animation-play-state: paused;
  }

  @media (hover: hover) and (pointer: fine) {
    &:has(button:hover) ${Copy} {
      animation-play-state: paused;
    }
  }

  &:has(button:focus-visible) ${Copy} {
    animation: none;
    opacity: 0;
    z-index: 0;
  }

  &:has(button:focus-visible) ${CommandCopy} {
    opacity: 1;
    z-index: 1;
  }
`

const Prompt = styled.span`
  ${theme({
    display: 'inline-flex',
    justifyContent: 'center',
    width: PROMPT_SIZE,
    fontFamily: 'mono',
    color: 'gray5'
  })};

  [data-copied='true'] > & {
    ${theme({ color: 'inherit' })};
  }
`

const Command = styled.span`
  ${theme({ fontFamily: 'mono' })};
`

const useCopyInstallCommand = () => {
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(null)

  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  const copyInstallCommand = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard
      .writeText(INSTALL_COMMAND)
      .then(() => {
        trackEvent('hero copy install command')
        setCopied(true)
        clearTimeout(copiedTimer.current)
        copiedTimer.current = setTimeout(
          () => setCopied(false),
          COPIED_FEEDBACK_MS
        )
      })
      .catch(() => {})
  }

  return [copied, copyInstallCommand]
}

export const HeroBadge = () => {
  const [copied, copyInstallCommand] = useCopyInstallCommand()

  return (
    <Pill data-copied={copied}>
      <Copy>
        <Dot.Success />
        Handling {reqsPretty}+ requests every month
      </Copy>
      <CommandCopy
        data-copied={copied}
        onClick={copyInstallCommand}
        aria-label={`Copy install command: ${INSTALL_COMMAND}`}
      >
        <Prompt aria-hidden='true'>
          {copied ? <CheckIcon size={PROMPT_SIZE} /> : '$'}
        </Prompt>
        <Command>{INSTALL_COMMAND}</Command>
      </CommandCopy>
      <span aria-live='polite' css={visuallyHiddenCss}>
        {copied ? 'Install command copied' : ''}
      </span>
    </Pill>
  )
}
