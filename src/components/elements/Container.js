import styled from 'styled-components'

import Flex from './Flex'

const Container = styled(Flex)``

Container.defaultProps = {
  as: 'article',
  flexDirection: 'column',
  ml: 'auto',
  mr: 'auto',
  pt: 4,
  pb: 4,
  px: 4
}

export default Container
