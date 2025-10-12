import styled from 'styled-components'
import { withAnalytics } from 'helpers/hoc/with-analytics'
import { withLink } from 'helpers/hoc/with-link'
import Box from './Box'

const BlockLink = styled(Box)({
  color: 'inherit',
  display: 'block',
  textDecoration: 'none'
})

export default withAnalytics(withLink(BlockLink))
