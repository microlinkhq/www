import { Image } from 'components/elements'
import styled from 'styled-components'

import logo from '../../../static/slack.svg'

const Slack = styled(Image)([])

Slack.defaultProps = {
  src: logo,
  style: { height: 'auto' }
}

export default Slack
