import {
  ImagePlaceholder,
  Subhead,
  Box,
  Flex,
  Container,
  Text
} from 'components/elements'
import { Header, Layout } from 'components/patterns'
import mql from '@microlink/mql'
import React, { useState, useEffect } from 'react'

const TITLE = 'Embed makes easy'

const Embed = ({ title, description, url }) => {
  const [iframe, setIframe] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const { data } = await mql(url, { endpoint: 'http://localhost:3000' })
      setIframe(data.iframe)
    }
    fetchData()
  }, [])

  if (!iframe) return <ImagePlaceholder mb={5} width='560px' height='315px' />

  return (
    <Box as='section' mb={5}>
      <Box as='header' ml={2} mb={2}>
        <Subhead as='span' fontSize={[1, 2]}>
          {title}
        </Subhead>
        <Text as='span' ml={2} color='gray' fontSize={[0, 1]}>
          {description}
        </Text>
      </Box>
      <Box dangerouslySetInnerHTML={{ __html: iframe }} />
    </Box>
  )
}

export default () => {
  return (
    <Layout title={TITLE}>
      <Container py={[4, 5]} px={4}>
        <Header subtitle={TITLE} caption='Turn links into embeddable media' />
        <Flex
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
        >
          <Embed
            title='YouTube'
            description='video'
            url='https://youtu.be/Gu8X7vM3Avw'
          />
          <Embed
            title='YouTube'
            description='playlist'
            url='https://www.youtube.com/watch?v=-TWztwbOpog&list=PL5aqr5w5fRe4nO30px44D5sBukIUw1UwX'
          />
          <Embed
            title='vimeo'
            description='video'
            url='https://vimeo.com/135373919'
          />
          <Embed
            title='Spotify'
            description='song'
            url='https://open.spotify.com/track/63W11KVHDOpSlh3XMQ7qMg?si=Yd-hIkD9TtSUeFeR0jzKsA'
          />
          <Embed
            title='Spotify'
            description='playlist'
            url='https://open.spotify.com/playlist/1xY6msLHX1W34EzB0UkkbU?si=cFF7LjzgQxWz5ni6TCN_jA'
          />
        </Flex>
      </Container>
    </Layout>
  )
}
