import { theme } from 'theme'
import { trackEvent } from 'helpers/gtag'
import React from 'react'

import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Caption from 'components/patterns/Caption/Caption'

import { REQUEST_DPA_HREF, REQUEST_DPA_LABEL, BLOCK_STYLE } from './shared'

export const RequestDpaButton = ({ location }) => (
  <Button
    as='a'
    href={REQUEST_DPA_HREF}
    variant='black'
    onClick={() => trackEvent('dpa request', { location })}
  >
    <Caps css={theme({ fontSize: 0 })}>{REQUEST_DPA_LABEL}</Caps>
  </Button>
)

const DpaHero = () => (
  <Flex
    as='section'
    id='summary'
    css={theme({
      ...BLOCK_STYLE,
      flexDirection: 'column',
      alignItems: 'center'
    })}
  >
    <Caption forwardedAs='p' css={theme({ textAlign: 'center' })}>
      Microlink acts as a processor of the data you send through the API. This
      DPA sets out how we handle it.
    </Caption>
    <Flex
      css={theme({
        pt: 4,
        gap: 3,
        flexDirection: ['column', 'row', 'row', 'row'],
        alignItems: 'center',
        justifyContent: 'center'
      })}
    >
      <RequestDpaButton location='hero' />
      <Link href='/subprocessors'>View subprocessors</Link>
    </Flex>
  </Flex>
)

export default DpaHero
