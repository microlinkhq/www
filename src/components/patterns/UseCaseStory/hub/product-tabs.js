import { colors, theme, touchTargets, transition } from 'theme'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import Flex from 'components/elements/Flex'
import { FadeBackgroundHorizontalProvider } from 'components/elements/FadeBackground/FadeBackground'

import { prefersReducedMotion } from 'helpers/reduced-motion'

export const tabId = id => `use-cases-tab-${id}`

export const panelId = id => `use-cases-panel-${id}`

const TabStrip = styled(Flex)`
  ${theme({
    position: 'relative',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    gap: 1,
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    boxShadow: `inset 0 -1px 0 ${colors.black10}`
  })}
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const TabButton = styled('button').withConfig({
  shouldForwardProp: prop => prop !== '$accent'
})`
  appearance: none;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  outline-offset: -2px;
  transition: color ${transition.short};

  ${theme({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    m: 0,
    px: 2,
    pt: 2,
    pb: 3,
    minHeight: touchTargets.minHeight,
    border: 0,
    borderRadius: 2,
    bg: 'transparent',
    color: 'black60',
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    fontWeight: 'bold',
    lineHeight: 1,
    letterSpacing: 0,
    whiteSpace: 'nowrap'
  })}

  &::after {
    content: '';
    transform: scaleX(0);
    transform-origin: center;

    ${theme({
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '3px',
      borderRadius: 2,
      bg: 'black20'
    })}
  }

  &:hover,
  &[aria-selected='true'] {
    ${theme({ color: 'black' })}

    &::after {
      transform: scaleX(1);
    }
  }

  &[aria-selected='true']::after {
    ${({ $accent }) => theme({ bg: $accent })}
  }

  @media (prefers-reduced-motion: no-preference) {
    &::after {
      transition: transform ${transition.short},
        background-color ${transition.short};
    }
  }
`

const NEXT_INDEX = {
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (index, count) => count - 1
}

const useRevealActiveTab = (stripRef, active) => {
  useEffect(() => {
    const strip = stripRef.current
    const tab = strip?.querySelector('[aria-selected="true"]')
    if (!tab || strip.scrollWidth <= strip.clientWidth) return

    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    })
  }, [stripRef, active])
}

export const ProductTabs = ({ groups, active, onSelect, label }) => {
  const stripRef = useRef(null)
  useRevealActiveTab(stripRef, active)

  const onKeyDown = event => {
    const toNext = NEXT_INDEX[event.key]
    if (!toNext) return

    event.preventDefault()
    const current = groups.findIndex(({ id }) => id === active)
    const next = toNext(current, groups.length)
    onSelect(groups[next].id)
    stripRef.current?.querySelectorAll('[role="tab"]')[next]?.focus()
  }

  return (
    <FadeBackgroundHorizontalProvider
      containerRef={stripRef}
      fadeColor={colors.white}
    >
      <TabStrip
        ref={stripRef}
        role='tablist'
        aria-label={label}
        onKeyDown={onKeyDown}
      >
        {groups.map(group => {
          const isActive = group.id === active

          return (
            <TabButton
              key={group.id}
              id={tabId(group.id)}
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-controls={panelId(group.id)}
              tabIndex={isActive ? 0 : -1}
              $accent={group.accent}
              onClick={() => onSelect(group.id)}
            >
              {group.label}
            </TabButton>
          )
        })}
      </TabStrip>
    </FadeBackgroundHorizontalProvider>
  )
}
