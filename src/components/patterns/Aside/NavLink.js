import styled, { css } from 'styled-components'
import { Text } from 'components/elements'
import { withAnalytics, withLink } from 'helpers/hoc'

export const style = css`
  transition: color ${({ theme }) => theme.transition.medium};
`

export const activeStyle = css`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
`

const navlinkStyle = css`
  ${style}
  .active * {
    ${activeStyle};
  }
`

const NavLink = styled(Text)(
  {
    background: 'transparent',
    color: 'inherit',
    display: 'block',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 1 / 4
    }
  },
  navlinkStyle
)

export default withAnalytics(withLink(NavLink))
