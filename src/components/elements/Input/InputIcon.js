import { Unavatar } from 'components/elements'
import { Link as LinkIcon } from 'react-feather'
import { toPx, colors } from 'theme'
import React from 'react'

export default ({ width = 24, domain }) => {
  return domain ? (
    <Unavatar query={domain} width={toPx(width)} />
  ) : (
    <LinkIcon color={colors.black50} size='16px' />
  )
}
