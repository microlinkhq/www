import { flexbox } from '@techstack/styled-system'

import styled from 'styled-components'

import Box from './Box'

const Flex = styled(Box)(
  {
    display: 'flex'
  },
  flexbox
)

export default Flex
