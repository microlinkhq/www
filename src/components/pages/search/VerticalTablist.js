import React, { useRef } from 'react'
import { colors, theme } from 'theme'

import Flex from 'components/elements/Flex'
import { FadeBackgroundHorizontalProvider } from 'components/elements/FadeBackground/FadeBackground'

const VerticalTablist = ({
  'aria-label': ariaLabel,
  children,
  css,
  ...props
}) => {
  const scrollRef = useRef(null)

  return (
    <FadeBackgroundHorizontalProvider
      containerRef={scrollRef}
      fadeColor={colors.white}
    >
      <Flex
        ref={scrollRef}
        role='group'
        aria-label={ariaLabel}
        css={theme({
          flexWrap: 'nowrap',
          alignItems: 'stretch',
          justifyContent: ['flex-start', 'flex-start', 'center', 'center'],
          gap: [1, 1, 2, 2],
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          ...css
        })}
        {...props}
      >
        {children}
      </Flex>
    </FadeBackgroundHorizontalProvider>
  )
}

export default VerticalTablist
