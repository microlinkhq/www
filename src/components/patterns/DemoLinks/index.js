import React, { createElement } from 'react'
import styled from 'styled-components'
import {
  Flex,
  Box,
  BackgroundSlider,
  BackgroundSliderContainer
} from 'components/elements'
import { transition } from 'theme'
import { filter, chunk } from 'lodash'

import * as Logos from 'components/logos'

import demoLinks from '../../../../data/demo-links.json'

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

const featuredDemoLinks = filter(demoLinks, 'featured')

export default ({ onClick }) => (
  <BackgroundSliderContainer as='article' py={0} px={0} maxWidth='100%'>
    {chunk(featuredDemoLinks, 10).map((chunkBrands, chunkIndex) => {
      const isEven = chunkIndex % 2 === 0
      return (
        <BackgroundSlider
          key={chunkIndex}
          duration={isEven ? 80 : 100}
          animationDirection={isEven ? 'reverse' : 'normal'}
        >
          <NoWrap>
            {chunkBrands.map(({ brand, data }, index) => (
              <LogoWrap>
                {createElement(Logos[brand], {
                  key: index,
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
