import styled from 'styled-components'
import { layout } from 'theme'

import Box from './Box'

const Container = styled(Box)([])

Container.defaultProps = {
  ...Box.defaultProps,
  px: 3,
  mx: 'auto',
  maxWidth: layout
}

export default Container
