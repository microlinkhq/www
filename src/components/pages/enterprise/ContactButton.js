import { theme } from 'theme'
import { trackEvent } from 'helpers/gtag'
import {
  BOOK_CALL_LABEL,
  BOOK_CALL_TITLE,
  bookCallUrl,
  trackBookCall
} from 'helpers/book-call'
import React from 'react'

import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'

export const BUSINESS_MAILTO =
  'mailto:hello@microlink.io?subject=Microlink%20Business&body=Hi%2C%20we%27d%20like%20a%20quote%20for%20Microlink%20Business.%0D%0A%0D%0ALegal%20entity%3A%0D%0AVAT%20number%3A%0D%0AExpected%20requests%20per%20month%3A%0D%0A%0D%0AThanks!%0D%0A'

const ENTERPRISE_MAILTO =
  'mailto:hello@microlink.io?subject=Microlink%20Enterprise&body=Hi%2C%20I%27m%20interested%20in%20Microlink%20Enterprise.%20Could%20you%20share%20more%20details%3F%0D%0A%0D%0AThanks!%0D%0A'

const ContactButton = ({
  event = 'enterprise contact',
  label = 'Contact sales',
  mailto = ENTERPRISE_MAILTO,
  medium = 'enterprise',
  my = [4, null, 5]
}) => (
  <Flex
    css={theme({
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: ['column', 'row', 'row', 'row'],
      gap: [2, 3, 3, 3],
      width: '100%',
      my
    })}
  >
    <Button
      variant='black'
      onClick={() => {
        trackEvent(event)
        window.open(mailto, '_blank', 'noopener noreferrer')
      }}
    >
      <Caps css={theme({ fontSize: 0 })}>{label}</Caps>
    </Button>
    <Button
      as='a'
      href={bookCallUrl(medium)}
      variant='white'
      title={BOOK_CALL_TITLE}
      rel='noopener noreferrer'
      target='_blank'
      data-event-location={medium}
      data-event-name={BOOK_CALL_LABEL}
      onClick={() => trackBookCall(medium)}
    >
      <Caps as='span' css={theme({ fontSize: 0 })}>
        {BOOK_CALL_LABEL}
      </Caps>
    </Button>
  </Flex>
)

export default ContactButton
