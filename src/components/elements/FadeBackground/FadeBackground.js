import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import styled from 'styled-components'
import Box from 'components/elements/Box'
import { space } from 'theme'

const HEIGHT = space[4]
const SCROLL_THRESHOLD = 1

const FadeBackgroundContext = createContext({
  showTop: true,
  showBottom: true
})

export const FadeBackground = styled(Box)`
  position: sticky;
  pointer-events: none;
  z-index: 1;
  display: ${({ $visible }) => ($visible === false ? 'none' : 'block')};
  background: linear-gradient(
    to ${({ $position }) => ($position === 'bottom' ? 'top' : 'bottom')},
    white 0%,
    transparent 100%
  );

  height: ${HEIGHT};
  width: 100%;

  ${({ $position }) => {
    switch ($position) {
      case 'top':
        return `top: 36px; margin-bottom: -${HEIGHT};`
      case 'bottom':
        return `bottom: 0; margin-top: -${HEIGHT};`
      case 'left':
        return `width: ${HEIGHT}; height: 100%; left: 0; margin-right: -${HEIGHT};`
      case 'right':
        return `width: ${HEIGHT}; height: 100%; right: 0; margin-left: -${HEIGHT};`
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

export const FadeBackgroundProvider = ({ children, containerRef }) => {
  const { showTop, showBottom } = useFadeMask(containerRef)

  return (
    <FadeBackgroundContext.Provider value={{ showTop, showBottom }}>
      {children}
    </FadeBackgroundContext.Provider>
  )
}

export default FadeBackground
