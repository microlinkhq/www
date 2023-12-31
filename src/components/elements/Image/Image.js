import styled from 'styled-components'
import { withLazy } from 'helpers/hoc'

import {
  space,
  color,
  layout,
  typography,
  border
} from '@techstack/styled-system'

const Image = styled('img')(
  {
    display: 'block',
    maxWidth: '100%'
  },
  space,
  color,
  layout,
  typography,
  border
)

Image.defaultProps = {
  decoding: 'async',
  loading: 'lazy'
}

export default withLazy(Image)
