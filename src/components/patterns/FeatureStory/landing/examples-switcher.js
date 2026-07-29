import { breakpoints, colors, theme, transition } from 'theme'
import React, { useEffect, useId, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

import { ACCENT } from '../features'

const TAB_CARD_MIN_HEIGHT = '104px'
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
    overflowY: ['visible', 'visible', 'auto', 'auto'],
    overscrollBehavior: 'contain',
    pr: [0, 0, 1, 1],
    scrollSnapType: ['none', 'none', 'y proximity', 'y proximity']
  }),
  css`
    @media (min-width: ${breakpoints[1]}) {
      height: 0;
      min-height: 100%;
      mask-image: linear-gradient(
        to bottom,
        #000 0%,
        #000 calc(100% - 28px),
        transparent 100%
      );
    }

    &[data-at-end='true'] {
      mask-image: none;
    }
  `
)

const TabCard = styled('button')(
  theme({
    appearance: 'none',
    width: '100%',
    minHeight: TAB_CARD_MIN_HEIGHT,
    textAlign: 'left',
    cursor: 'pointer',
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 3,
    p: [3, 3, 3, 3],
    m: 0,
    color: 'inherit',
    fontFamily: 'sans',
    touchAction: 'manipulation',
    flexShrink: 0,
    scrollSnapAlign: 'start'
  }),
  css`
    transition: border-color ${transition.medium},
      background-color ${transition.medium}, box-shadow ${transition.medium};

    &[aria-selected='true'] {
      border-color: ${colors.secondary};
      background-color: ${colors[ACCENT.bgEdge] || colors.pinkest};
      box-shadow: inset 0 0 0 1px ${colors.secondary};
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not([aria-selected='true']) {
        border-color: ${colors.gray4};
      }
    }

    &:focus-visible {
      outline: 2px solid ${colors.secondary};
      outline-offset: 2px;
    }
  `
)

const isAtEnd = node => {
  if (!node) return true
  return node.scrollTop + node.clientHeight >= node.scrollHeight - 2
}

const TAB_TITLE_STYLE = theme({
  fontFamily: 'sans',
  fontWeight: 'bold',
  fontSize: 1,
  color: 'black',
  pb: 1,
  m: 0
})

const TAB_DESCRIPTION_STYLE = theme({
  fontFamily: 'sans',
  fontSize: 1,
  color: 'black60',
  lineHeight: 2,
  m: 0
})

const EMPTY_PANELS = []

export const ExamplesSwitcher = ({ panels = EMPTY_PANELS }) => {
  const baseId = useId()
  const listRef = useRef(null)
  const tabRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const active = panels[activeIndex]

  useEffect(() => {
    const node = listRef.current
    if (!node) return undefined
    const update = () => setAtEnd(isAtEnd(node))
    update()
    node.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      node.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [panels])

  if (!panels.length || !active) return null

  const selectIndex = (index, { focus } = {}) => {
    if (index < 0 || index >= panels.length) return
    setActiveIndex(index)
    if (focus) tabRefs.current[index]?.focus()
    tabRefs.current[index]?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth'
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
      <TabList ref={listRef} data-at-end={atEnd ? 'true' : 'false'}>
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
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectIndex(index)}
              onKeyDown={event => onKeyDown(event, index)}
            >
              <Text css={TAB_TITLE_STYLE}>{panel.title}</Text>
              <Text css={TAB_DESCRIPTION_STYLE}>{panel.description}</Text>
            </TabCard>
          )
        })}
      </TabList>
      <Box
        role='tabpanel'
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        css={theme({
          minWidth: 0,
          width: '100%',
          height: PANEL_HEIGHT,
          minHeight: PANEL_HEIGHT
        })}
      >
        <CodeEditor
          title={active.title}
          language={active.language || 'js'}
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
