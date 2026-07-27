import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Text from 'components/elements/Text'

export const Eyebrow = styled(Text)`
  ${theme({
    color: 'secondary',
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  })}
`

export const BodyText = props => (
  <Text
    as='p'
    {...props}
    css={[
      theme({
        fontFamily: 'sans',
        textAlign: 'left',
        maxWidth: layout.large,
        mx: 0,
        color: 'black',
        fontSize: [2, 2, 2, 2],
        lineHeight: 2
      }),
      props.css
    ]}
  />
)
