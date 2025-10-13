import React, { createElement, lazy, Suspense } from 'react'
import Flex from 'components/elements/Flex'
import { fontSizes, cx, theme } from 'theme'

const getWidth = size => {
  if (Array.isArray(size)) return size.map(index => fontSizes[index])
  return fontSizes[size]
}

const FeatherIcon = ({ color, icon, size = [1, 1, 2, 2], ...props }) => {
  // Create a lazy component for this specific icon
  const LazyIcon = lazy(async () => {
    const FeatherIcons = await import('react-feather')
    return {
      default: () =>
        createElement(FeatherIcons[icon], {
          color: color ? cx(color) : undefined
        })
    }
  })

  return (
    <Flex
      css={theme({
        justifyContent: 'center',
        width: getWidth(size),
        height: '100%'
      })}
      as='span'
      {...props}
    >
      <Suspense fallback={null}>
        <LazyIcon />
      </Suspense>
    </Flex>
  )
}

export default React.memo(FeatherIcon)
