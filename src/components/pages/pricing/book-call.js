import React from 'react'
import styled from 'styled-components'

import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  BOOK_CALL_LABEL,
  BOOK_CALL_TITLE,
  bookCallUrl,
  trackBookCall
} from 'helpers/book-call'
import { layout, theme, SECTION_VERTICAL_SPACING } from 'theme'

import {
  CapabilityIcon,
  TILE_DESCRIPTION_FONT_SIZE,
  TILE_TITLE_FONT_SIZE
} from './shared'

const CalendarIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
    <line x1='16' y1='2' x2='16' y2='6' />
    <line x1='8' y1='2' x2='8' y2='6' />
    <line x1='3' y1='10' x2='21' y2='10' />
  </svg>
)

const BookCallCard = styled(Flex)`
  ${theme({
    width: '100%',
    maxWidth: layout.large,
    flexDirection: ['column', 'column', 'row', 'row'],
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: [3, 3, 4, 4],
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    boxShadow: 1,
    px: [3, 3, 4, 4],
    py: [3, 3, 4, 4],
    textAlign: ['center', 'center', 'left', 'left']
  })}
`

const BookCallButton = styled(Button)`
  ${theme({ flexShrink: 0, width: ['100%', 'auto', 'auto', 'auto'] })}
`

const BookCall = () => (
  <Container
    as='section'
    id='book-call'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4]
    })}
  >
    <BookCallCard>
      <Flex
        css={theme({
          gap: 3,
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center',
          flex: 1,
          minWidth: 0
        })}
      >
        <CapabilityIcon>{CalendarIcon}</CapabilityIcon>
        <Flex css={theme({ flexDirection: 'column', gap: 1, minWidth: 0 })}>
          <Text
            css={theme({
              fontWeight: 'bold',
              fontSize: TILE_TITLE_FONT_SIZE,
              color: 'black',
              lineHeight: 1
            })}
          >
            Bigger volume, custom infra, or just questions?
          </Text>
          <Text
            css={theme({
              fontSize: TILE_DESCRIPTION_FONT_SIZE,
              color: 'black70',
              lineHeight: 2
            })}
          >
            Book 15 minutes with the engineers who run the API. We&apos;ll walk
            through your use case, size your traffic and tell you which plan
            actually fits — or whether you need one at all.
          </Text>
        </Flex>
      </Flex>
      <BookCallButton
        forwardedAs='a'
        href={bookCallUrl('pricing')}
        variant='black'
        title={BOOK_CALL_TITLE}
        rel='noopener noreferrer'
        target='_blank'
        data-event-location='pricing'
        data-event-name={BOOK_CALL_LABEL}
        onClick={() => trackBookCall('pricing')}
      >
        <Caps as='span' css={theme({ fontSize: 0 })}>
          {BOOK_CALL_LABEL}
        </Caps>
      </BookCallButton>
    </BookCallCard>
  </Container>
)

export default BookCall
