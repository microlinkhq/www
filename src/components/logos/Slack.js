import styled from 'styled-components'

import Image from '../elements/Image/Image'
import logo from '../../../static/slack.svg'

const Slack = styled(Image)([])

Slack.defaultProps = {
  src: logo,
  style: { height: 'auto' }
}

export default Slack
