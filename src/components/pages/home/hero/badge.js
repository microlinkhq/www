import Dot from 'components/elements/Dot/Dot'
import { INSTALL_COMMAND } from 'helpers/install-command'
import { timings, theme } from 'theme'
import React from 'react'
import styled, { keyframes } from 'styled-components'

import analyticsData from '../../../../../data/analytics.json'

const [{ reqs_pretty: reqsPretty }] = analyticsData

const SWAP_CYCLE_MS = 8000
const SWAP_SHIFT = '8px'

const swapCopy = keyframes`
  0%, 42% { opacity: 1; transform: translateY(0) }
  46% { opacity: 0; transform: translateY(-${SWAP_SHIFT}) }
  96% { opacity: 0; transform: translateY(${SWAP_SHIFT}) }
  100% { opacity: 1; transform: translateY(0) }
`

const Copy = styled.span`
  grid-area: 1 / 1;
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    whiteSpace: 'nowrap'
  })};

  &:nth-child(n + 2) {
    opacity: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${swapCopy} ${SWAP_CYCLE_MS}ms ${timings.smooth} infinite;

    &:nth-child(n + 2) {
      animation-delay: -${SWAP_CYCLE_MS / 2}ms;
    }
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

  @media (hover: hover) and (pointer: fine) {
    &:hover ${Copy} {
      animation-play-state: paused;
    }
  }
`

const Prompt = styled.span`
  ${theme({ fontFamily: 'mono', color: 'gray5' })};
`

const Command = styled.span`
  ${theme({ fontFamily: 'mono' })};
`

export const HeroBadge = () => (
  <Pill>
    <Copy>
      <Dot.Success />
      Handling {reqsPretty}+ requests every month
    </Copy>
    <Copy>
      <Prompt aria-hidden='true'>$</Prompt>
      <Command>{INSTALL_COMMAND}</Command>
    </Copy>
  </Pill>
)
