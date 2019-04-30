import styled, { css } from 'styled-components'
import { transition } from 'theme'

import { Text } from 'components/elements'
import { withLink } from 'helpers/hoc'

const activeStyle = css`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
`

const style = css`
  transition: color ${transition.medium};

  &:hover,
  > .active * {
    ${activeStyle};
  }
`

const NavLink = styled(Text)(
  {
    bg: 'transparent',
    color: 'inherit',
    display: 'block',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 1 / 4
    }
  },
  props => props.css,
  style
)

NavLink.defaultProps = {
  ...Text.defaultProps,
  fontSize: 0,
  as: 'div',
  color: 'gray7'
}

NavLink.propTypes = {
  ...Text.propTypes
}

export default withLink(NavLink)
