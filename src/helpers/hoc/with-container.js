import React from 'react'
import Box from '../../components/elements/Box'

import { layout, theme } from 'theme'

export const CONTAINER_SPACE = {
  mt: 3,
  mb: 4
}

export const Container = props => (
  <Box
    css={theme({
      maxWidth: ['100%', '100%', layout.small, layout.small],
      mx: 'auto',
      ...CONTAINER_SPACE
    })}
    {...props}
  />
)

export const withContainer = (Component, containerProps = {}, childProps) => {
  const ContainerWrapper = props => (
    <Container {...containerProps}>
      <Component {...childProps} {...props} />
    </Container>
  )
  return ContainerWrapper
}

withContainer.Container = Container
withContainer.CONTAINER_SPACE = CONTAINER_SPACE
