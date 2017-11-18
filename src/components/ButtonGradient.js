import React from 'react'
import styled from 'styled-components'
import {ButtonOutline} from 'rebass'

const GradientButton = ButtonOutline.extend`
  box-shadow: none;
  border-left: 3px solid #c02e74;
  border-right: 3px solid #449bf8;
  background-image:
    -webkit-linear-gradient(left, #c02e74, #449bf8),
    -webkit-linear-gradient(left, #c02e74, #449bf8);

  background-size: 100% 3px;
  background-position: 0 100%, 0 0;
  background-repeat: no-repeat;
  background-clip: border-box;

  &:hover {
    background-color: transparent;
    box-shadow: none;
  }
`

const GradientSpan = styled.span`
  font-weight: bold;
  background: linear-gradient(to right, #c02e74, #449bf8);
  -webkit-background-clip: text;
  text-fill-color: transparent;
`

export default props => (
  <GradientButton {...props}>
    <GradientSpan>Buy</GradientSpan>
  </GradientButton>
)
