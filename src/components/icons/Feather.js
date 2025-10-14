import React, { lazy, Suspense, useMemo } from 'react'
import { useSpring, animated } from '@react-spring/web'
import Flex from 'components/elements/Flex'
import { fontSizes, cx, theme, speed } from 'theme'

const getWidth = size => {
  if (Array.isArray(size)) return size.map(index => fontSizes[index])
  return fontSizes[size] || size
}

const FeatherIcon = ({
  color,
  icon,
  size = [1, 1, 2, 2],
  animations = true,
  ...props
}) => {
  const LazyIcon = useMemo(
    () => lazy(() => import(`react-feather/dist/icons/${icon}.js`)),
    [icon]
  )

  const AnimatedLazyIcon = useMemo(() => animated(LazyIcon), [LazyIcon])

  const styles = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: speed.quickly },
    immediate: !animations
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
        {animations ? (
          <AnimatedLazyIcon
            style={{ ...styles, willChange: 'opacity' }}
            color={color ? cx(color) : undefined}
          />
        ) : (
          <LazyIcon color={color ? cx(color) : undefined} />
        )}
      </Suspense>
    </Flex>
  )
}

export default React.memo(FeatherIcon)
