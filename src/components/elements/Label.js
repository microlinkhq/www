import styled from 'styled-components'
import { colors, fontWeights } from 'theme'
import Text from './Text'
import is from 'styled-is'

const Label = styled(Text)`
  ${is('suffix')`
    &::after {
    font-weight: ${fontWeights.light};
    font-size: 0.8em;
    color: ${colors.black80};
    content: '${props => props.suffix}';
    }
  `};
`

Label.defaultProps = {
  ...Text.defaultProps,
  as: 'label',
  fontSize: 1,
  mb: 1
}

export default Label
