import styled from 'styled-components'

import Flex from './Flex'

const Container = styled(Flex)``

Container.defaultProps = {
  flexDirection: 'column',
  ml: 'auto',
  mr: 'auto',
  pt: [5, 5, 6, 6],
  px: [3, 3, 0, 0]
}

export default Container
