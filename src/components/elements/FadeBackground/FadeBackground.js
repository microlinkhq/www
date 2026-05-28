import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import styled from 'styled-components'
import Box from 'components/elements/Box'
import { colors, space } from 'theme'

const HEIGHT = space[4]
const SCROLL_THRESHOLD = 1

const gradientDirection = position => {
  switch (position) {
    case 'top':
      return 'to bottom'
    case 'bottom':
      return 'to top'
    case 'left':
      return 'to right'
    case 'right':
      return 'to left'
    default:
      return 'to bottom'
  }
}

const FadeBackgroundContext = createContext({
  showTop: true,
  showBottom: true
})

const FadeBackgroundHorizontalContext = createContext({
  showLeft: false,
  showRight: false,
  fadeColor: colors.white
})

export const FadeBackground = styled(Box)`
  pointer-events: none;
  z-index: 1;
  display: ${({ $visible }) => ($visible === false ? 'none' : 'block')};
  background: linear-gradient(
    ${({ $position }) => gradientDirection($position)},
    ${({ $fadeColor }) => $fadeColor || colors.white} 0%,
    transparent 100%
  );

  ${({ $position, $overlay }) => {
    if ($overlay) {
      return `
        position: absolute;
        top: 0;
        bottom: 0;
        width: ${HEIGHT};
        height: 100%;
        ${$position === 'left' ? 'left: 0;' : 'right: 0;'}
      `
    }

    return `
      position: sticky;
      height: ${HEIGHT};
      width: 100%;
    `
  }}

  ${({ $position, $offsetTop = '36px', $overlay }) => {
    if ($overlay) return ''

    switch ($position) {
      case 'top':
        return `top: ${$offsetTop}; margin-bottom: -${HEIGHT};`
      case 'bottom':
        return `bottom: 0; margin-top: -${HEIGHT};`
      default:
        return ''
    }
  }}
`

FadeBackground.Top = props => {
  const { showTop } = useContext(FadeBackgroundContext)
  return <FadeBackground $position='top' $visible={showTop} {...props} />
}

FadeBackground.Bottom = props => {
  const { showBottom } = useContext(FadeBackgroundContext)
  return <FadeBackground $position='bottom' $visible={showBottom} {...props} />
}

FadeBackground.Left = props => {
  const { showLeft, fadeColor } = useContext(FadeBackgroundHorizontalContext)
  return (
    <FadeBackground
      $position='left'
      $overlay
      $visible={showLeft}
      $fadeColor={fadeColor}
      aria-hidden='true'
      {...props}
    />
  )
}

FadeBackground.Right = props => {
  const { showRight, fadeColor } = useContext(FadeBackgroundHorizontalContext)
  return (
    <FadeBackground
      $position='right'
      $overlay
      $visible={showRight}
      $fadeColor={fadeColor}
      aria-hidden='true'
      {...props}
    />
  )
}

export const useFadeMask = containerRef => {
  const [showTop, setShowTop] = useState(false)
  const [showBottom, setShowBottom] = useState(false)

  const updateScrollState = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const hasOverflow = scrollHeight > clientHeight + SCROLL_THRESHOLD
    const isAtTop = scrollTop <= SCROLL_THRESHOLD
    const isAtBottom =
      scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD

    setShowTop(hasOverflow && !isAtTop)
    setShowBottom(hasOverflow && !isAtBottom)
  }, [containerRef])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    updateScrollState()

    container.addEventListener('scroll', updateScrollState, { passive: true })
    return () => container.removeEventListener('scroll', updateScrollState)
  }, [containerRef, updateScrollState])

  return { showTop, showBottom }
}

export const useHorizontalFadeMask = containerRef => {
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    const hasOverflow = scrollWidth > clientWidth + SCROLL_THRESHOLD
    const isAtLeft = scrollLeft <= SCROLL_THRESHOLD
    const isAtRight = scrollLeft + clientWidth >= scrollWidth - SCROLL_THRESHOLD

    setShowLeft(hasOverflow && !isAtLeft)
    setShowRight(hasOverflow && !isAtRight)
  }, [containerRef])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    updateScrollState()

    container.addEventListener('scroll', updateScrollState, { passive: true })

    const ResizeObserverCtor = globalThis.ResizeObserver
    const resizeObserver =
      typeof ResizeObserverCtor === 'function'
        ? new ResizeObserverCtor(updateScrollState)
        : null

    resizeObserver?.observe(container)
    globalThis.addEventListener('resize', updateScrollState, { passive: true })

    return () => {
      container.removeEventListener('scroll', updateScrollState)
      globalThis.removeEventListener('resize', updateScrollState)
      resizeObserver?.disconnect()
    }
  }, [containerRef, updateScrollState])

  return { showLeft, showRight }
}

export const FadeBackgroundProvider = ({ children, containerRef }) => {
  const { showTop, showBottom } = useFadeMask(containerRef)

  return (
    <FadeBackgroundContext.Provider value={{ showTop, showBottom }}>
      {children}
    </FadeBackgroundContext.Provider>
  )
}

export const FadeBackgroundHorizontalProvider = ({
  children,
  containerRef,
  fadeColor = colors.white
}) => {
  const { showLeft, showRight } = useHorizontalFadeMask(containerRef)

  return (
    <FadeBackgroundHorizontalContext.Provider
      value={{ showLeft, showRight, fadeColor }}
    >
      <Box css={{ position: 'relative' }}>
        {children}
        <FadeBackground.Left />
        <FadeBackground.Right />
      </Box>
    </FadeBackgroundHorizontalContext.Provider>
  )
}

export default FadeBackground
