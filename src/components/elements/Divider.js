import { system } from 'helpers'

export const Divider = system(
  {
    as: 'hr',
    mx: 0,
    my: 3,
    border: 0,
    borderBottom: 1,
    borderColor: 'gray'
  },
  'borders',
  'borderColor',
  'space',
  'color'
)

Divider.displayName = 'Divider'

export default Divider
