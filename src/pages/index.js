import { useDemoLinks, usePrinciples, useSiteMetadata } from 'components/hook'

import React, { useState } from 'react'
import { navigate } from 'gatsby'

import {
  Box,
  Button,
  Caps,
  Container as ContainerBase,
  Flex,
  Heading,
  Image,
  Hide,
  Link,
  Subhead,
  Text
} from 'components/elements'

import {
  Banner,
  Grid,
  Header,
  Layout,
  LiveDemo,
  MQLEditor,
  PricingTable,
  List
} from 'components/patterns'

import { borders, colors } from 'theme'
import { aspectRatio } from 'helpers'
import get from 'dlv'

const Questions = () => {
  const title = 'Questions'
  const caption = 'Frequently asked questions.'

  return (
    <Container
      id='faq'
      bg='pinky'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
    >
      <Header title={title} caption={caption} />
      <Flex
        as='section'
        pt={[3, 4]}
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        px={[0, 0, 4, 6]}
      >
        <Box>
          <Subhead
            textAlign='left'
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Can I use microlink for free?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              Absolutely, we offer a free plan you can use indefinitely. The
              free plan offers almost the same pro capabilities.
            </Text>
            <Text pt={3} color='black60'>
              The only limitation is that the service is under IP Address
              limitation to avoid flooding the service. As soon as you need
              more, you can jump in a pro plan.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            How different is the free plan compared with pro?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              Some functionalities are only available under pro plans because
              they represent an infrastructure cost that you are paying with the
              pro plan.
            </Text>
            <Text pt={3} color='black60'>
              Also, the free plan runs under IP Address limitation, while any
              pro plan has an API token associated for identifying where the
              requests come from.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            What if I don't know how much API quota I need?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              No problem, just start with the smallest plan; in the moment you
              need more, you can upgrade your plan.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            How do I get an API key?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              After your payment, we send you the API key associated with the
              email you signed up.
            </Text>
            <Text pt={3} color='black60'>
              The API key need to be attached to all your requests:
              <Box as='ul' pt={3} my={0}>
                <Box as='li'>
                  At <Link href='/docs/sdk/'>Microlink SDK</Link>, attach it as{' '}
                  <Link href='/docs/sdk/parameters/api-key/'>apiKey</Link>.
                </Box>
                <Box as='li' pt={3}>
                  At <Link href='/docs/api/#introduction'>Microlink API</Link>,
                  attach it as{' '}
                  <Link href='/docs/api/basics/authentication'>header</Link>.
                </Box>
              </Box>
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Do you have a Service-Level Agreements (SLA)?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              Some functionalities are only available under pro plans because
              they represent an infrastructure cost that you are paying with the
              pro plan.
            </Text>
            <Text pt={3} color='black60'>
              You can see our SLA level on{' '}
              <Link display='inline' href='/status' children='status' />
              {' page.'}
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            How do I know my plan usage?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              We notify you in an automatic way when you reach 50% or more of
              your usage plan, offering to upgrade your current plan to one more
              suitable based on your plan usage.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            What if I want to change my plan?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              You can upgrade, downgrade, or cancel your monthly account at any
              time with no further obligation, sending an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />{' '}
              with the email you signed up.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            How is the payment being processed?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              We use Stripe to process your payment. It's the same payment
              provider used in products such as Twitter, Pinterest, and Lyft. We
              do not handle your credit card information directly.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Can I update my card details?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              Yes, send an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />{' '}
              requesting the change. You will receive a link from where you'll
              be able to securely update your details.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Can I cancel my subscription?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              Yes, by sending an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />
              . Your request will be processed within 24hrs.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Other questions?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              We're always available at{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />
              .
            </Text>
          </Text>
        </Box>
      </Flex>
    </Container>
  )
}

const Pricing = ({ siteUrl, apiKey, stripeKey, apiEndpoint }) => {
  const title = 'Pricing'
  const caption = 'Growing with your business.'

  return (
    <Box as='article' id='pricing'>
      <Container as='section' pb={0}>
        <Header pb={[0, 4]} title={title} caption={caption} />
        <PricingTable
          siteUrl={siteUrl}
          apiKey={apiKey}
          stripeKey={stripeKey}
          apiEndpoint={apiEndpoint}
        />
      </Container>
    </Box>
  )
}

const Container = ({
  children,
  maxWidth,
  component: Component = Box,
  ...props
}) => (
  <Component as='article' px={4} pt={[4, 5]} pb={[4, 5]} {...props}>
    <ContainerBase children={children} maxWidth={maxWidth} />
  </Component>
)

const Principles = ({ children }) => (
  <Container
    pb={[0, 0, 0, 5]}
    id='principles'
    bg='pinky'
    borderTop={`${borders[1]} ${colors.pinkest}`}
    borderBottom={`${borders[1]} ${colors.pinkest}`}
  >
    <Header
      pb={[0, 0, 0, 3]}
      title='Principles'
      caption='How we build technical products.'
    />
    <Box as='section' pt={4}>
      <Hide breakpoints={[0, 1]}>
        <Grid children={children} itemsPerRow={3} />
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <Grid children={children} itemsPerRow={1} />
      </Hide>
    </Box>
  </Container>
)

const Block = ({
  blockOne,
  blockTwo,
  children,
  flexDirection = 'row',
  pt = [0, 0, 0, 4],
  pb = [0, 0, 0, 5],
  ...props
}) => (
  <Container
    maxWidth='100%'
    justifyContent='center'
    alignItems='center'
    component={Flex}
    {...props}
  >
    <Flex
      pt={pt}
      pb={pb}
      as='section'
      justifyContent='center'
      flexDirection={['column', 'column', 'column', flexDirection]}
      alignItems='center'
      ml='auto'
      mr='auto'
    >
      {blockOne}
      <Box ml={4} mr={4} />
      {blockTwo}
    </Flex>
    {children}
  </Container>
)

const Hero = ({ title }) => {
  const words = ['Instant', 'Costless', 'From $0', 'Effective', 'Reliable']
  const [word, setWord] = useState(words[0])
  const [index, setIndex] = useState(0)

  const handleClick = event => {
    event.preventDefault()
    setIndex((index + 1) % words.length)
    setWord(words[index])
  }

  const blockOne = (
    <Flex
      maxWidth={['100%', '100%', '100%', '960px']}
      justifyContent='center'
      flexDirection='column'
      pr={[0, 0, 0, 4]}
    >
      <Subhead
        textAlign={['center', 'center', 'center', 'inherit']}
        children='Production ready'
        fontSize={3}
        fontWeight='light'
      />
      <Subhead
        textAlign={['center', 'center', 'center', 'inherit']}
        children={title}
        fontSize={5}
      />
      <Text
        maxWidth={['inherit', 'inherit', 'inherit', 7]}
        mt={[0, 0, 0, 3]}
        textAlign={['center', 'center', 'center', 'inherit']}
        children='Fast, scalable, and reliable browser automation built for businesses and developers.'
      />
      <List ml={2} px={[3, 3, 3, 0]} mt={4} mb={3}>
        <List.Item>Get HTML or PDF from any URL.</List.Item>
        <List.Item>Take an screenshot in ~3 seconds.</List.Item>
        <List.Item>Turns websites into structured data.</List.Item>
        <List.Item>Get perfomance metrics & detect bottlenecks.</List.Item>
      </List>
      <Flex
        alignItems='center'
        justifyContent={['center', 'center', 'center', 'end']}
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <Flex>
          <Button onClick={() => navigate('/docs')}>
            <Caps fontSize={0}>Read Docs</Caps>
          </Button>
          <Text ml={3}>No credit card required.</Text>
        </Flex>
      </Flex>
    </Flex>
  )

  return (
    <Block
      id='hero'
      title={title}
      word={word}
      blockOne={blockOne}
      blockTwo={<MQLEditor />}
      children={<Caption onClick={handleClick} word={word} />}
      height='80vh'
    />
  )
}

const Caption = ({ word, ...props }) => (
  <Flex
    style={{ userSelect: 'none' }}
    flexDirection='column'
    justifyContent='center'
    alignItems='center'
    pt={6}
    {...props}
  >
    <Flex>
      <Subhead mr={3} fontWeight='light' fontSize={7}>
        Blazing.
      </Subhead>
      <Subhead mr={3} fontWeight='light' fontSize={7}>
        Fast.
      </Subhead>
      <Subhead mr={3} fontWeight='light' fontSize={7}>
        {word}.
      </Subhead>
      <Subhead fontWeight='bold' fontSize={7}>
        Cloud Browser.
      </Subhead>
    </Flex>
    <Flex pt={3}>
      <Subhead fontWeight='light' color='black80'>
        browser automation made simple at cost pricing, full control via API.
      </Subhead>
    </Flex>
  </Flex>
)

const Subheader = ({ title, subtitle, textAlign = 'center', children }) => (
  <>
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
  </>
  // <Flex
  //   justifyContent='center'
  //   alignItems='center'
  //   flexDirection='column'
  //   pb={5}
  // >
  //   <Subhead fontSize={2} fontWeight='bold' color='secondary'>
  //     <Caps as='span' children={children[0]} />
  //   </Subhead>
  //   <Heading
  //     mt={1}
  //     mb={1}
  //     fontWeight='bold'
  //     fontSize={6}
  //     variant={null}
  //     children='Website'
  //   />
  //   <Link>See docs</Link>
  // </Flex>
)

const Screenshots = props => {
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

  const [screenshotUrl, setScreenshotUrl] = useState(screenshotsUrls[0])
  const [index, setIndex] = useState(0)

  const handleClick = event => {
    event.preventDefault()
    setIndex((index + 1) % screenshotsUrls.length)
    setScreenshotUrl(screenshotsUrls[index])
  }

  const blockOne = (
    <Flex justifyContent='center' alignItems='center' flexDirection='column'>
      <Subheader subtitle='screenshot' title='Turn websites into a snapshot' />
    </Flex>
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

const Pdf = () => {
  const pdfsUrls = [
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

  const [pdfUrl, setpdfUrl] = useState(pdfsUrls[0])
  const [index, setIndex] = useState(0)

  const handleClick = event => {
    event.preventDefault()
    setIndex((index + 1) % pdfsUrls.length)
    setpdfUrl(pdfsUrls[index])
  }

  const blockOne = (
    <Flex flexDirection='column' maxWidth='1100px'>
      <Flex>
        <Subhead fontWeight='normal' fontSize={7}>
          Export to PDF.
        </Subhead>
      </Flex>
      <Text mt={[0, 0, 0, 3]} mb={[0, 0, 0, 3]} textAlign='left' maxWidth={11}>
        Take a retina display pdf of any URL. Export them to PNG or JPEG.
        Automatic CDN redistribution. Overlay composition using a browser framer
        & background. Just in time stale refresh, keeping them up to date.
      </Text>
      <Flex pt={3} alignItems='center' justifyContent='end'>
        <Button onClick={() => navigate('/pdf')}>
          <Caps fontSize={0}>Live Demo</Caps>
        </Button>
        <Link onClick={() => navigate('/docs/api/parameters/pdf')} ml={3}>
          Read Docs
        </Link>
      </Flex>
    </Flex>
  )

  const blockTwo = (
    <Flex justifyContent='center' alignItems='center' flexDirection='column'>
      <Box data-tilt pt={3}>
        <Image src={pdfUrl} width={aspectRatio.width[1]} />
      </Box>
    </Flex>
  )

  return (
    <>
      <Block
        id='pdf'
        flexDirection='row'
        onClick={handleClick}
        blockOne={blockOne}
        blockTwo={blockTwo}
        pb={0}
      />
      <Block
        id='pdf'
        flexDirection='row-reverse'
        onClick={handleClick}
        blockOne={blockOne}
        blockTwo={blockTwo}
      />
      <Block
        pt={0}
        id='pdf'
        flexDirection='row'
        onClick={handleClick}
        blockOne={blockOne}
        blockTwo={blockTwo}
      />
    </>
  )
}

const Meta = ({ demoLinks, ...props }) => {
  const demoLinkTest = ({ brand }) => brand === 'Twitter'
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
      <Subheader subtitle='meta' title='Turn websites into rich media' />
    </Flex>
  )

  const blockTwo = (
    <Flex justifyContent='center' alignItems='center' flexDirection='column'>
      <Box data-tilt pt={4} pb={3}>
        <LiveDemo children={link} />
      </Box>
      <Text
        mt={[0, 0, 0, 3]}
        mb={[0, 0, 0, 3]}
        px={6}
        textAlign='center'
        maxWidth='960px'
      >
        Engage your content with enriched media. Convert your links into
        beautiful previews. Make your content attractive to consume. Add it to
        an existing website or app. Auto media detection (image, video, audio).
        Native embeds supported. Easily customizable.
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
      id='meta'
      flexDirection='column'
      onClick={handleClick}
      blockOne={blockOne}
      blockTwo={blockTwo}
      {...props}
    />
  )
}

function Index () {
  const demoLinks = useDemoLinks()

  const {
    siteUrl,
    paymentApiKey,
    stripeKey,
    paymentEndpoint,
    headline
  } = useSiteMetadata()

  return (
    <Layout>
      <Hero title={headline} />
      <Screenshots
        bg='gray0'
        // borderTop={`${borders[1]} ${colors.pinkest}`}
        // borderBottom={`${borders[1]} ${colors.pinkest}`}
      />

      <Meta demoLinks={demoLinks} />
      <Pdf />
      {/* <Principles children={usePrinciples()} /> */}
      <Pricing
        siteUrl={siteUrl}
        apiKey={paymentApiKey}
        stripeKey={stripeKey}
        apiEndpoint={paymentEndpoint}
      />
      <Questions />
    </Layout>
  )
}

export default Index
