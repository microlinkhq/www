import React from 'react'

import Badge from 'components/elements/Badge/Badge'
import { Link } from 'components/elements/Link'
import Tooltip from '../Tooltip/Tooltip'

import { theme } from 'theme'

const ProBadge = ({ top, ...props }) => (
  <Tooltip
    css={theme({ display: 'inline', top: 0 })}
    content={
      <Tooltip.Content tabIndex='0'>
        You have to buy{' '}
        <Link
          css={{ display: 'inline-block' }}
          href='https://microlink.io#pricing'
        >
          pro
        </Link>{' '}
        plan to use this feature.
      </Tooltip.Content>
    }
    {...props}
  >
    <Badge>PRO</Badge>
  </Tooltip>
)

export default ProBadge
