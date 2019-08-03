import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Flex, Box } from 'components/elements'

const slide = keyframes`
from {
  transform: translate3d(0, 0, 0);
}
to {
  transform: translate3d(-50%, 0, 0);
}
`

const SliderContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
`

const SliderContainerWrapper = styled.div`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  animation: ${slide} ${props => props.duration}s linear infinite;
  animation-direction: ${props => props.animationDirection};
`

const SliderContainerChildren = styled.div`
  display: inline-block;
`

export const BackgroundSlider = ({
  animationDirection,
  duration,
  children
}) => (
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

export const BackgroundSliderContainer = styled(Box)`
  &:hover {
    div {
      animation-play-state: paused;
    }
  }
`

export const BackgroundSliderItem = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`

BackgroundSliderItem.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center'
}
