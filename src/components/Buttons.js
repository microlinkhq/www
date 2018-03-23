import {
  borders,
  fontWeight,
  display,
  width,
  responsiveStyle
} from 'styled-system'
import { Button, ButtonOutline as Outline } from 'rebass'
import styled, { css } from 'styled-components'
import { colors } from 'theme'

const height = responsiveStyle({
  prop: 'height',
  cssProperty: 'height'
})

const buttonStyle = css`
  ${display} ${width} ${height} ${fontWeight} ${borders} cursor: pointer;
`

const PrimaryButton = styled(Button)`
  ${buttonStyle} box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }
`

PrimaryButton.defaultProps = {
  bg: 'primary',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: 3
}

const OutlineButton = styled(Outline)`
  ${buttonStyle} transition: color, background-color .15s;

  &:hover {
    color: ${props => colors[props.bg]};
    background-color: ${props => colors[props.color]};
  }
`

OutlineButton.defaultProps = {
  bg: 'white',
  color: 'primary',
  borderRadius: 2
}

export default {
  PrimaryButton,
  OutlineButton
}
