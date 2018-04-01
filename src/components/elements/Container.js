import { Container } from 'rebass'
import { textAlign, width, space } from 'styled-system'
import styled from 'styled-components'

const CustomContainer = styled(Container)`
  ${space};
  ${width};
  ${textAlign} max-width: ${props => props.maxWidth};
  margin: auto;
`

CustomContainer.defaultProps = {
  maxWidth: '1400px'
}

export default CustomContainer
