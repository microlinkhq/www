import styled from 'styled-components'
import propTypes from '@styled-system/prop-types'

import {
  space,
  size,
  color,
  maxWidth,
  width,
  display,
  textAlign,
  borderRadius
} from 'styled-system'

const Image = styled('img')(
  {
    display: 'block',
    maxWidth: '100%'
  },
  space,
  color,
  size,
  width,
  maxWidth,
  display,
  textAlign,
  borderRadius
)

Image.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.width,
  ...propTypes.maxWidth,
  ...propTypes.size,
  ...propTypes.display,
  ...propTypes.textAlign,
  ...propTypes.borderRadius
}

export default Image
