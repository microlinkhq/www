import React from 'react'

import { ClearbitLogo } from 'components/elements'
import { Link as LinkIcon } from 'react-feather'
import { colors } from 'theme'

export default ({ width = '16px', height = width, value, domain }) =>
  value && domain ? (
    <ClearbitLogo companyName={domain} width={width} height={height} />
  ) : (
    <LinkIcon color={colors.black50} size={width} />
  )
