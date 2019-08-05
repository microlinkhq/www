import styled from 'styled-components'
import { layout } from 'theme'

import Box from './Box'

const Container = styled(Box)([])

Container.defaultProps = {
  pl: 3,
  pr: 3,
  ml: 'auto',
  mr: 'auto',
  maxWidth: layout.large
}

export default Container
