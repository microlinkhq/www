import styled from 'styled-components'
import { colors } from 'theme'
import Text from './Text'
import is from 'styled-is'

const Label = styled(Text)`
  ${is('suffix')`
    &::after {
    font-weight: 100;
    font-size: 0.8em;
    color: ${colors.black50};
    content: '${props => props.suffix}';
    }
  `};
`

Label.displayName = 'Label'

Label.defaultProps = {
  ...Label.defaultProps,
  as: 'label',
  fontSize: 1,
  mb: 1
}

export default Label
