import {
  compose,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  alignContent
} from 'styled-system'

import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'

import Box from './Box'

const Flex = styled(Box)(
  {
    display: 'flex'
  },
  compose(
    alignContent,
    alignItems,
    flexDirection,
    flexWrap,
    justifyContent
  )
)

Flex.propTypes = {
  ...Box.propTypes,
  ...propTypes.alignContent,
  ...propTypes.alignItems,
  ...propTypes.flexDirection,
  ...propTypes.flexWrap,
  ...propTypes.justifyContent
}

export default Flex
