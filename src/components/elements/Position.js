import {
  compose,
  position,
  zIndex,
  top,
  right,
  bottom,
  left
} from 'styled-system'
import styled from 'styled-components'
import Box from './Box'

export const Position = styled(Box)(
  compose(
    position,
    zIndex,
    top,
    right,
    bottom,
    left
  )
)

Position.propTypes = {
  ...Box.propTypes,
  ...position.propTypes,
  ...zIndex.propTypes,
  ...top.propTypes,
  ...right.propTypes,
  ...bottom.propTypes,
  ...left.propTypes
}

export const Relative = styled(Position)``

Relative.defaultProps = {
  position: 'relative'
}

export const Absolute = styled(Position)``

Absolute.defaultProps = {
  position: 'absolute'
}

export const Fixed = styled(Position)``

Fixed.defaultProps = {
  position: 'fixed'
}

export const Sticky = styled(Position)``

Sticky.defaultProps = {
  position: 'sticky'
}
