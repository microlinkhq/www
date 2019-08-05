import styled from 'styled-components'
import { colors, fontWeights } from 'theme'

import Text from './Text'

const Label = styled(Text)`
  ${props =>
    props.suffix &&
    `
&::after {
  font-weight: ${fontWeights.light};
  font-size: 0.8em;
  color: ${colors.black80};
  content: '${props.suffix}';
  }
`}
`

Label.defaultProps = {
  as: 'label',
  fontSize: 1,
  mb: 1
}

export default Label
