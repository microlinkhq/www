import system from 'system-components'
import { Label as LabelBase } from 'rebass'
import styled from 'styled-components'
import { colors } from 'theme'
import is from 'styled-is'

const Label = system({ is: LabelBase }, 'display', 'textAlign', 'space')

export default styled(Label)`
  ${is('suffix')`
&::after {
  font-weight: 100;
  font-size: 0.8em;
  color: ${colors.black50};
  content: '${props => props.suffix}';
}
`};
`
