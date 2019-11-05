import React, { createElement } from 'react'
import styled from 'styled-components'
import {
  Flex,
  Box,
  BackgroundSlider,
  BackgroundSliderContainer
} from 'components/elements'
import { transition } from 'theme'
import chunk from 'lodash/chunk'

import * as Logos from 'components/logos'

const NoWrap = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`

NoWrap.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center'
}

const LogoWrap = styled(Box)`
  opacity: 0.25;
  transition: opacity ${transition.short};
  &:hover {
    opacity: 0.8;
  }
`

LogoWrap.defaultProps = {
  display: 'inline-block',
  px: 4
}

const brands = [
  'Amazon',
  'Apple',
  'Ars',
  'BuzzFeed',
  'Engadget',
  'Etsy',
  'EventBrite',
  'Facebook',
  'Flickr',
  'Gfycat',
  'GitHub',
  'Gizmodo',
  'Instagram',
  'LifeHacker',
  'Medium',
  'Nasa',
  'Netflix',
  'NYTimes',
  'ProductHunt',
  'Reddit',
  'SoundCloud',
  'TheGuardian',
  'TheVerge',
  'TheWashingtonPost',
  'Twitch',
  'Twitter',
  'Vice',
  'Vimeo',
  'Wikipedia',
  'YouTube'
]

const LogoSlider = props => (
  <BackgroundSliderContainer as='article' py={0} px={0} maxWidth='100%'>
    {chunk(brands, 10).map((chunkBrands, chunkIndex) => {
      const isEven = chunkIndex % 2 === 0
      return (
        <BackgroundSlider
          key={chunkIndex}
          duration={isEven ? 80 : 100}
          animationDirection={isEven ? 'reverse' : 'normal'}
        >
          <NoWrap>
            {chunkBrands.map((brand, index) => (
              <LogoWrap key={brand}>{createElement(Logos[brand])}</LogoWrap>
            ))}
          </NoWrap>
        </BackgroundSlider>
      )
    })}
  </BackgroundSliderContainer>
)

export default LogoSlider
