import { system } from 'helpers'

const BlockLink = system(
  {
    as: 'a',
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
