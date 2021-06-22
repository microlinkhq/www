import { Popper, PopperAnchor, PopperContent } from '@radix-ui/react-popper'
import React, { useState, useRef, useEffect } from 'react'
import { Box, Text } from 'components/elements'
import styled from 'styled-components'
import { shadows } from 'theme'

const CursorContent = styled(Text)`
  border-radius: 9999px;
  border: ${props => `1.8px solid ${props.color}`};
  box-shadow: ${shadows[0]};
`

const Cursor = ({ color = 'white', style: innerStyle, bg, text, children }) => {
  const [isActive, setIsActive] = useState(false)
  const mousePosRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = event =>
    (mousePosRef.current = { x: event.pageX, y: event.pageY })

  const virtualRef = useRef({
    getBoundingClientRect: () =>
      window.DOMRect.fromRect({ width: 0, height: 0, ...mousePosRef.current })
  })

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const onMouseEnter = () => setIsActive(true)
  const onMouseLeave = () => setIsActive(false)

  const cursor = `url("data:image/svg+xml,%3Csvg shape-rendering='geometricPrecision' xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none'%3E%3Cg filter='url(%23filter0_d)'%3E%3Cpath fill='%23${bg.slice(
    1
  )}' d='M9.63 6.9a1 1 0 011.27-1.27l11.25 3.75a1 1 0 010 1.9l-4.68 1.56a1 1 0 00-.63.63l-1.56 4.68a1 1 0 01-1.9 0L9.63 6.9z'/%3E%3Cpath stroke='%23fff' stroke-width='1.5' d='M11.13 4.92a1.75 1.75 0 00-2.2 2.21l3.74 11.26a1.75 1.75 0 003.32 0l1.56-4.68a.25.25 0 01.16-.16L22.4 12a1.75 1.75 0 000-3.32L11.13 4.92z'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d' width='32.26' height='32.26' x='.08' y='.08' filterUnits='userSpaceOnUse'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='4'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0'/%3E%3CfeBlend in2='BackgroundImageFix' mode='normal' result='effect1_dropShadow'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow' mode='normal' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E") 6 2, default`

  return (
    <>
      <Box
        style={isActive ? { cursor, ...innerStyle } : innerStyle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Box>
      {isActive && (
        <Popper>
          <PopperAnchor virtualRef={virtualRef} />
          <PopperContent align='start' sideOffset={15} alignOffset={15}>
            <CursorContent
              py='5px'
              px='10px'
              fontSize='12px'
              color={color}
              bg={bg}
            >
              {text}
            </CursorContent>
          </PopperContent>
        </Popper>
      )}
    </>
  )
}

export default Cursor
