import { transition, theme, colors } from 'theme'
import React from 'react'
import styled from 'styled-components'

import { EASE_SMOOTH, reduceMotion } from './primitives'

const INK = colors.black

export const RESULT_TABS = [
  { key: 'output', label: 'Output' },
  { key: 'data', label: 'Data' },
  { key: 'headers', label: 'Headers' },
  { key: 'timing', label: 'Timing' },
  { key: 'code', label: 'Code' }
]

const TabBar = styled.div`
  ${theme({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '28px'
  })};
`

const TabButton = styled.button`
  cursor: pointer;
  color: ${props => (props.$active ? INK : colors.gray6)};
  transition: color ${transition.short};
  ${theme({
    border: 0,
    bg: 'transparent',
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'regular',
    textTransform: 'uppercase',
    letterSpacing: 2,
    pt: 0,
    px: 0,
    pb: '14px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2
  })};

  &:focus-visible {
    ${theme({ borderRadius: 2 })};
  }
`

const TabIndicator = styled.span`
  transform: translateX(0);
  transition: transform 250ms ${EASE_SMOOTH}, width 250ms ${EASE_SMOOTH};
  will-change: transform, width;
  ${theme({
    position: 'absolute',
    bottom: '-1px',
    left: 0,
    height: '2px',
    width: 0,
    bg: 'black',
    pointerEvents: 'none'
  })};

  ${reduceMotion} {
    transition: none;
  }
`

export const ResultTabs = ({
  barRef,
  indicatorRef,
  tab,
  setTab,
  onTabKeyDown
}) => (
  <TabBar
    ref={barRef}
    role='tablist'
    aria-label='Response views'
    onKeyDown={onTabKeyDown}
  >
    {RESULT_TABS.map(t => (
      <TabButton
        key={t.key}
        id={`hero-tab-${t.key}`}
        role='tab'
        aria-selected={tab === t.key}
        aria-controls='hero-tabpanel'
        tabIndex={tab === t.key ? 0 : -1}
        data-active={tab === t.key}
        $active={tab === t.key}
        onClick={() => setTab(t.key)}
      >
        {t.label}
      </TabButton>
    ))}
    <TabIndicator ref={indicatorRef} />
  </TabBar>
)
