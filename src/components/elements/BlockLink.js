import { system } from 'helpers'

const BlockLink = system(
  {
    is: 'a',
    color: 'inherit'
  },
  {
    display: 'block',
    textDecoration: 'none'
  },
  'space',
  'color',
  'width'
)

BlockLink.displayName = 'BlockLink'

export default BlockLink
