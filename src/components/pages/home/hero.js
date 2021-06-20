import { Link, Flex, Subhead, Container, Heading } from 'components/elements'
import { Caption, ArrowLink } from 'components/patterns'
import React, { useEffect, useState } from 'react'
import { fadeIn } from 'components/keyframes'
import { layout } from 'theme'

const SENTENCES = [
  { href: '/recipes/get-html', text: 'Get HTML markup', color: '#850BA7' },
  { href: '/screenshot', text: 'Take a screenshot', color: '#FD494A' },
  { href: '/pdf', text: 'Generate a PDF', color: '#e000ac' },
  { href: '/meta', text: 'Normalize metadata', color: '#3e55ff' },
  { href: '/insights', text: 'Run Lighthouse', color: '#B500ED' },
  { href: '/insights', text: 'Identify tech stack', color: '#A31B90' },
  { href: '/recipes', text: 'Automate scrapping', color: '#DF3A61' }
]

const SENTENCES_INTERVAL = 3500

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

  const cursor = `url("data:image/svg+xml,%3Csvg shape-rendering='geometricPrecision' xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none'%3E%3Cg filter='url(%23filter0_d)'%3E%3Cpath fill='%23${color.slice(
    1
  )}' d='M9.63 6.9a1 1 0 011.27-1.27l11.25 3.75a1 1 0 010 1.9l-4.68 1.56a1 1 0 00-.63.63l-1.56 4.68a1 1 0 01-1.9 0L9.63 6.9z'/%3E%3Cpath stroke='%23fff' stroke-width='1.5' d='M11.13 4.92a1.75 1.75 0 00-2.2 2.21l3.74 11.26a1.75 1.75 0 003.32 0l1.56-4.68a.25.25 0 01.16-.16L22.4 12a1.75 1.75 0 000-3.32L11.13 4.92z'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d' width='32.26' height='32.26' x='.08' y='.08' filterUnits='userSpaceOnUse'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset dy='4'/%3E%3CfeGaussianBlur stdDeviation='4'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0'/%3E%3CfeBlend in2='BackgroundImageFix' mode='normal' result='effect1_dropShadow'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow' mode='normal' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E") 6 2, default`

  return (
    <Flex
      data-debug
      px={3}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      style={{ cursor }}
      {...props}
    >
      <Heading fontSize={['48px', 6, 7, 7]} titleize={false}>
        Browser as API
      </Heading>
      <Link pt={[2, 2, 3, 3]} href={href} linkProps={{ title: text }}>
        <Subhead color='black80' titleize={false} key={text} css={fadeIn}>
          {text}
        </Subhead>
      </Link>
      <Caption
        py={[4, 4, 5, 5]}
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
