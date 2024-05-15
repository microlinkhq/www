import { Microlink } from 'components/logos'
import { storiesOf } from '@storybook/react'
import { theme, transition } from 'theme'
import styled from 'styled-components'
import range from 'lodash/range'
import { Story } from 'story'
import React from 'react'

import {
  Flex,
  Box,
  BackgroundSlider,
  BackgroundSliderContainer
} from 'components/elements'

const NoWrap = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`

NoWrap.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center'
}

const LogoWrap = styled(Box)`
  cursor: pointer;
  opacity: 0.25;
  transition: opacity ${transition.medium};
  &:hover {
    opacity: 0.8;
  }
  ${theme({ px: 4, display: 'inline-block' })}
`

const code = `
import {
  BackgroundSliderContainer,
  BackgroundSlider,
} from 'components/elements'

export default () => (
  <BackgroundSliderContainer>
    <BackgroundSlider duration={80} animationDirection='reverse'>
      <Microlink />
    </BackgroundSlider>
    <BackgroundSlider duration={80} animationDirection='normal'>
      <Microlink />
    </BackgroundSlider>
    <BackgroundSlider duration={80} animationDirection='reverse'>
      <Microlink />
    </BackgroundSlider>
  </BackgroundSliderContainer>
)`

storiesOf('Elements', module).add('BackgroundSlider', () => (
  <Story name='BackgroundSlider' code={code}>
    <BackgroundSliderContainer css={theme({ p: 0, maxWidth: '100%' })}>
      <BackgroundSlider duration={80} animationDirection='reverse'>
        {range(30).map(index => (
          <LogoWrap key={index}>
            <Microlink />
          </LogoWrap>
        ))}
      </BackgroundSlider>
      <BackgroundSlider duration={80} animationDirection='normal'>
        {range(30).map(index => (
          <LogoWrap key={index}>
            <Microlink />
          </LogoWrap>
        ))}
      </BackgroundSlider>
      <BackgroundSlider duration={80} animationDirection='reverse'>
        {range(30).map(index => (
          <LogoWrap key={index}>
            <Microlink />
          </LogoWrap>
        ))}
      </BackgroundSlider>
    </BackgroundSliderContainer>
  </Story>
))
