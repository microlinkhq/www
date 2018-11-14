import sys from '@rebass/components'
import styled from 'styled-components'
import { colors } from 'theme'
import is from 'styled-is'

const LabelBase = sys(
  {
    is: 'label',
    fontSize: 1,
    mb: 1,
    alignItems: 'center'
  },
  {
    display: 'flex'
  },
  'alignItems',
  'fontSize',
  'space',
  'color'
)

LabelBase.displayName = 'Label'

const Label = sys({ extend: LabelBase }, 'display', 'textAlign', 'space')

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
