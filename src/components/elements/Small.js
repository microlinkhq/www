import styled from 'styled-components'

import Text from './Text'

const Small = styled(Text)([])

Small.defaultProps = {
  ...Text.defaultProps,
  as: 'small',
  fontSize: 0
}

Small.displayName = 'Small'

export default Small
