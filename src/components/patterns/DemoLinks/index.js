import React, { createElement } from 'react'
import styled from 'styled-components'
import {
  Flex,
  Box,
  BackgroundSlider,
  BackgroundSliderContainer
} from 'components/elements'
import { transition } from 'theme'
import { chunk } from 'lodash'

import * as Logos from 'components/logos'

const NoWrap = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`

NoWrap.defaultProps = {
  ...Flex.defaultProps,
  justifyContent: 'center',
  alignItems: 'center'
}

const LogoWrap = styled(Box)`
  cursor: pointer;
  opacity: 0.25;
  transition: opacity ${transition.short};
  &:hover {
    opacity: 0.8;
  }
`

LogoWrap.defaultProps = {
  ...Box.defaultProps,
  display: 'inline-block',
  px: 4
}

const DURATION = 60

const DemoLinks = ({ children, chunkSize, onClick }) => (
  <BackgroundSliderContainer as='article' py={0} px={0} maxWidth='100%'>
    {chunk(children, chunkSize).map((chunkBrands, chunkIndex) => {
      const isEven = chunkIndex % 2 === 0
      return (
        <BackgroundSlider
          key={chunkIndex}
          duration={isEven ? DURATION : DURATION * 1.3}
          animationDirection={isEven ? 'normal' : 'normal'}
        >
          <NoWrap>
            {chunkBrands.map(({ brand, data }, index) => (
              <LogoWrap>
                {createElement(Logos[brand], {
                  key: index,
                  ratio: 0.6,
                  onClick: () => onClick(data)
                })}
              </LogoWrap>
            ))}
          </NoWrap>
        </BackgroundSlider>
      )
    })}
  </BackgroundSliderContainer>
)

DemoLinks.defaultProps = {
  chunkSize: 10
}

export default DemoLinks
