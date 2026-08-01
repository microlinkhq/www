import { colors, space, theme, transition } from 'theme'
import React, { useId, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

import { prefersReducedMotion } from 'helpers/reduced-motion'

import {
  DESKTOP_ONLY,
  onDesktop,
  SECONDARY_FOCUS_RING,
  TAB_DESCRIPTION_STYLE,
  TAB_TITLE_STYLE
} from './styles'
import useScrollCues from './use-scroll-cues'
import useTabsHeight from './use-tabs-height'
import ExamplesSelect from './examples-select'

const PANEL_HEIGHT = CodeEditor.height.map(value =>
  value === '100%' ? '360px' : value
)

const TabList = styled(Flex).attrs({
  as: 'div',
  role: 'tablist',
  'aria-orientation': 'vertical'
})(
  theme({
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    pr: 1,
    scrollSnapType: 'y proximity'
  }),
  ({ $height, $stretch }) => {
    if ($height) {
      return css`
        height: ${$height};
        max-height: ${$height};
      `
    }
    if ($stretch) {
      return css`
        height: 0;
        min-height: 100%;
      `
    }
    return undefined
  }
)

const ScrollCue = styled(Flex).attrs({
  'aria-hidden': true
})(
  theme({
    position: 'absolute',
    left: 0,
    right: 0,
    height: '56px',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: 'black40'
  }),
  ({ $edge }) =>
    $edge === 'top'
      ? css`
        top: 0;
        align-items: flex-start;
        padding-top: ${space[2]};
        background-image: linear-gradient(
          to top,
          rgba(255, 255, 255, 0),
          ${colors.white} 72%
        );
      `
      : css`
        bottom: 0;
        align-items: flex-end;
        padding-bottom: ${space[2]};
        background-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          ${colors.white} 72%
        );
      `
)

const TabCard = styled('button')(
  theme({
    appearance: 'none',
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
    touchAction: 'manipulation',
    flexShrink: 0,
    scrollSnapAlign: 'start',
    overflow: 'hidden'
  }),
  css`
    transition: border-color ${transition.medium},
      background-color ${transition.medium}, box-shadow ${transition.medium};

    &[aria-selected='true'] {
      border-color: ${colors.secondary};
      background-color: ${colors.pinkest};
      box-shadow: inset 0 0 0 1px ${colors.secondary};
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

const EMPTY_PANELS = []

const ExamplesSwitcher = ({
  panels = EMPTY_PANELS,
  language = 'js',
  visibleTabs
}) => {
  const baseId = useId()
  const listRef = useRef(null)
  const tabRefs = useRef([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const viewportHeight = useTabsHeight(listRef, panels, visibleTabs)
  const scrollCues = useScrollCues(listRef, [
    panels,
    visibleTabs,
    viewportHeight
  ])
  const activeIndex = panels.length
    ? Math.min(selectedIndex, panels.length - 1)
    : 0
  const active = panels[activeIndex]
  const tabsHeight = viewportHeight ? `${viewportHeight}px` : undefined
  const panelHeight = tabsHeight
    ? onDesktop(tabsHeight, PANEL_HEIGHT)
    : PANEL_HEIGHT

  if (!panels.length || !active) return null

  const selectIndex = (index, { focus } = {}) => {
    if (index < 0 || index >= panels.length) return
    setSelectedIndex(index)
    if (focus) tabRefs.current[index]?.focus()
    tabRefs.current[index]?.scrollIntoView({
      block: 'nearest',
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    })
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
          'minmax(220px, 280px) minmax(0, 1fr)',
          'minmax(240px, 300px) minmax(0, 1fr)'
        ],
        gap: [3, 3, 4, 4],
        alignItems: ['start', 'start', 'stretch', 'stretch']
      })}
    >
      <ExamplesSelect
        panels={panels}
        activeIndex={activeIndex}
        onSelect={setSelectedIndex}
      />

      <Box
        css={theme({
          display: DESKTOP_ONLY,
          position: 'relative',
          minWidth: 0,
          minHeight: 0,
          height: tabsHeight
        })}
      >
        <TabList ref={listRef} $height={tabsHeight} $stretch={!visibleTabs}>
          {panels.map((panel, index) => {
            const selected = index === activeIndex
            const tabId = `${baseId}-tab-${panel.id}`
            const panelId = `${baseId}-panel-${panel.id}`
            return (
              <TabCard
                key={panel.id}
                id={tabId}
                ref={node => {
                  tabRefs.current[index] = node
                }}
                type='button'
                role='tab'
                aria-selected={selected}
                aria-controls={selected ? panelId : undefined}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectIndex(index)}
                onKeyDown={event => onKeyDown(event, index)}
              >
                <Text pb={1} css={TAB_TITLE_STYLE}>
                  {panel.title}
                </Text>
                <Text css={TAB_DESCRIPTION_STYLE}>{panel.description}</Text>
              </TabCard>
            )
          })}
        </TabList>
        {scrollCues.up && (
          <ScrollCue $edge='top'>
            <ChevronUp size={18} strokeWidth={2.25} />
          </ScrollCue>
        )}
        {scrollCues.down && (
          <ScrollCue $edge='bottom'>
            <ChevronDown size={18} strokeWidth={2.25} />
          </ScrollCue>
        )}
      </Box>
      <Box
        role='tabpanel'
        id={`${baseId}-panel-${active.id}`}
        aria-label={active.title}
        css={theme({
          minWidth: 0,
          width: '100%',
          height: panelHeight,
          minHeight: panelHeight
        })}
      >
        <CodeEditor
          title={active.title}
          language={active.language || language}
          css={theme({
            width: '100%',
            height: '100%',
            maxHeight: '100%'
          })}
        >
          {active.snippet}
        </CodeEditor>
      </Box>
    </Box>
  )
}

export default ExamplesSwitcher
