import { colors, transition, lineHeights } from 'theme'
import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'

import Text from '../Text'

const style = css`
  cursor: pointer;
  text-decoration: none;
  outline: 0;
  transition: color ${transition.medium};
  line-height: ${lineHeights[2]};
`

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    color: ${colors.hoverLink};
  `
})

const Link = styled(Text)`
  ${style};
  ${hoverStyle};
`

Link.defaultProps = {
  as: 'span',
  fontSize: 'inherit',
  color: 'link'
}

export default Link
