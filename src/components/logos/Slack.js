import React from 'react'
import { Image } from 'components/elements'

import slackLogo from '../../../static/slack.svg'

export default props => (
  <Image
    alt='slack logo'
    width='inherit'
    height='inherit'
    lazy={false}
    src={slackLogo}
    {...props}
  />
)
