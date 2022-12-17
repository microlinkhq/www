import { Announcement, Cursor, Caption, ArrowLink } from 'components/patterns'
import React, { useEffect, useState } from 'react'
import { fadeIn } from 'components/keyframes'
import { layout } from 'theme'

import {
  Container,
  Flex,
  Heading,
  Hide,
  Link,
  Subhead
} from 'components/elements'

const SENTENCES = [
  { href: '/meta', text: 'Normalize metadata', color: '#3e55ff' },
  { href: '/recipes', text: 'Get HTML markup', color: '#850BA7' },
  { href: '/screenshot', text: 'Take a screenshot', color: '#FD494A' },
  { href: '/insights', text: 'Identify tech stack', color: '#A31B90' },
  { href: '/pdf', text: 'Generate a PDF', color: '#e000ac' },
  { href: '/recipes', text: 'Automate scraping', color: '#DF3A61' },
  { href: '/insights', text: 'Run Lighthouse', color: '#B500ED' }
]

const SENTENCES_INTERVAL = 1500

const Hero = props => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setIndex(index => (index + 1) % SENTENCES.length),
      SENTENCES_INTERVAL
    )
    return () => clearInterval(timer)
  }, [])

  const { color, text, href } = SENTENCES[index]

  return (
    <Flex
      as='section'
      id='hero'
      px={3}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      pt={[2, 2, 3, 3]}
      {...props}
    >
      <Hide breakpoints={[0, 1, 2]}>
        <Flex
          pb={3}
          as='section'
          justifyContent='center'
          flexDirection='column'
          alignItems='center'
        >
          <Announcement
            data-event-category='Home'
            data-event-action='Announcement'
            href='/logo'
          >
            Embed logo from any web site. Introducing <b>Microlink for logo</b>
          </Announcement>
        </Flex>
      </Hide>

      <Heading fontSize={['48px', 6, 7, 7]} titleize={false}>
        Browser as API
      </Heading>
      <Hide breakpoints={[0, 1]}>
        <Cursor bg={color} text={href}>
          <Link
            href={href}
            style={{ cursor: 'inherit' }}
            linkProps={{ style: { cursor: 'inherit' } }}
          >
            <Subhead
              pt={[2, 2, 3, 3]}
              pb={[4, 4, 5, 5]}
              color='black80'
              titleize={false}
              key={text}
              css={fadeIn}
            >
              {text}
            </Subhead>
          </Link>
        </Cursor>
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <Link href={href}>
          <Subhead
            pt={[2, 2, 3, 3]}
            pb={[4, 4, 5, 5]}
            color='black80'
            titleize={false}
            key={text}
            css={fadeIn}
          >
            {text}
          </Subhead>
        </Link>
      </Hide>
      <Caption
        as='h2'
        pb={[4, 4, 5, 5]}
        px={[4, 4, 0, 0]}
        maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
      >
        Fast, scalable, and reliable browser automation built for businesses and
        developers. Proudly Open Source.
      </Caption>
      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pb={Container.defaultProps.pt}
      >
        <ArrowLink pr={[0, 4, 4, 4]} href='/recipes'>
          Start building
        </ArrowLink>
        <ArrowLink pt={[3, 0, 0, 0]} href='/docs/api/getting-started/overview'>
          Check the API
        </ArrowLink>
      </Flex>
    </Flex>
  )
}

export default Hero
