import React from 'react'

import { ClearbitLogo } from 'components/elements'
import { Link as LinkIcon } from 'react-feather'
import { colors } from 'theme'

export default React.memo(({ size = '16px', value, domain }) =>
  value && domain ? (
    <ClearbitLogo companyName={domain} size={size} />
  ) : (
    <LinkIcon color={colors.black50} size={size} />
  )
)
