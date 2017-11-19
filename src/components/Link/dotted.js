import styled from 'styled-components'
import {colors} from '../../theme'

export default styled.a`
  color: ${colors.white};
  text-decoration: none;
  border-bottom: dashed 2px ${colors.white};
  opacity: 1;
  transition: opacity 0.15s ease-in;

  &:hover {
    opacity: 0.5;
    transition: opacity 0.15s ease-in;
  }
`
