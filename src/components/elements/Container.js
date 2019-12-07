import styled from 'styled-components'
import { layout } from 'theme'

import Flex from './Flex'

const Container = styled(Flex)``

Container.defaultProps = {
  as: 'article',
  flexDirection: 'column',
  ml: 'auto',
  mr: 'auto',
  pt: [4, 5],
  pb: [4, 5],
  pl: 3,
  pr: 3
}

export default Container
