import React from 'react'

import { Box, Unavatar } from 'components/elements'
import { Link as LinkIcon } from 'react-feather'
import { colors } from 'theme'

export default ({ width = '24px', height = '100%', domain }) => {
  const children = domain ? (
    <Unavatar query={domain} width={width} height={height} />
  ) : (
    <LinkIcon color={colors.black50} size={width} />
  )

  return <Box width={width} pl={2} children={children} />
}
