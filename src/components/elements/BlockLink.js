import styled from 'styled-components'
import { withAnalytics, withLink } from 'helpers/hoc'
import Box from './Box'

const BlockLink = styled(Box)({
  color: 'inherit',
  display: 'block',
  textDecoration: 'none'
})

export default withAnalytics(withLink(BlockLink))
