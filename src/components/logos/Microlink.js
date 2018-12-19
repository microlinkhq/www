import { Image } from 'components/elements'
import styled from 'styled-components'

const Microlink = styled(Image)([])

Microlink.defaultProps = {
  ...Image.defaultProps,
  src: '/logo.svg',
  style: { height: 'auto' }
}

export default Microlink
