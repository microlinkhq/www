import { theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Caption from 'components/patterns/Caption/Caption'

import { BLOCK_STYLE } from './shared'

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
  </Flex>
)

export default DpaHero
