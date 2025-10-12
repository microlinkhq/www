import { colors, fontWeights, transition, theme } from 'theme'
import { withLink } from 'helpers/hoc/with-link'
import { withAnalytics } from 'helpers/hoc/with-analytics'
import styled, { css } from 'styled-components'
import Caps from 'components/elements/Caps'

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
  theme({
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
