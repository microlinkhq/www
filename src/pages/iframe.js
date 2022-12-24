import {
  Placeholder,
  Subhead,
  Box,
  Flex,
  Container,
  Text,
  Link,
  MultiCodeEditor
} from 'components/elements'

import { Grid, Caption, Layout } from 'components/patterns'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import mql from '@microlink/mql'
import { layout } from 'theme'

const DEMO_URL = 'https://www.youtube.com/watch?v=Gu8X7vM3Avw'

const SCALE_FACTOR = 0.85
const IFRAME_WIDTH = 560 * SCALE_FACTOR
const IFRAME_HEIGHT = 315 * SCALE_FACTOR

const IframeWrapper = styled(Box)`
  iframe {
    width: ${IFRAME_WIDTH}px;
    height: ${IFRAME_HEIGHT}px;
    max-width: 100%;
    max-height: calc((100vw - 40px) / (16 / 9));
  }
`

const react = () => `
import React, { useState, useEffect } from 'react'
import mql from '@microlink/mql'

export default ({ url }) => {
  const [iframe, setIframe] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const { data } = await mql(url, {
        meta: false,
        iframe: true
      })
      setIframe(data.iframe)
    }
    fetchData()
  }, [])

  return(
    iframe
      ? <div dangerouslySetInnerHTML={{ __html: iframe }}/>
      : 'Loading...'
  )
}
`

const javascript = () => `
const mql = require('@microlink/mql')

const { data } = await mql('${DEMO_URL}', {
  meta: false,
  iframe: true
})

return data
`

const shell = () =>
  `$ curl -sL https://api.microlink.io?url=${DEMO_URL}&meta=false&iframe`

const languages = { Shell: shell, 'Node.js': javascript, React: react }

const Embed = ({ title, description, url }) => {
  const [iframe, setIframe] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const { data } = await mql(url, {
        meta: false,
        iframe: true
      })
      setIframe(data.iframe)
    }
    fetchData()
  }, [url])

  if (!iframe) {
    return (
      <Box mb={4} px={[3, 4]}>
        <Placeholder width={IFRAME_WIDTH} height={IFRAME_HEIGHT} />
      </Box>
    )
  }

  return (
    <Box as='section' mb={4} px={[3, 4]}>
      <Box as='header' ml={2} mb={2}>
        <Subhead as='span' fontSize={[1, 2]}>
          {title}
        </Subhead>
        <Text as='span' ml={2} color='gray' fontSize={[0, 1]}>
          {description}
        </Text>
      </Box>
      <IframeWrapper dangerouslySetInnerHTML={{ __html: iframe }} />
    </Box>
  )
}

const links = [
  {
    title: 'YouTube',
    description: 'video',
    url: 'https://youtu.be/Gu8X7vM3Avw'
  },
  {
    title: 'YouTube',
    description: 'playlist',
    url:
      'https://www.youtube.com/watch?v=-TWztwbOpog&list=PL5aqr5w5fRe4nO30px44D5sBukIUw1UwX'
  },
  { title: 'Vimeo', description: 'video', url: 'https://vimeo.com/135373919' },
  {
    title: 'Spotify',
    description: 'song',
    url:
      'https://open.spotify.com/track/63W11KVHDOpSlh3XMQ7qMg?si=Yd-hIkD9TtSUeFeR0jzKsA'
  },
  {
    title: 'Spotify',
    description: 'playlist',
    url:
      'https://open.spotify.com/playlist/1xY6msLHX1W34EzB0UkkbU?si=cFF7LjzgQxWz5ni6TCN_jA'
  },
  {
    title: 'Instagram',
    description: 'photo',
    url: 'https://www.instagram.com/farid_rueda/p/Bx-0nVPCe2c/'
  },
  {
    title: 'Instagram',
    description: 'video',
    url: 'https://www.instagram.com/p/BeV6tOhFUor/'
  },
  {
    title: 'Twitter',
    description: 'video',
    url: 'https://twitter.com/tribandtweets/status/1133308311917481984'
  },
  {
    title: 'Twitter',
    description: 'status',
    url: 'https://twitter.com/NetflixDE/status/1133310428476530688'
  },
  {
    title: 'Twitter',
    description: 'photo',
    url: 'https://twitter.com/officialmcafee/status/1133280322039291905'
  },
  {
    title: 'TED',
    description: 'video',
    url:
      'https://www.ted.com/talks/monique_w_morris_why_black_girls_are_targeted_for_punishment_at_school_and_how_to_change_that?utm_campaign=tedspread&utm_medium=referral&utm_source=tedcomshare'
  },
  {
    title: 'Facebook',
    description: 'video',
    url: 'https://www.facebook.com/watch/?v=364684367488603'
  },
  {
    title: 'Facebook',
    description: 'photo',
    url:
      'https://www.facebook.com/alternate.de/photos/a.391014166661/10156375231596662/?type=3&theater'
  },
  {
    title: 'SoundCloud',
    description: 'song',
    url: 'https://soundcloud.com/beautybrainsp/beauty-brain-swag-bandicoot'
  },
  {
    title: 'Twitch',
    description: 'clip',
    url:
      'https://www.twitch.tv/lvpes/clip/TsundereJoyousPheasantMikeHogu?filter=all&sort=time'
  },
  {
    title: 'CodePen',
    description: 'snippet',
    url: 'https://codepen.io/hbagency/pen/eKyObz'
  },
  {
    title: 'CodeSandbox',
    description: 'sandbox',
    url: 'https://codesandbox.io/s/gracious-blackburn-n5w839zm4m'
  },
  {
    title: 'Dailymotion',
    description: 'video',
    url: 'https://www.dailymotion.com/video/x7ntzjb?playlist=x5v2j4'
  },
  {
    title: 'DeviantArt',
    description: 'publication',
    url: 'https://www.deviantart.com/glitchyxenon/art/Daft-Punk-f2u-663024393'
  },
  {
    title: 'Flickr',
    description: 'photo',
    url:
      'https://www.flickr.com/photos/fotodudenz/184588922/in/faves-49014237@N00/'
  },
  {
    title: 'gfycat',
    description: 'gif',
    url: 'https://gfycat.com/timelyhealthyarmadillo'
  },
  {
    title: 'GIPHY',
    description: 'gif',
    url:
      'https://giphy.com/gifs/sonicmovie-sonic-the-hedgehog-VFMu7SKAsaPFEkab2f'
  },
  {
    title: 'Gyazo',
    description: 'gif',
    url: 'https://gyazo.com/41a363bc94d18a49eb762b719075530d'
  },
  {
    title: 'Stremeable',
    description: 'gif',
    url: 'https://streamable.com/46ont'
  },
  {
    title: 'iFixit',
    description: 'publication',
    url:
      'https://www.ifixit.com/Teardown/Microsoft+Surface+Pro+X+Teardown/127703'
  },
  {
    title: 'IFTTT',
    description: 'recipe',
    url:
      'https://ifttt.com/applets/UHcg5jkZ-quickly-email-yourself-a-note?term=email'
  },
  {
    title: 'Kickstarter',
    description: 'project',
    url:
      'https://www.kickstarter.com/projects/raine-scooters/the-raine-one-electric-scooter?ref=section-homepage-projectcollection-10-staff-picks-newest'
  },
  {
    title: 'Kit',
    description: 'publication',
    url: 'https://kit.com/MKBHD/my-setup'
  },
  {
    title: 'Meetup',
    description: 'publication',
    url: 'https://www.meetup.com/amurbit-Murcia-Bitcoin-blockchain/'
  },
  {
    title: 'Mixcloud',
    description: 'song',
    url:
      'https://www.mixcloud.com/quietmusic/quietmusic-november-10-hour-3-excerpt/'
  },
  {
    title: 'Overflow',
    description: 'publication',
    url: 'https://overflow.io/s/9ST7SX/'
  },
  {
    title: 'Reddit',
    description: 'publication',
    url:
      'https://www.reddit.com/r/outrun/comments/dvan65/an_outrun_style_christmas_sweater_design_i_made/'
  },
  {
    title: 'SlideShare',
    description: 'slides',
    url:
      'https://www.slideshare.net/fusion2011/github-githubgithub?qid=7d621cf6-9573-40ea-8d29-e4332db545fd&v=&b=&from_search=1'
  },
  {
    title: 'Speaker Deck',
    description: 'slides',
    url: 'https://speakerdeck.com/holman/how-github-no-longer-works'
  },
  {
    title: 'NY Times',
    description: 'news',
    url:
      'https://www.nytimes.com/interactive/2019/11/12/arts/television/disney-plus-shows-movies.html?action=click&module=Editors%20Picks&pgtype=Homepage'
  }
]

const IframePage = () => {
  return (
    <Layout head={{ title: 'Embed makes easy' }}>
      <Container py={[4, 4, 5, 5]} px={4} maxWidth={layout.large}>
        <Caption>Turn links into embeddable media</Caption>
        <Subhead px={4} pt={4} pb={3} textAlign='left' fontSize={3}>
          How it works
        </Subhead>
        <Text px={4} ml={3}>
          Given a URL (Twitter, Instagram, Facebook, YouTube, Spotify, etc),
          Microlink API retrieves you the snippet code necessary for embedding
          the representation of the URL in your site.
        </Text>
        <Text pt={3} px={4} ml={3}>
          Any site that follows{' '}
          <Link href='https://oembed.com' icon>
            oembed
          </Link>{' '}
          specification is supported. See the full list of compatible{' '}
          <Link href='https://oembed.com/providers.json' icon>
            providers
          </Link>{' '}
          .
        </Text>
        <Subhead px={4} pt={4} pb={3} textAlign='left' fontSize={3}>
          How to use
        </Subhead>
        <Text px={4} ml={3}>
          Just attach `iframe` query parameter when you interact with{' '}
          <Link href='/docs/api/getting-started/overview'>Microlink API</Link>
        </Text>
        <Box pt={3} px={6}>
          <MultiCodeEditor languages={languages} />
        </Box>
        <Subhead px={4} pt={4} pb={3} textAlign='left' fontSize={3}>
          Demo
        </Subhead>
        <Flex px={3} alignItems='center' justifyContent='center'>
          <Grid childComponent={Embed} itemsPerRow={1} justifyContent='center'>
            {links}
          </Grid>
        </Flex>
      </Container>
    </Layout>
  )
}

export default IframePage
