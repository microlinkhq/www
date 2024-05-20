import { Text } from 'components/elements'
import { commonHeadingStyles } from 'components/elements/Heading'
import styled from 'styled-components'
import { theme } from 'theme'
import React from 'react'

const Caption = styled(props => <Text as='h3' {...props} />)(
  theme({
    ...commonHeadingStyles,
    lineHeight: 2,
    fontWeight: 'normal',
    fontSize: [2, 2, 3, 3]
  })
)

export default Caption
