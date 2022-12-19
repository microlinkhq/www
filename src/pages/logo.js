import { toPx, cx, borders, layout, colors } from 'theme'
import React, { useMemo, useState } from 'react'
import isUrl from 'is-url-http/lightweight'
import { getApiUrl } from '@microlink/mql'
import humanizeUrl from 'humanize-url'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import { issueUrl } from 'helpers'
import get from 'dlv'

import {
  useClipboard,
  useFeaturesMeta,
  useHealthcheck,
  useQueryState
} from 'components/hook'

import {
  Box,
  Button,
  Caps,
  Choose,
  Container,
  Flex,
  Heading,
  Hide,
  Image,
  Input,
  InputIcon,
  Link,
  Subhead,
  Text,
  Tooltip
} from 'components/elements'

import {
  ArrowLink,
  Average,
  Block,
  Caption,
  Faq,
  Features,
  FetchProvider,
  Layout
} from 'components/patterns'

import demoLinks from '../../data/demo-links'

const SUGGESTIONS = [
  'apple',
  'mdn',
  'stackoverflow',
  'producthunt',
  'nasa'
].map(id => {
  const { url, logo } = demoLinks.find(item => item.id === id).data
  return {
    logo,
    id,
    url,
    humanizedUrl: humanizeUrl(url)
  }
})

const LOGO_SIZE = 128

const IMAGE_PREVIEW_STYLE = [
  LOGO_SIZE * 0.8,
  (LOGO_SIZE * 0.8) / 2,
  (LOGO_SIZE * 0.8) / 4
].map(width => ({ width }))

const getMs = str => str.replace(/ms|s/, '')

const getEmbedUrl = url =>
  getApiUrl(url, { palette: true, embed: 'logo.url' })[0]

const LogoBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${cx('black10')};
  height: ${toPx(LOGO_SIZE + 2)};
  width: ${toPx(LOGO_SIZE + 2)};
`

const DEFAULT_DATA = {
  url: 'https://microlink.io',
  logo: {
    url: 'https://cdn.microlink.io/logo/trim.png',
    type: 'png',
    size: 5050,
    height: 500,
    width: 500,
    size_pretty: '5.05 kB',
    palette: ['#EC427C', '#780C31', '#F286AB', '#644CA4', '#8B0D38'],
    background_color: '#EC427C',
    color: '#3D0618',
    alternative_color: '#3A0618'
  }
}

const TOOLTIP = {
  OPTIONS: {
    interactive: false,
    hideOnClick: true
  },
  COPY: {
    URL: 'Click to copy URL',
    COLOR: color => `Click to copy ${color}`,
    HTML: 'Click to copy HTML'
  },
  COPIED: {
    URL: 'Copied URL to clipboard!',
    COLOR: color => `Copied ${color} to clipboard!`,
    HTML: 'Copied HTML to clipboard!'
  }
}

const LogoPreview = ({ toClipboard, logo, style, ...props }) => {
  return (
    <LogoBox
      style={{ cursor: 'pointer' }}
      onClick={() => toClipboard({ copy: logo.url, text: TOOLTIP.COPIED.URL })}
      {...props}
    >
      <Image
        alt={`logo preview for ${Math.round(style.width)}px`}
        style={style}
        src={logo.url}
      />
    </LogoBox>
  )
}

const LogoEmpty = ({ style, ...props }) => (
  <LogoBox {...props}>
    <Box style={style} />
  </LogoBox>
)

const Preview = React.memo(function Preview ({ isLoading, toClipboard, data }) {
  const logo = data.logo || {}

  const colors = isLoading
    ? Array.from({ length: 6 }, () => '#fff')
    : [
        ...new Set(
          []
            .concat(
              logo.palette,
              logo.background_color,
              logo.color,
              logo.alternative_color
            )
            .filter(Boolean)
        )
      ]

  const LogoComponent = isLoading
    ? LogoEmpty
    : logo.url
      ? LogoPreview
      : LogoEmpty

  return (
    <>
      <Flex pb={4}>
        {IMAGE_PREVIEW_STYLE.map((imagePreviewStyle, index) => (
          <Tooltip
            key={`${data.url}_${index}`}
            tooltipsOpts={TOOLTIP.OPTIONS}
            content={<Tooltip.Content>{TOOLTIP.COPY.URL}</Tooltip.Content>}
          >
            <LogoComponent
              ml={index === 0 ? 0 : 3}
              index={index}
              toClipboard={toClipboard}
              logo={logo}
              style={imagePreviewStyle}
            />
          </Tooltip>
        ))}
      </Flex>
      <Flex justifyContent='center' alignItems='center' pb={4}>
        <Choose>
          <Choose.When condition={colors.length > 0}>
            {colors.map((color, index) => {
              return (
                <Tooltip
                  key={`${color}_${index}`}
                  tooltipsOpts={{
                    interactive: false,
                    hideOnClick: true
                  }}
                  content={
                    <Tooltip.Content>
                      {TOOLTIP.COPY.COLOR(color)}
                    </Tooltip.Content>
                  }
                >
                  <Box
                    ml={index !== 0 ? 1 : 0}
                    height={toPx(LOGO_SIZE / 3)}
                    title={color}
                    width={toPx((LOGO_SIZE * 3 * 1) / colors.length)}
                    border={1}
                    borderColor='black10'
                    style={{ cursor: 'pointer', background: color }}
                    onClick={() =>
                      toClipboard({
                        copy: color,
                        text: TOOLTIP.COPIED.COLOR(color)
                      })}
                  />
                </Tooltip>
              )
            })}
          </Choose.When>
          <Choose.Otherwise>
            <Text>
              No logo/color detected.{' '}
              <Link href={issueUrl.bug()}>Report it</Link>.
            </Text>
          </Choose.Otherwise>
        </Choose>
      </Flex>
    </>
  )
})

const LiveDemo = React.memo(function LiveDemo ({
  data,
  query,
  onSubmit,
  isLoading
}) {
  const [inputUrl, setInputUrl] = useState(query.url || '')
  const [ClipboardComponent, toClipboard] = useClipboard()

  const url = useMemo(() => {
    const input = prependHttp(inputUrl)
    return isUrl(input) ? input : DEFAULT_DATA.url
  }, [inputUrl])

  const suggestionData = useMemo(() => (data ? undefined : DEFAULT_DATA), [
    data
  ])

  const embedUrl = useMemo(() => getEmbedUrl(url), [url])

  const handleSubmit = event => {
    event.preventDefault()
    return onSubmit(url)
  }

  const snippetText = `<img src="${embedUrl}"></img>`
  const isDefault = DEFAULT_DATA.url === url
  const logoUrl = get(data, 'logo.url')

  return (
    <Container as='section' alignItems='center' pt={[2, 2, 3, 3]}>
      <Heading px={[4, 5, 5, 5]} maxWidth={layout.large}>
        Hey, oh, logos!
      </Heading>
      <Caption
        pt={[3, 3, 4, 4]}
        px={[4, 4, 4, 4]}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Get and embed logo from any web site with one simple, reliable API.
      </Caption>
      <Flex pt={[3, 3, 4, 4]}>
        <ArrowLink pr={[2, 4, 4, 4]} href='/docs/api/parameters/meta'>
          Get Started
        </ArrowLink>
        <ArrowLink href='https://github.com/microlinkhq/metascraper'>
          See on GitHub
        </ArrowLink>
      </Flex>
      <Flex justifyContent='center' alignItems='center'>
        <Flex
          as='form'
          pt={[3, 3, 4, 4]}
          pb={4}
          mx={[0, 0, 'auto', 'auto']}
          justifyContent='center'
          flexDirection={['column', 'column', 'row', 'row']}
          onSubmit={handleSubmit}
        >
          <Box mb={[3, 3, 0, 0]}>
            <Input
              fontSize={2}
              iconComponent={
                <InputIcon
                  url={isDefault ? undefined : logoUrl ? url : undefined}
                  iconUrl={logoUrl}
                  provider={isDefault ? undefined : 'microlink'}
                  embedUrl={embedUrl}
                />
              }
              id='screenshot-demo-url'
              placeholder='Site URL'
              suggestions={SUGGESTIONS.map(suggestion => ({
                value: suggestion.humanizedUrl
              }))}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              width={['100%', '100%', LOGO_SIZE * 1.5, LOGO_SIZE * 1.5]}
              autoFocus
            />
          </Box>

          <Button ml={[0, 0, 2, 2]} loading={isLoading}>
            <Caps fontSize={1}>Get it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Flex flexDirection='column' alignItems='center' pb={4}>
        <Preview
          isLoading={isLoading}
          toClipboard={toClipboard}
          data={data || suggestionData || DEFAULT_DATA}
        />
        <Box px={4} width='100%'>
          <Tooltip
            tooltipsOpts={TOOLTIP.OPTIONS}
            content={<Tooltip.Content>{TOOLTIP.COPY.HTML}</Tooltip.Content>}
          >
            <Input
              readOnly
              onClick={event => {
                event.target.select()
                toClipboard({ copy: snippetText, text: TOOLTIP.COPIED.HTML })
              }}
              width='100%'
              color='black60'
              value={snippetText}
            />
          </Tooltip>
        </Box>
      </Flex>
      <ClipboardComponent />
    </Container>
  )
})

const Timings = props => {
  const healthcheck = useHealthcheck()

  const blockOne = (
    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Subhead fontSize={[3, 4, 6, 6]} color='white'>
        Ready to use.
      </Subhead>
      <Subhead fontSize={[3, 4, 6, 6]} px={[4, 0, 0, 0]} color='white60'>
        Fast. Easy. Reliable.
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      pt={[4, 4, 5, 5]}
      justifyContent='center'
      alignItems='baseline'
      width='100%'
      maxWidth={layout.normal}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      <Flex
        display='inline-flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Subhead
          as='div'
          fontSize={[3, 4, 4, 4]}
          color='white'
          fontWeight='bold'
        >
          {getMs(healthcheck.meta.p95_pretty)}
          <Caption
            as='div'
            ml={2}
            color='white'
            display='inline'
            fontWeight='bold'
            titleize={false}
          >
            secs
          </Caption>
        </Subhead>
        <Caption as='div' color='white60' pt={2}>
          {['P95', 'response time'].map(children => (
            <Caps key={children} fontWeight='bold' fontSize={[0, 2, 2, 2]}>
              {children}
            </Caps>
          ))}
        </Caption>
      </Flex>
      <Hide breakpoints={[0, 1]}>
        <Flex
          display='inline-flex'
          px={[2, 2, 2, 5]}
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
        >
          <Subhead as='div' color='white' fontWeight='bold'>
            <Average value={healthcheck.meta.avg_pretty} />
          </Subhead>
          <Caption as='div' color='white60'>
            {['average', 'response time'].map(children => (
              <Caps key={children} fontWeight='bold' fontSize={[0, 2, 2, 2]}>
                {children}
              </Caps>
            ))}
          </Caption>
        </Flex>
      </Hide>
      <Flex
        display='inline-flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Subhead
          as='div'
          fontSize={[3, 4, 4, 4]}
          color='white'
          fontWeight='bold'
        >
          99.9
          <Caption
            as='div'
            ml={2}
            color='white'
            fontWeight='bold'
            display='inline'
          >
            %
          </Caption>
        </Subhead>
        <Caption as='div' color='white60' mr={3} pt={2}>
          {['SLA', 'Guaranteed'].map(children => (
            <Caps key={children} fontWeight='bold' fontSize={[0, 2, 2, 2]}>
              {children}
            </Caps>
          ))}
        </Caption>
      </Flex>
    </Flex>
  )

  return (
    <Block
      id='timings'
      width='100%'
      flexDirection='column'
      blockOne={blockOne}
      blockTwo={blockTwo}
      {...props}
    />
  )
}

const Resume = props => (
  <Container
    as='section'
    id='resume'
    alignItems='center'
    maxWidth={[layout.normal, layout.normal, layout.large, layout.large]}
    {...props}
  >
    <Subhead px={[3, 3, 0, 0]} variant='gradient'>
      Logo for the web <br />
      made simple
    </Subhead>
    <Caption
      pt={[3, 3, 4, 4]}
      px={[3, 3, 0, 0]}
      maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
    >
      <b>Microlink logo</b> brings logo detection from any web, including file
      extension, dimensions, size, and colors. It has been designed to be
      exceptionally affordable at scale.
    </Caption>
    <Block
      blockOne={
        <Image
          px={[4, 0, 0, 0]}
          width={['100%', 6, 7, 8]}
          alt='Palette detection'
          src='https://cdn.microlink.io/illustrations/genius-idea.svg'
        />
      }
      blockTwo={
        <Flex px={[4, 0, 0, 0]} flexDirection='column' alignItems='baseline'>
          <Subhead pt={[4, 4, 4, 0]} fontSize={[3, 3, 4, 4]}>
            Always fresh
          </Subhead>
          <Text pt={[3, 3, 4, 4]} maxWidth={8}>
            Consecutive requests will be cached on the edge, respecting{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link>. Consuming cached
            responses doesn’t affect your plan.
          </Text>
        </Flex>
      }
    />
    <Block
      flexDirection='row-reverse'
      blockTwo={
        <Flex px={[4, 0, 0, 0]} flexDirection='column' alignItems='baseline'>
          <Subhead pt={[4, 4, 4, 0]} textAlign='left' fontSize={[3, 3, 4, 4]}>
            Colors detection
          </Subhead>
          <Text pt={[3, 3, 4, 4]} maxWidth={8}>
            Enable <Link href='/docs/api/parameters/palette'>palette</Link> to
            detect dominant colors as part of the logo data properties.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          px={[4, 0, 0, 0]}
          width={['100%', 6, 7, 8]}
          alt='Colors detection'
          src='https://cdn.microlink.io/illustrations/workshop.svg'
        />
      }
    />
    <Block
      pb={Container.defaultProps.pt}
      blockOne={
        <Image
          px={[4, 0, 0, 0]}
          width={['100%', 6, 7, 8]}
          alt='Contextual information'
          src='https://cdn.microlink.io/illustrations/robots.svg'
        />
      }
      blockTwo={
        <Flex px={[4, 0, 0, 0]} flexDirection='column' alignItems='baseline'>
          <Subhead pt={[4, 4, 4, 0]} fontSize={[3, 3, 4, 4]} textAlign='left'>
            Contextual information
          </Subhead>
          <Text pt={[3, 3, 4, 4]} maxWidth={8}>
            Whenever is possible data is expanded to bring you more, like file
            extension, dimensions, size, duration, etc.
          </Text>
        </Flex>
      }
    />
  </Container>
)

const ProductInformation = props => {
  const healthcheck = useHealthcheck()

  return (
    <Faq
      as='section'
      id='information'
      title='Product Information'
      caption='All the details you need to know about the product.'
      pb={Container.defaultProps.pt}
      questions={[
        {
          question: 'What is it?',
          answer: (
            <>
              <div>
                <Text as='span' color='black' fontWeight='bold'>
                  Microlink screenshot
                </Text>{' '}
                is an easy way for taking an screenshot of any website in a
                programmatic way using{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>
                .
              </div>
            </>
          )
        },
        {
          question: 'How does it work?',
          answer: (
            <>
              <div>
                For taking a screenshot, just you have to pass{' '}
                <Link href='/docs/api/parameters/screenshot'>screenshot</Link>{' '}
                query parameter against{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>
                .
              </div>
              <div>
                The screenshot is taken running a chromium browser hosted on our
                own servers. Servers run the browser on top of optimized
                hardware to ensure the screenshot is taken fast as possible but
                also under security isolation condition, spawning a new browser
                per every new request, meaning no browsers are shared between
                requests.
              </div>
              <div>
                After that, the screenshot is uploaded into{' '}
                <Link href='/blog/edge-cdn/'>Microlink CDN</Link> and served
                across +140 edges nodes to ensure the best worldwide access
                time.
              </div>
            </>
          )
        },
        {
          question: 'Why not run my own solution?',
          answer: (
            <>
              <div>
                The service aims to avoid headaches, preventing you for running
                and maintaining your own infrastructure.
              </div>
              <div>
                Every URL on the Internet are different and browser are a
                complex piece of software, with unpredictable resources usage.
              </div>
              <div>
                The fact of resolve any URL at scale in{' '}
                <Average size='tiny' value={healthcheck.meta.avg_pretty} />{' '}
                isn’t a trivial thing.
              </div>
            </>
          )
        },
        {
          question: 'Other questions?',
          answer: (
            <>
              <div>
                We’re always available at{' '}
                <Link display='inline' href='mailto:hello@microlink.io'>
                  hello@microlink.io
                </Link>
                .
              </div>
            </>
          )
        }
      ]}
      {...props}
    />
  )
}

const LogoPage = () => {
  const [query] = useQueryState()
  const features = useFeaturesMeta()
  const hasQuery = query && !!query.url

  return (
    <Layout>
      <FetchProvider mqlOpts={{ palette: true }}>
        {({ status, doFetch, data }) => {
          const isLoading =
            (hasQuery && status === 'initial') || status === 'fetching'
          return (
            <>
              <LiveDemo
                query={query}
                onSubmit={doFetch}
                isLoading={isLoading}
                data={data}
              />
              <Timings
                pb={Container.defaultProps.pt}
                css={`
                  /* https://www.gradientmagic.com/collection/radialstripes */
                  background-image: radial-gradient(
                      circle at 69% 86%,
                      rgba(165, 165, 165, 0.06) 0%,
                      rgba(165, 165, 165, 0.06) 25%,
                      rgba(193, 193, 193, 0.06) 25%,
                      rgba(193, 193, 193, 0.06) 50%,
                      rgba(221, 221, 221, 0.06) 50%,
                      rgba(221, 221, 221, 0.06) 75%,
                      rgba(249, 249, 249, 0.06) 75%,
                      rgba(249, 249, 249, 0.06) 100%
                    ),
                    radial-gradient(
                      circle at 49% 76%,
                      rgba(129, 129, 129, 0.06) 0%,
                      rgba(129, 129, 129, 0.06) 25%,
                      rgba(164, 164, 164, 0.06) 25%,
                      rgba(164, 164, 164, 0.06) 50%,
                      rgba(200, 200, 200, 0.06) 50%,
                      rgba(200, 200, 200, 0.06) 75%,
                      rgba(235, 235, 235, 0.06) 75%,
                      rgba(235, 235, 235, 0.06) 100%
                    ),
                    radial-gradient(
                      circle at 22% 64%,
                      rgba(173, 173, 173, 0.06) 0%,
                      rgba(173, 173, 173, 0.06) 25%,
                      rgba(119, 119, 119, 0.06) 25%,
                      rgba(119, 119, 119, 0.06) 50%,
                      rgba(64, 64, 64, 0.06) 50%,
                      rgba(64, 64, 64, 0.06) 75%,
                      rgba(10, 10, 10, 0.06) 75%,
                      rgba(10, 10, 10, 0.06) 100%
                    ),
                    linear-gradient(307deg, #d306aa, #030070);
                `}
                borderTop={`${borders[1]} ${colors.white20}`}
                borderBottom={`${borders[1]} ${colors.white20}`}
              />
              <Features
                px={[4, 4, 0, 0]}
                title={
                  <>
                    <Subhead width='100%' textAlign='left'>
                      Effortless API,
                    </Subhead>
                    <Subhead
                      color='#d306aa'
                      width='100%'
                      textAlign='left'
                      titleize={false}
                    >
                      ready to be used.
                    </Subhead>
                  </>
                }
                caption={
                  <>
                    No more servers to maintain, load balancers, or paying for
                    capacity you don’t use — Microlink allows you spend more
                    time building, less time configuring, easy integration via{' '}
                    <Link href='/docs/api/getting-started/overview'>API</Link>.
                  </>
                }
                features={features}
              />
              <Resume />
              <ProductInformation
                bg='pinky'
                borderTop={`${borders[1]} ${colors.pinkest}`}
                borderBottom={`${borders[1]} ${colors.pinkest}`}
              />
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}

export default LogoPage
