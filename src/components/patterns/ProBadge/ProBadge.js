import React from 'react'

import Badge from 'components/elements/Badge/Badge'
import { Link } from 'components/elements/Link'
import { SignupLink } from 'components/patterns/SignupLink'
import Tooltip from '../Tooltip/Tooltip'

import { theme } from 'theme'

const ProBadge = ({ top, ...props }) => (
  <Tooltip
    css={theme({ display: 'inline', top: 0 })}
    content={
      <Tooltip.Content tabIndex='0'>
        Included with any API key,{' '}
        <SignupLink
          component={Link}
          cta='pro-badge:tooltip'
          css={{ display: 'inline-block' }}
        >
          the free one too
        </SignupLink>
        .
      </Tooltip.Content>
    }
    {...props}
  >
    <Badge>PRO</Badge>
  </Tooltip>
)

export default ProBadge
