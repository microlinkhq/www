import styled, { css } from 'styled-components'
import { colors, fontWeights } from 'theme'

import Text from './Text'

export const labelStyle = css`
  font-weight: ${fontWeights.normal};
  font-size: 80%;
  color: ${colors.black60};
`

const Label = styled(Text)`
  ${props =>
    props.suffix &&
    `
    &::after {
      font-weight: ${fontWeights.normal};
      font-size: 80%;
      color: ${colors.black60};
      content: '${props.suffix}';
    }`}
`

Label.defaultProps = {
  as: 'label',
  fontSize: 1,
  mb: 1
}

export default Label
