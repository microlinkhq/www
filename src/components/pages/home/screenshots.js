import React, { useState } from 'react'
import { navigate } from 'gatsby'

import {
  Box,
  Button,
  Caps,
  Flex,
  Heading,
  Image,
  Link,
  Subhead,
  Text
} from 'components/elements'

import { Block } from 'components/patterns'

const screenshotsUrls = [
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

const Subheader = ({ title, subtitle, textAlign = 'center', children }) => (
  <Flex
    as='header'
    justifyContent='center'
    alignItems='center'
    flexDirection='column'
  >
    <Subhead
      fontSize={2}
      fontWeight='bold'
      color='secondary'
      textAlign={textAlign}
    >
      <Caps as='span' children={subtitle} />
    </Subhead>
    <Heading
      mt={1}
      mb={children && 1}
      fontWeight='bold'
      fontSize={5}
      variant={null}
      textAlign={textAlign}
      children={title}
    />
    {children}
  </Flex>
)

const Screenshots = props => {
  const [screenshotUrl, setScreenshotUrl] = useState(screenshotsUrls[0])
  const [index, setIndex] = useState(0)

  const handleClick = event => {
    event.preventDefault()
    setIndex((index + 1) % screenshotsUrls.length)
    setScreenshotUrl(screenshotsUrls[index])
  }

  const blockOne = (
    <Subheader subtitle='screenshot' title='Turn websites into a snapshot' />
  )

  const blockTwo = (
    <Flex justifyContent='center' alignItems='center' flexDirection='column'>
      <Box data-tilt pt={3}>
        <Image src={screenshotUrl} />
      </Box>
      <Text
        mt={[0, 0, 0, 3]}
        mb={[0, 0, 0, 3]}
        px={6}
        textAlign='center'
        maxWidth='960px'
      >
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
      onClick={handleClick}
      blockOne={blockOne}
      blockTwo={blockTwo}
      {...props}
    />
  )
}

export default Screenshots
