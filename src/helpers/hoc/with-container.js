import React from 'react'
import Box from '../../components/elements/Box'

const LAYOUT_WIDTH = 650

export const WIDTH = {
  normal: LAYOUT_WIDTH,
  large: LAYOUT_WIDTH * 1.2
}

export const CONTAINER_SPACE = {
  mt: 3,
  mb: 4
}

export const Container = props => (
  <Box
    maxWidth={['100%', '100%', WIDTH.normal, WIDTH.normal]}
    mr='auto'
    ml='auto'
    {...CONTAINER_SPACE}
    {...props}
  />
)

export const withContainer = (
  Component,
  containerProps = {},
  childProps
) => props => (
  <Container {...containerProps}>
    <Component {...childProps} {...props} />
  </Container>
)

withContainer.Container = Container
withContainer.CONTAINER_SPACE = CONTAINER_SPACE
withContainer.WIDTH = WIDTH
