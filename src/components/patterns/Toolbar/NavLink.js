import { NavLink as NavLinkBase } from 'components/elements'
import { css } from 'styled-components'
import { transition, fontWeights, colors } from 'theme'

import withLink from '../../elements/Link/with-link'

const activeStyle = css`
  font-weight: ${fontWeights.bold};
  color: ${colors.gray9};
`

const NavLink = NavLinkBase.extend`
  text-transform: uppercase;
  transition: color ${transition.medium};
  color: ${colors.gray7};
  box-shadow: none;

  &:hover {
    ${activeStyle};
  }

  > .active {
    ${activeStyle};
  }
`

NavLink.defaultProps = {
  is: 'div',
  blacklist: [...Object.keys(NavLink.propTypes), 'active']
}

export default withLink(NavLink)
