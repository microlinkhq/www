import React, { useCallback, useState } from 'react'
import { navigate } from 'gatsby'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'
import { aspectRatio } from 'helpers'
import { speed, toPx } from 'theme'

import { Box, Button, Caps, Flex, Image, Link, Text } from 'components/elements'
import { Block, Legend } from 'components/patterns'

export const screenshotsUrls = [
  { theme: 'dark', brand: 'Apple' },
  { theme: 'light', brand: 'MDN' },
  { theme: 'light', brand: 'StackOverflow' },
  { theme: 'light', brand: 'ProductHunt' },
  { theme: 'dark', brand: 'Nasa' }
].map(item => {
  const id = item.brand.toLowerCase()
  const filename = `${id}.png`
  return `https://cdn.microlink.io/website/browser/${item.theme}/${filename}`
})

const CustomImage = styled(Image)`
  position: absolute;
  top: 0px;
  left: 0px;
  will-change: opacity;
`

export const AnimatedImage = animated(CustomImage)

export const screenshotHeight = (() => {
  const width = 960
  const ratio = 1.453403141
  const height = width / ratio
  return aspectRatio.ratios.map(n => toPx(height * n))
})()

const Screenshots = props => {
  const [index, setIndex] = useState(0)
  const onClick = useCallback(
    () => setIndex(state => (state + 1) % screenshotsUrls.length),
    []
  )

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: speed.quickly
    }
  })

  const blockOne = (
    <Legend sup='screenshot' title='Turn websites into a snapshot' />
  )

  const blockTwo = (
    <Flex justifyContent='center' alignItems='center' flexDirection='column'>
      <Box data-tilt pt={3}>
        <Flex
          height={screenshotHeight}
          width={aspectRatio.width}
          style={{ position: 'relative' }}
        >
          {transitions.map(({ item, props, key }) => {
            return (
              <AnimatedImage
                key={key}
                style={props}
                src={screenshotsUrls[item]}
              />
            )
          })}
        </Flex>
      </Box>
      <Text mb={[0, 0, 0, 3]} px={6} textAlign='center' maxWidth='960px'>
        Take a retina display screenshot of any URL. Export them to PNG or JPEG.
        Automatic CDN redistribution. Overlay composition using a browser framer
        & background. Just in time stale refresh, keeping them up to date.
      </Text>
      <Flex pt={3} alignItems='center' justifyContent='center'>
        <Button onClick={() => navigate('/screenshot')}>
          <Caps fontSize={0}>Live Demo</Caps>
        </Button>
        <Link
          onClick={() => navigate('/docs/api/parameters/screenshot')}
          ml={3}
        >
          Read Docs
        </Link>
      </Flex>
    </Flex>
  )

  return (
    <Block
      id='screenshot'
      flexDirection='column'
      onClick={onClick}
      blockOne={blockOne}
      blockTwo={blockTwo}
      {...props}
    />
  )
}

export default Screenshots
