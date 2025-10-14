import React, { lazy, Suspense } from 'react'
import Flex from 'components/elements/Flex'
import { fontSizes, cx, theme } from 'theme'

const getWidth = size => {
  if (Array.isArray(size)) return size.map(index => fontSizes[index])
  return fontSizes[size]
}

const FeatherIcon = ({ color, icon, size = [1, 1, 2, 2], ...props }) => {
  const LazyIcon = lazy(() => import(`react-feather/dist/icons/${icon}.js`))

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
        <LazyIcon color={color ? cx(color) : undefined} />
      </Suspense>
    </Flex>
  )
}

export default React.memo(FeatherIcon)
