import { color, fontWeight } from 'styled-system'
import styled from 'styled-components'
import { colors } from 'theme'

const BORDER_WIDTH = '2px'

const LinkSolid = styled.a`
  ${color}
  ${fontWeight}
  display: inline;
  text-decoration: none;
  line-height: normal;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: ${BORDER_WIDTH};
    bottom: -${BORDER_WIDTH};
    left: 0;
    background-color: ${props => props.borderColor || props.color};
    opacity: 1;
  }

  &:hover {
    opacity: 0.5;
    transition: opacity 0.15s ease-in;s
  }

  &:active,
  &:hover {
    outline-width: 0;
  }
`

LinkSolid.defaultProps = {
  color: colors.primary
}

export default LinkSolid
