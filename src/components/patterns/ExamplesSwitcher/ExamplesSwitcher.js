import { colors, space, theme, toRaw, transition } from 'theme'
import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import styled, { css } from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

import { prefersReducedMotion } from 'helpers/reduced-motion'

import {
  DESKTOP_ONLY,
  SECONDARY_FOCUS_RING,
  TAB_DESCRIPTION_STYLE,
  TAB_TITLE_STYLE
} from './styles'
import measureVisibleTabsHeight from './measure-tabs-height'
import ExamplesSelect from './examples-select'

const TAB_GAP_PX = toRaw(space[2])
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
  ({ $viewportHeight, $stretch }) => {
    if ($viewportHeight) {
      return css`
        height: ${$viewportHeight}px;
        max-height: ${$viewportHeight}px;
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

const getScrollCues = node => {
  if (!node || node.scrollHeight <= node.clientHeight + 2) {
    return { up: false, down: false }
  }
  return {
    up: node.scrollTop > 2,
    down: node.scrollTop + node.clientHeight < node.scrollHeight - 2
  }
}

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
  const [scrollCues, setScrollCues] = useState({ up: false, down: false })
  const [viewportHeight, setViewportHeight] = useState(null)
  const activeIndex = panels.length
    ? Math.min(selectedIndex, panels.length - 1)
    : 0
  const active = panels[activeIndex]
  const tabsHeight =
    visibleTabs && viewportHeight ? `${viewportHeight}px` : undefined
  const panelHeight = tabsHeight
    ? [PANEL_HEIGHT[0], PANEL_HEIGHT[1], tabsHeight, tabsHeight]
    : PANEL_HEIGHT

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || !visibleTabs) {
      setViewportHeight(null)
      return undefined
    }

    const update = () => {
      const next = measureVisibleTabsHeight(list, visibleTabs, TAB_GAP_PX)
      setViewportHeight(current => (current === next ? current : next))
    }

    update()
    const observer =
      typeof window.ResizeObserver !== 'undefined'
        ? new window.ResizeObserver(update)
        : null
    observer?.observe(list)
    ;[...list.children].forEach(child => observer?.observe(child))
    return () => observer?.disconnect()
  }, [panels, visibleTabs])

  useEffect(() => {
    const node = listRef.current
    if (!node) return undefined
    let frame
    const update = () => {
      frame = undefined
      setScrollCues(current => {
        const next = getScrollCues(node)
        return next.up === current.up && next.down === current.down
          ? current
          : next
      })
    }
    const schedule = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update)
    }
    update()
    node.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer =
      typeof window.ResizeObserver !== 'undefined'
        ? new window.ResizeObserver(schedule)
        : null
    observer?.observe(node)
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      node.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer?.disconnect()
    }
  }, [panels, visibleTabs, viewportHeight])

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
          height: tabsHeight,
          alignSelf: 'stretch'
        })}
      >
        <TabList
          ref={listRef}
          $viewportHeight={viewportHeight}
          $stretch={!visibleTabs}
        >
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
