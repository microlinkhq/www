import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { Hide, Box, Button, Caps, Flex, Link, Text } from 'components/elements'
import { Legend, LiveDemo, Block } from 'components/patterns'
import { layout } from 'theme'
import get from 'dlv'

const Meta = ({ demoLinks, ...props }) => {
  const demoLinkTest = ({ id }) => id === 'twitter'
  const demoLinkIndex = demoLinks.findIndex(demoLinkTest)

  const links = demoLinks.filter(
    demoLink =>
      !demoLinkTest(demoLink) &&
      (!!get(demoLink, 'data.video') || !!get(demoLink, 'data.audio'))
  )
  const [link, setLink] = useState(demoLinks[demoLinkIndex].data)
  const [index, setIndex] = useState(0)

  const handleClick = event => {
    if (event.target.tagName !== 'SELECT' && event.target.tagName !== 'SPAN') {
      setIndex((index + 1) % links.length)
      setLink(links[index].data)
    }
  }

  const blockOne = (
    <Flex justifyContent='center' alignItems='center' flexDirection='column'>
      <Legend sup='meta' title='Turn websites into rich media' />
    </Flex>
  )

  const blockTwo = (
    <Flex justifyContent='center' alignItems='center' flexDirection='column'>
      <Box data-tilt pt={4} pb={[0, 0, 3, 3]}>
        <LiveDemo children={link} />
      </Box>
      <Text
        mt={[0, 0, 0, 3]}
        mb={[0, 0, 0, 3]}
        px={[5, 6, 6, 6]}
        textAlign='center'
        maxWidth={layout.medium}
      >
        <Hide breakpoints={[1, 2, 3]}>
          Engage your content with enriched media. Convert your links into
          beautiful previews.
        </Hide>
        <Hide breakpoints={[0]}>
          Engage your content with enriched media. Convert your links into
          beautiful previews. Make your content attractive to consume. Add it to
          an existing website or app. Auto media detection (image, video,
          audio). Native embeds supported. Easily customizable.
        </Hide>
      </Text>
      <Flex pt={3} alignItems='center' justifyContent='center'>
        <Button onClick={() => navigate('/embed')}>
          <Caps fontSize={0}>Live Demo</Caps>
        </Button>
        <Link
          onClick={() => navigate('/docs/sdk/getting-started/overview/')}
          ml={3}
        >
          <Caps fontWeight='regular' fontSize={0} children='See docs' />
        </Link>
      </Flex>
    </Flex>
  )

  return (
    <Block
      id='meta'
      flexDirection='column'
      onClick={handleClick}
      blockOne={blockOne}
      blockTwo={blockTwo}
      {...props}
    />
  )
}

export default Meta
