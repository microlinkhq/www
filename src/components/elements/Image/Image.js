import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'

import {
  compose,
  space,
  color,
  maxWidth,
  width,
  height,
  display,
  textAlign,
  borderRadius
} from 'styled-system'

const Image = styled('img')(
  {
    display: 'block',
    maxWidth: '100%'
  },
  compose(
    space,
    color,
    width,
    height,
    maxWidth,
    display,
    textAlign,
    borderRadius
  )
)

Image.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.width,
  ...propTypes.height,
  ...propTypes.maxWidth,
  ...propTypes.display,
  ...propTypes.textAlign,
  ...propTypes.borderRadius
}

export default Image
