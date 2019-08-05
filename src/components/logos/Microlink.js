import { Image } from 'components/elements'
import styled from 'styled-components'

const Microlink = styled(Image)([])

Microlink.defaultProps = {
  src: 'https://cdn.microlink.io/logo/logo.svg',
  style: { height: 'auto' }
}

export default Microlink
