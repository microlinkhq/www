import styled from 'styled-components'
import {colors} from '../../theme'

const BORDER_WIDTH = '2px'

export default styled.a`
  display: inline;
  text-decoration: none;
  font-weight: 600;
  border-bottom: ${BORDER_WIDTH} solid ${colors.gray2};
  color: ${colors.gray8};
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
