import styled from 'styled-components'
import { theme } from 'theme'

import Flex from './Flex'

const Container = styled(Flex).withConfig({
  shouldForwardProp: prop => !['px'].includes(prop)
})`
  ${theme({
    flexDirection: 'column',
    ml: 'auto',
    mr: 'auto',
    pt: [5, 5, 6, 6],
    px: [3, 3, 0, 0]
  })}
`

Container.defaultProps = {
  px: [3, 3, 0, 0]
}

export default Container
