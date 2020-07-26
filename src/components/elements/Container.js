import styled from 'styled-components'

import Flex from './Flex'

const Container = styled(Flex)``

Container.defaultProps = {
  as: 'article',
  flexDirection: 'column',
  ml: 'auto',
  mr: 'auto',
  pt: 6,
  px: 3
}

export default Container
