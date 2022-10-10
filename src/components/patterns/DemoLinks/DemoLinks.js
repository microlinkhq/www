import {
  Flex,
  Box,
  BackgroundSlider,
  BackgroundSliderContainer
} from 'components/elements'

import React, { createElement } from 'react'
import { LogoBrand } from 'components/logos'
import styled from 'styled-components'
import { transition } from 'theme'
import chunk from 'lodash/chunk'

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

const logoIds = Object.keys(LogoBrand)

const DemoLinks = ({ children, chunkSize, onClick }) => {
  // remove missing logos
  const links = children.filter(({ id }) => {
    const hasLogo = logoIds.includes(id)
    if (!hasLogo) console.warn(`DemoLinks: missing ${id} logo`)
    return hasLogo
  })

  return (
    <BackgroundSliderContainer as='section' py={0} px={0} maxWidth='100%'>
      {chunk(links, chunkSize).map((chunkBrands, chunkIndex) => {
        const isEven = chunkIndex % 2 === 0
        return (
          <BackgroundSlider
            key={chunkIndex}
            duration={isEven ? DURATION : DURATION * 1.3}
            animationDirection={isEven ? 'normal' : 'normal'}
          >
            <NoWrap>
              {chunkBrands.map(({ id, data }) => (
                <LogoWrap key={id}>
                  {createElement(LogoBrand[id], {
                    key: id,
                    ratio: 0.6,
                    onClick: () => onClick({ id, data })
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
