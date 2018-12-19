import styled, { css } from 'styled-components'
import { fontWeights, transition, colors } from 'theme'

import Text from './Text'
import withLink from './Link/with-link'

const activeStyle = css`
  font-weight: ${fontWeights.bold};
  color: ${colors.gray9};
`

const style = css`
  transition: color ${transition.medium};

  &:hover {
    ${activeStyle};
  }

  > .active {
    ${activeStyle};
  }
`

const NavLink = styled(Text)(
  {
    bg: 'transparent',
    textTransform: 'uppercase',
    color: 'inherit',
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
  props => props.css,
  style
)

NavLink.defaultProps = {
  ...Text.defaultProps,
  p: 2,
  fontSize: 0,
  as: 'div',
  color: 'gray7'
}

NavLink.propTypes = {
  ...Text.propTypes
}

export default withLink(NavLink)
