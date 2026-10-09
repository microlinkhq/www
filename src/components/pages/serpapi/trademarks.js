import { layout, theme } from 'theme'
import React from 'react'

import Container from 'components/elements/Container'
import Text from 'components/elements/Text'

export const Trademarks = () => (
  <Container
    css={theme({
      justifyContent: 'center',
      pt: 0,
      pb: 5,
      maxWidth: layout.small
    })}
  >
    <Text
      as='p'
      css={theme({
        m: 0,
        color: 'black60',
        fontSize: [0, 0, 1, 1],
        lineHeight: 2,
        textAlign: 'center'
      })}
    >
      SerpApi and Google are trademarks of their respective owners. Microlink is
      not affiliated with or endorsed by either company. Competitor details come
      from their public pages and may have changed since they were checked.
    </Text>
  </Container>
)
