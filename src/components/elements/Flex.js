import {
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  alignContent
} from 'styled-system'

import styled from 'styled-components'

import Box from './Box'

const Flex = styled(Box)(
  {
    display: 'flex'
  },
  alignContent,
  alignItems,
  flexDirection,
  flexWrap,
  justifyContent
)

Flex.propTypes = {
  ...Box.propTypes,
  ...alignContent.propTypes,
  ...alignItems.propTypes,
  ...flexDirection.propTypes,
  ...flexWrap.propTypes,
  ...justifyContent.propTypes
}

Flex.displayName = 'Flex'

export default Flex
