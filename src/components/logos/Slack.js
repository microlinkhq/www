import styled from 'styled-components'

import { Image } from 'components/elements'
import logo from '../../../static/slack.svg'

const Slack = styled(Image)([])

Slack.defaultProps = {
  lazy: false,
  src: logo,
  style: { height: 'auto' }
}

export default Slack
