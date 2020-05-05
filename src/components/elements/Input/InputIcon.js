import { Box, Unavatar } from 'components/elements'
import { Link as LinkIcon } from 'react-feather'
import { toPx, colors } from 'theme'
import React from 'react'

export default ({ width = 24, domain }) => {
  const children = domain ? (
    <Unavatar query={domain} width={toPx(width)} />
  ) : (
    <LinkIcon color={colors.black50} size={toPx(width / 2)} />
  )

  return <Box pt={domain ? 0 : 1} width={width} pl={2} children={children} />
}
