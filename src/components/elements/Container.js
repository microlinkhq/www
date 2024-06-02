import styled from 'styled-components'
import { theme } from 'theme'

import Flex from './Flex'

const Container = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    mx: 'auto',
    pt: [5, null, 6],
    px: [3, null, 0]
  })}
`

export default Container
