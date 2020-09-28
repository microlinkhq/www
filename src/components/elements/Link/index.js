import { withAnalytics, withLink } from 'helpers/hoc'
import styled from 'styled-components'

import solid from './solid'
import base from './base'
import Box from '../Box'

const Span = styled(Box)``

Span.defaultProps = {
  as: 'span'
}

export const LinkSolid = withLink(withAnalytics(solid))
export const Link = withLink(withAnalytics(base))
