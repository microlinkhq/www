import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import {
  Flex,
  Box,
  BackgroundSlider,
  BackgroundSliderContainer
} from 'components/elements'
import { transition } from 'theme'

import {
  Amazon,
  Apple,
  Ars,
  BBC,
  BuzzFeed,
  Change,
  CNN,
  Engadget,
  Etsy,
  EventBrite,
  Facebook,
  Flickr,
  Fox,
  Gfycat,
  GitHub,
  Gizmodo,
  Instagram,
  LifeHacker,
  MDN,
  Medium,
  Nasa,
  Netflix,
  NYTimes,
  ProductHunt,
  Reddit,
  SoundCloud,
  StackOverflow,
  TechCrunch,
  TED,
  TheGuardian,
  TheVerge,
  TheWashingtonPost,
  Time,
  TNW,
  Twitch,
  Twitter,
  Vice,
  Vimeo,
  Wikipedia,
  YouTube
} from 'components/logos'

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

storiesOf('Components', module).add('BackgroundSlider', () => (
  <BackgroundSliderContainer as='article' py={0} px={0} maxWidth='100%'>
    <BackgroundSlider duration={80}>
      <NoWrap>
        <LogoWrap>
          <Amazon />
        </LogoWrap>
        <LogoWrap>
          <Apple />
        </LogoWrap>
        <LogoWrap>
          <Ars />
        </LogoWrap>
        <LogoWrap>
          <BBC />
        </LogoWrap>
        <LogoWrap>
          <BuzzFeed />
        </LogoWrap>
        <LogoWrap>
          <Change />
        </LogoWrap>
        <LogoWrap>
          <CNN />
        </LogoWrap>
        <LogoWrap>
          <Engadget />
        </LogoWrap>
        <LogoWrap>
          <Etsy />
        </LogoWrap>
        <LogoWrap>
          <EventBrite />
        </LogoWrap>
      </NoWrap>
    </BackgroundSlider>
    <Box mb={4} />
    <BackgroundSlider duration={100} animationDirection='reverse'>
      <NoWrap>
        <LogoWrap>
          <BBC />
        </LogoWrap>
        <LogoWrap>
          <Amazon />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
        <LogoWrap>
          <Twitch />
        </LogoWrap>
      </NoWrap>
    </BackgroundSlider>
  </BackgroundSliderContainer>
))
