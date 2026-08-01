import { breakpoints, colors, space, theme, transition } from 'theme'
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

const DESKTOP_TABS_MQ = `(min-width: ${breakpoints[1]})`

const TAB_GAP_PX = Number.parseInt(space[2], 10)
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
  ({ $viewportHeight, $stretch }) => {
    if ($viewportHeight) {
      return css`
        @media (min-width: ${breakpoints[1]}) {
          height: ${$viewportHeight}px;
          max-height: ${$viewportHeight}px;
        }
      `
    }
    if ($stretch) {
      return css`
        @media (min-width: ${breakpoints[1]}) {
          height: 0;
          min-height: 100%;
        }
      `
    }
    return undefined
  }
)

const ScrollCue = styled(Flex).attrs({
  'aria-hidden': true
})(
  theme({
    display: ['none', 'none', 'flex', 'flex'],
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
      outline: 2px solid ${colors.secondary};
      outline-offset: 2px;
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

const measureVisibleTabsHeight = (list, visibleTabs) => {
  const items = [...list.children]
  if (!items.length) return null
  const count = Math.min(visibleTabs, items.length)
  let height = 0
  for (let index = 0; index < count; index++) {
    height += items[index].offsetHeight
    if (index < count - 1) height += TAB_GAP_PX
  }
  return height
}

const TAB_TITLE_STYLE = theme({
  fontFamily: 'sans',
  fontWeight: 'bold',
  fontSize: 1,
  lineHeight: 2,
  color: 'black',
  pb: 1,
  m: 0
})

const TAB_DESCRIPTION_STYLE = {
  ...theme({
    fontFamily: 'sans',
    fontSize: 1,
    color: 'black60',
    lineHeight: 2,
    m: 0
  }),
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
}

const MobileSelect = styled.select(
  theme({
    width: '100%',
    bg: 'pinkest',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 2,
    py: 0,
    pl: 0,
    pr: '28px',
    m: 0
  }),
  css`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background-image: none;
    cursor: pointer;
    touch-action: manipulation;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid ${colors.secondary};
      outline-offset: 2px;
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
  const [scrollCues, setScrollCues] = useState({ up: false, down: false })
  const [viewportHeight, setViewportHeight] = useState(null)
  const [selectFocused, setSelectFocused] = useState(false)
  const activeIndex = panels.length
    ? Math.min(selectedIndex, panels.length - 1)
    : 0
  const active = panels[activeIndex]
  const tabsHeight =
    visibleTabs && viewportHeight ? `${viewportHeight}px` : undefined

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || !visibleTabs) {
      setViewportHeight(null)
      return undefined
    }

    const mq = window.matchMedia(DESKTOP_TABS_MQ)
    const update = () => {
      if (!mq.matches) {
        setViewportHeight(null)
        return
      }
      const next = measureVisibleTabsHeight(list, visibleTabs)
      if (next == null) return
      setViewportHeight(current => (current === next ? current : next))
    }

    update()
    const observer =
      typeof window.ResizeObserver !== 'undefined'
        ? new window.ResizeObserver(update)
        : null
    observer?.observe(list)
    ;[...list.children].forEach(child => observer?.observe(child))
    mq.addEventListener('change', update)
    return () => {
      observer?.disconnect()
      mq.removeEventListener('change', update)
    }
  }, [panels, visibleTabs])

  useEffect(() => {
    const node = listRef.current
    if (!node) return undefined
    const mq = window.matchMedia(DESKTOP_TABS_MQ)
    let frame
    const update = () => {
      frame = undefined
      if (!mq.matches) {
        setScrollCues(current =>
          current.up || current.down ? { up: false, down: false } : current
        )
        return
      }
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
    mq.addEventListener('change', schedule)
    const observer =
      typeof window.ResizeObserver !== 'undefined'
        ? new window.ResizeObserver(schedule)
        : null
    observer?.observe(node)
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      node.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mq.removeEventListener('change', schedule)
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
      <Box
        css={theme({
          display: ['block', 'block', 'none', 'none'],
          position: 'relative',
          minWidth: 0,
          bg: 'pinkest',
          border: 1,
          borderColor: 'secondary',
          borderRadius: 3,
          boxShadow: `inset 0 0 0 1px ${colors.secondary}`,
          p: 3,
          textAlign: 'left'
        })}
      >
        <Box css={theme({ position: 'relative', mb: 1 })}>
          <MobileSelect
            aria-label='Choose an SDK example'
            value={active.id}
            onChange={event => {
              const index = panels.findIndex(
                panel => panel.id === event.target.value
              )
              selectIndex(index)
            }}
            onFocus={() => setSelectFocused(true)}
            onBlur={() => setSelectFocused(false)}
          >
            {panels.map(panel => (
              <option key={panel.id} value={panel.id}>
                {panel.title}
              </option>
            ))}
          </MobileSelect>
          <Flex
            aria-hidden
            css={theme({
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              color: 'black',
              pointerEvents: 'none'
            })}
          >
            {selectFocused
              ? (
                <ChevronUp size={18} strokeWidth={2.25} />
                )
              : (
                <ChevronDown size={18} strokeWidth={2.25} />
                )}
          </Flex>
        </Box>
        <Text css={TAB_DESCRIPTION_STYLE}>{active.description}</Text>
      </Box>

      <Box
        css={theme({
          display: ['none', 'none', 'block', 'block'],
          position: 'relative',
          minWidth: 0,
          minHeight: 0,
          height: tabsHeight
            ? ['auto', 'auto', tabsHeight, tabsHeight]
            : undefined,
          alignSelf: ['start', 'start', 'stretch', 'stretch']
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
                <Text css={TAB_TITLE_STYLE}>{panel.title}</Text>
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
          height: tabsHeight || PANEL_HEIGHT,
          minHeight: tabsHeight || PANEL_HEIGHT
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
