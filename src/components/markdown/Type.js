import styled from 'styled-components'
import { theme } from 'theme'
import React from 'react'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

const StyledType = styled(Text)`
  ${theme({
    bg: 'gray1',
    color: 'gray7',
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'regular'
  })}

  padding: 0.2em 0.4em;
  margin: 0;
  border-radius: 3px;
`

export const Type = props => <StyledType as='span' {...props} />

export const TypeContainer = styled(Box)`
  display: inline;
`
