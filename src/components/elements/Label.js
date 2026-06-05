import styled, { css } from 'styled-components'
import { colors, fontWeights, theme } from 'theme'
import is from 'styled-is'
import React from 'react'

import Text from './Text'

export const labelStyle = css`
  font-weight: ${fontWeights.normal};
  font-size: 80%;
  color: ${colors.black60};
`

const StyledLabel = styled(Text).withConfig({
  shouldForwardProp: prop => !['suffix'].includes(prop)
})`
  ${theme({ fontSize: 1 })};

  ${is('suffix')`
  &::after {
      content: '${props => props.suffix}';
      ${labelStyle};
    }
  `};
`

const Label = props => <StyledLabel as='label' {...props} />

export default Label
