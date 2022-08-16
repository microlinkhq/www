import propTypes from '@styled-system/prop-types'
import styled from 'styled-components'
import { withLazy } from 'helpers/hoc'

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

Image.defaultProps = {
  decoding: 'async',
  loading: 'lazy'
}

export default withLazy(Image)
