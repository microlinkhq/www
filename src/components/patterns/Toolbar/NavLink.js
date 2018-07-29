import { NavLink as NavLinkBase } from 'components/elements'
import { css } from 'styled-components'
import { transition, fontWeights, colors } from 'theme'

const activeStyle = css`
  font-weight: ${fontWeights.bold};
  color: ${colors.gray9};
`

const NavLink = NavLinkBase.extend`
  text-transform: uppercase;
  transition: color ${transition.short};
  color: ${colors.gray7};
  box-shadow: none;

  &:hover {
    ${activeStyle};
  }

  ${props => props.active && activeStyle};
`

NavLink.defaultProps = {
  is: 'a',
  blacklist: [...Object.keys(NavLink.propTypes), 'active']
}

export default NavLink
