import { theme } from 'theme'
import { trackEvent } from 'helpers/plausible'
import React from 'react'

import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'

const ENTERPRISE_MAILTO =
  'mailto:hello@microlink.io?subject=Microlink%20Enterprise&body=Hi%2C%20I%27m%20interested%20in%20Microlink%20Enterprise.%20Could%20you%20share%20more%20details%3F%0D%0A%0D%0AThanks!%0D%0A'

const ContactButton = ({ event = 'enterprise contact', my = [4, null, 5] }) => (
  <Flex css={theme({ justifyContent: 'center', width: '100%', my })}>
    <Button
      variant='black'
      onClick={() => {
        trackEvent(event)
        window.open(ENTERPRISE_MAILTO, '_blank', 'noopener noreferrer')
      }}
    >
      <Caps css={theme({ fontSize: 0 })}>Contact sales</Caps>
    </Button>
  </Flex>
)

export default ContactButton
