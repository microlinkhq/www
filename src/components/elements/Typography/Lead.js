import styled from 'styled-components'

import Text from './Text'

const Lead = styled(Text)``

Lead.defaultProps = {
  ...Text.defaultProps,
  fontSize: [2, 4],
  lineHeight: 2
}

export default Lead
