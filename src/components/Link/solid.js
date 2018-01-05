import { color, style } from 'styled-system'
import styled from 'styled-components'
import {colors} from '../../theme'

const BORDER_WIDTH = '2px'

const borderColor = style({
  prop: 'borderColor',
  cssProperty: 'borderColor'
})

const LinkSolid = styled.a`
  ${borderColor}
  ${color}
  display: inline;
  text-decoration: none;
  font-weight: 600;
  border-bottom-width: ${BORDER_WIDTH};
  border-bottom-style: solid;
  line-height: normal;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: ${BORDER_WIDTH};
    bottom: -${BORDER_WIDTH};
    left: 0;
    background-color: ${colors.gray9};
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.1s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    transform: scaleX(1);
  }

  &:active,
  &:hover {
    outline-width: 0;
  }
`

LinkSolid.defaultProps = {
  color: colors.gray8,
  borderColor: colors.gray2
}

export default LinkSolid
