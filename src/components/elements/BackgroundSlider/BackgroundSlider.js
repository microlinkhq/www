import React from 'react'
import styled from 'styled-components'
import { Box } from 'components/elements'
import { slide } from 'components/keyframes'

const SliderContainer = styled('div')`
  overflow: hidden;
  white-space: nowrap;
`

const SliderContainerWrapper = styled('div')`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  animation: ${slide} ${props => props.duration}s linear infinite;
  animation-direction: ${props => props.animationDirection};
`

const SliderContainerChildren = styled('div')`
  display: inline-block;
`

const BackgroundSlider = ({ animationDirection, duration, children }) => (
  <SliderContainer>
    <SliderContainerWrapper
      animationDirection={animationDirection}
      duration={duration}
    >
      <SliderContainerChildren>{children}</SliderContainerChildren>
      <SliderContainerChildren>{children}</SliderContainerChildren>
    </SliderContainerWrapper>
  </SliderContainer>
)

BackgroundSlider.defaultProps = {
  animationDirection: 'normal'
}

const BackgroundSliderContainer = styled(Box)`
  &:hover {
    div {
      animation-play-state: paused;
    }
  }
`

export { BackgroundSlider, BackgroundSliderContainer }
