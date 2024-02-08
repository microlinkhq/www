import { colors, fontWeights, transition, themeCss } from 'theme'
import { withLink, withAnalytics } from 'helpers/hoc'
import styled, { css } from 'styled-components'
import { Caps } from 'components/elements'

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

const NavLink = styled(Caps).withConfig({
  shouldForwardProp: prop => !['isDark'].includes(prop)
})(
  themeCss({
    fontSize: 0,
    pl: 3,
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 1 / 4
    }
  }),
  style
)

export default withAnalytics(withLink(NavLink))
