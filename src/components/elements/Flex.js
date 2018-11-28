import {
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  alignContent,
  maxWidth,
  lineHeight,
  borderRadius,
  boxShadow
} from 'styled-system'

import styled from 'styled-components'

import Box from './Box'

const Flex = styled(Box)(
  {
    display: 'flex'
  },
  alignContent,
  alignItems,
  borderRadius,
  boxShadow,
  flexDirection,
  flexWrap,
  justifyContent,
  lineHeight,
  maxWidth,
  props => props.css
)

Flex.propTypes = {
  ...alignContent.propTypes,
  ...alignItems.propTypes,
  ...borderRadius.propTypes,
  ...boxShadow.propTypes,
  ...flexDirection.propTypes,
  ...flexWrap.propTypes,
  ...justifyContent.propTypes,
  ...lineHeight.propTypes,
  ...maxWidth.propTypes
}

Flex.displayName = 'Flex'

export default Flex
