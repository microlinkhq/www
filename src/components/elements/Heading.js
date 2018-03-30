import { Heading as HeadingBase } from 'rebass'
import { lineHeight } from 'styled-system'

const Heading = HeadingBase.extend`
  ${lineHeight};
  max-width: ${props => props.maxWidth};
`

HeadingBase.defaultProps = {
  fontWeight: 'bold',
  blacklist: [...HeadingBase.defaultProps.blacklist, 'maxWidth', 'lineHeight']
}

export default Heading
