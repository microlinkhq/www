import { breakpoints, colors, theme, touchTargets, transition } from 'theme'
import React, { useRef, useState, useSyncExternalStore } from 'react'
import styled, { css } from 'styled-components'
import { ChevronDown } from 'react-feather'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import {
  EXAMPLE_TITLE_STYLE,
  SECONDARY_FOCUS_RING
} from 'components/patterns/ExamplesSwitcher/styles'

const DESKTOP_MQ = `(min-width: ${breakpoints[1]})`
const DESCRIPTION_LINES = 2

const subscribeDesktop = onStoreChange => {
  const media = window.matchMedia(DESKTOP_MQ)
  media.addEventListener('change', onStoreChange)
  return () => media.removeEventListener('change', onStoreChange)
}

const getDesktopSnapshot = () => window.matchMedia(DESKTOP_MQ).matches
const getDesktopServerSnapshot = () => false

const useIsDesktop = () =>
  useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  )

const TabIcon = styled(Flex)(
  theme({
    width: '32px',
    height: '32px',
    borderRadius: 2,
    bg: 'pinky',
    color: 'secondary',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }),
  css`
    transition: background-color ${transition.medium},
      color ${transition.medium};
  `
)

const TabButton = styled('button')(
  theme({
    appearance: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 3,
    p: 3,
    m: 0,
    color: 'inherit',
    fontFamily: 'sans',
    touchAction: 'manipulation'
  }),
  css`
    transition: border-color ${transition.medium},
      background-color ${transition.medium}, box-shadow ${transition.medium};

    &[aria-selected='true'] {
      border-color: ${colors.secondary};
      background-color: ${colors.pinkest};
      box-shadow: inset 0 0 0 1px ${colors.secondary};
    }

    &[aria-selected='true'] ${TabIcon} {
      background-color: ${colors.secondary};
      color: ${colors.white};
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not([aria-selected='true']) {
        border-color: ${colors.gray4};
      }
    }

    &:focus-visible {
      ${SECONDARY_FOCUS_RING}
    }
  `
)

const PanelDescription = styled(Text)(
  theme({
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    lineHeight: 2,
    color: 'black80',
    pb: 3
  }),
  css`
    display: -webkit-box;
    -webkit-line-clamp: ${DESCRIPTION_LINES};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `
)

const MobileSelect = styled.select(
  EXAMPLE_TITLE_STYLE,
  theme({
    appearance: 'none',
    cursor: 'pointer',
    touchAction: 'manipulation',
    width: '100%',
    bg: 'pinkest',
    color: 'black',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    minHeight: touchTargets.minHeight,
    p: 0,
    pr: 4,
    m: 0
  }),
  css`
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
      ${SECONDARY_FOCUS_RING}
    }
  `
)

const UseCaseSwitcher = ({
  baseId,
  panels,
  language = 'js',
  selectLabel = 'Choose a use case',
  tablistLabel = 'Use cases'
}) => {
  const tabRefs = useRef([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const isDesktop = useIsDesktop()
  const activeIndex = panels.length
    ? Math.min(selectedIndex, panels.length - 1)
    : 0
  const active = panels[activeIndex]

  if (!panels.length || !active) return null

  const selectIndex = (index, { focus } = {}) => {
    if (index < 0 || index >= panels.length) return
    setSelectedIndex(index)
    if (focus) tabRefs.current[index]?.focus()
  }

  const onKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      selectIndex((index + 1) % panels.length, { focus: true })
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      selectIndex((index - 1 + panels.length) % panels.length, { focus: true })
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectIndex(0, { focus: true })
    } else if (event.key === 'End') {
      event.preventDefault()
      selectIndex(panels.length - 1, { focus: true })
    }
  }

  return (
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: [
          'minmax(0, 1fr)',
          'minmax(0, 1fr)',
          'minmax(220px, 260px) minmax(0, 1fr)',
          'minmax(240px, 280px) minmax(0, 1fr)'
        ],
        gap: [3, 3, 4, 4]
      })}
    >
      <Box
        css={theme({
          display: ['block', 'block', 'none', 'none'],
          minWidth: 0,
          bg: 'pinkest',
          border: 1,
          borderColor: 'secondary',
          borderRadius: 3,
          boxShadow: `inset 0 0 0 1px ${colors.secondary}`,
          p: 3
        })}
      >
        <Box css={theme({ position: 'relative' })}>
          <MobileSelect
            aria-label={selectLabel}
            value={activeIndex}
            onChange={event => setSelectedIndex(Number(event.target.value))}
          >
            {panels.map((panel, index) => (
              <option key={panel.id} value={index}>
                {panel.title}
              </option>
            ))}
          </MobileSelect>
          <Flex
            aria-hidden='true'
            css={theme({
              display: 'flex',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              color: 'black',
              pointerEvents: 'none'
            })}
          >
            <ChevronDown size={18} strokeWidth={2.25} />
          </Flex>
        </Box>
      </Box>

      <Flex
        role='tablist'
        aria-orientation='vertical'
        aria-label={tablistLabel}
        css={theme({
          display: ['none', 'none', 'flex', 'flex'],
          flexDirection: 'column',
          gap: 2,
          minWidth: 0
        })}
      >
        {panels.map((panel, index) => {
          const selected = index === activeIndex
          const Icon = panel.icon
          return (
            <TabButton
              key={panel.id}
              id={`${baseId}-tab-${panel.id}`}
              ref={node => {
                tabRefs.current[index] = node
              }}
              type='button'
              role='tab'
              aria-selected={selected}
              aria-controls={
                selected ? `${baseId}-panel-${panel.id}` : undefined
              }
              tabIndex={selected ? 0 : -1}
              onClick={() => selectIndex(index)}
              onKeyDown={event => onKeyDown(event, index)}
            >
              {Icon && (
                <TabIcon aria-hidden='true'>
                  <Icon size={16} />
                </TabIcon>
              )}
              <Text css={EXAMPLE_TITLE_STYLE}>{panel.title}</Text>
            </TabButton>
          )
        })}
      </Flex>

      <Box
        role={isDesktop ? 'tabpanel' : 'region'}
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={isDesktop ? `${baseId}-tab-${active.id}` : undefined}
        aria-label={active.title}
        css={theme({
          minWidth: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        })}
      >
        {active.description && (
          <PanelDescription aria-live='polite'>
            {active.description}
          </PanelDescription>
        )}
        <CodeEditor
          title={active.title}
          language={active.language || language}
          css={theme({
            width: '100%',
            flex: 1,
            minHeight: '320px'
          })}
        >
          {active.snippet}
        </CodeEditor>
      </Box>
    </Box>
  )
}

export default UseCaseSwitcher
