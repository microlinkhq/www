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
  cursor: pointer;
  opacity: 0.25;
  transition: opacity ${transition.medium};
  &:hover {
    opacity: 0.8;
  }
`

LogoWrap.defaultProps = {
  display: 'inline-block',
  px: 4
}

const DURATION = 60

const LogoNames = Object.keys(Logos)

const DemoLinks = ({ children, chunkSize, onClick }) => {
  // remove missing logos
  const links = children.filter(({ brand }) => {
    const hasLogo = LogoNames.includes(brand)
    if (!hasLogo) console.warn(`DemoLinks: missing ${brand} logo`)
    return hasLogo
  })

  return (
    <BackgroundSliderContainer as='article' py={0} px={0} maxWidth='100%'>
      {chunk(links, chunkSize).map((chunkBrands, chunkIndex) => {
        const isEven = chunkIndex % 2 === 0
        return (
          <BackgroundSlider
            key={chunkIndex}
            duration={isEven ? DURATION : DURATION * 1.3}
            animationDirection={isEven ? 'normal' : 'normal'}
          >
            <NoWrap>
              {chunkBrands.map(({ brand, data }, index) => (
                <LogoWrap key={brand}>
                  {createElement(Logos[brand], {
                    key: brand,
                    ratio: 0.6,
                    onClick: () => onClick({ brand, data })
                  })}
                </LogoWrap>
              ))}
            </NoWrap>
          </BackgroundSlider>
        )
      })}
    </BackgroundSliderContainer>
  )
}

DemoLinks.defaultProps = {
  chunkSize: 10
}

export default DemoLinks
