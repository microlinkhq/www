import styled, { css } from 'styled-components'
import { colors, fontWeights } from 'theme'
import is from 'styled-is'

import Text from './Text'

const getColor = ({ theme }) =>
  theme === 'dark' ? colors.white60 : colors.black60

export const labelStyle = css`
  font-weight: ${fontWeights.normal};
  font-size: 80%;
  color: ${props => getColor(props)};
`

const Label = styled(Text)`
  ${is('suffix')`
  &::after {
      content: '${props => props.suffix}';
      ${labelStyle};
    }
  `};
`

Label.defaultProps = {
  as: 'label',
  fontSize: 1,
  mb: 1
}

export default Label
