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
import { useLeadRef } from 'components/hook/use-lead-ref'

export const BUSINESS_MAILTO =
  'mailto:hello@microlink.io?subject=Microlink%20Business&body=Hi%2C%20we%27d%20like%20a%20quote%20for%20Microlink%20Business.%0D%0A%0D%0ALegal%20entity%3A%0D%0AVAT%20number%3A%0D%0AExpected%20requests%20per%20month%3A%0D%0A%0D%0AThanks!%0D%0A'

const ENTERPRISE_MAILTO =
  'mailto:hello@microlink.io?subject=Microlink%20Enterprise&body=Hi%2C%20I%27m%20interested%20in%20Microlink%20Enterprise.%20Could%20you%20share%20more%20details%3F%0D%0A%0D%0AThanks!%0D%0A'

export const DPA_MAILTO =
  'mailto:hello@microlink.io?subject=Signed%20DPA%20request&body=Hi%2C%20we%27d%20like%20a%20countersigned%20Microlink%20DPA.%0D%0A%0D%0ALegal%20entity%3A%0D%0AVAT%20number%3A%0D%0AUse%20case%20(for%20Annex%20I)%3A%0D%0ATransfer%20mechanism%20needed%20(EU%20SCCs%20%2F%20UK%20Addendum%20%2F%20Swiss%20amendments)%3A%0D%0A%0D%0AThanks!%0D%0A'

const MAILTO_BY_LEAD_REF = { dpa: DPA_MAILTO }

const ContactButton = ({
  event = 'enterprise contact',
  label = 'Contact sales',
  mailto = ENTERPRISE_MAILTO,
  medium = 'enterprise',
  my = [4, null, 5]
}) => {
  const leadRef = useLeadRef()
  const leadMailto = Object.hasOwn(MAILTO_BY_LEAD_REF, leadRef ?? '')
    ? MAILTO_BY_LEAD_REF[leadRef]
    : mailto
  return (
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
          trackEvent(event, { ref: leadRef })
          window.open(leadMailto, '_blank', 'noopener noreferrer')
        }}
      >
        <Caps css={theme({ fontSize: 0 })}>{label}</Caps>
      </Button>
      <Button
        as='a'
        href={bookCallUrl(medium, leadRef)}
        variant='white'
        title={BOOK_CALL_TITLE}
        rel='noopener noreferrer'
        target='_blank'
        data-event-location={medium}
        data-event-name={BOOK_CALL_LABEL}
        onClick={() => trackBookCall(medium, leadRef)}
      >
        <Caps as='span' css={theme({ fontSize: 0 })}>
          {BOOK_CALL_LABEL}
        </Caps>
      </Button>
    </Flex>
  )
}

export default ContactButton
