import React, { lazy, Suspense, useMemo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import Flex from 'components/elements/Flex'
import { fontSizes, cx, theme, speed } from 'theme'

const getWidth = size => {
  if (Array.isArray(size)) return size.map(index => fontSizes[index])
  return fontSizes[size] || size
}

const FeatherIcon = ({ color, icon, size = [1, 1, 2, 2], ...props }) => {
  const LazyIcon = useMemo(
    () => lazy(() => import(`react-feather/dist/icons/${icon}.js`)),
    [icon]
  )

  const AnimatedLazyIcon = useMemo(() => animated(LazyIcon), [LazyIcon])

  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: speed.quickly },
    reset: true,
    key: icon
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
        <AnimatedLazyIcon
          style={{ ...styles, willChange: 'opacity' }}
          color={color ? cx(color) : undefined}
        />
      </Suspense>
    </Flex>
  )
}

export default React.memo(FeatherIcon)
