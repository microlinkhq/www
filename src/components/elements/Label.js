import styled, { css } from 'styled-components'
import { colors, fontWeights, theme } from 'theme'
import is from 'styled-is'
import React from 'react'

import Text from './Text'

const getColor = ({ isDark }) => (isDark ? colors.white60 : colors.black60)

export const labelStyle = css`
  font-weight: ${fontWeights.normal};
  font-size: 80%;
  color: ${props => getColor(props)};
`

const StyledLabel = styled(Text).withConfig({
  shouldForwardProp: prop => !['isDark', 'suffix'].includes(prop)
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
