import styled, { css } from 'styled-components'
import { colors, fontWeights, transition } from 'theme'

import { Caps } from 'components/elements'
import { withLink, withAnalytics } from 'helpers/hoc'

const activeStyle = css`
  font-weight: ${fontWeights.bold};
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`

const style = css`
  transition: color ${transition.medium};
  color: ${({ isDark }) => (isDark ? colors.white50 : colors.black50)};
  ${props => props.isActive && activeStyle};
  &:hover,
  > .active {
    ${activeStyle};
  }
`

const NavLink = styled(Caps)(
  {
    bg: 'transparent',
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 1 / 4
    }
  },
  style
)

NavLink.defaultProps = {
  pl: 3,
  fontSize: 0,
  as: 'div'
}

export default withAnalytics(withLink(NavLink))
