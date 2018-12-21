import styled from 'styled-components'
import { space, color, width } from 'styled-system'
import { withLink } from 'helpers'

const BlockLink = styled('a')(
  {
    as: 'a',
    color: 'inherit',
    display: 'block',
    textDecoration: 'none'
  },
  space,
  color,
  width
)

export default withLink(BlockLink)
