import { Image } from 'components/elements'
import styled from 'styled-components'

import logo from '../../../static/logo.svg'

const Microlink = styled(Image)([])

Microlink.defaultProps = {
  ...Image.defaultProps,
  src: logo,
  style: { height: 'auto' }
}

export default Microlink
