import {
  useDefaultDemoLink,
  useDemoLinks,
  usePrinciples,
  useSiteMetadata
} from 'components/hook'

import React from 'react'
import { navigate } from 'gatsby'

import {
  Box,
  ButtonSecondary,
  Caps,
  Container as ContainerBase,
  Flex,
  Heading,
  Hide,
  Link,
  Subhead,
  Text
} from 'components/elements'

import {
  Announcement,
  DemoLinks,
  Faq,
  Grid,
  Header,
  Layout,
  LiveDemo,
  MQLEditor,
  PricingTable,
  List
} from 'components/patterns'

import { borders, colors } from 'theme'

const FaqSection = () => {
  const title = 'FAQ'
  const caption = 'Your questions, answered.'

  return (
    <Container
      id='faq'
      bg='pinky'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
    >
      <Header title={title} caption={caption} />
      <Flex as='section' pt={4} justifyContent='center' flexDirection='column'>
        <Box px={6}>
          <Faq pt={0}>
            <Faq.Question>Can I use microlink for free?</Faq.Question>
            <Faq.Asked>
              <>
                Absolutely, we offer a free plan you can use indefinitely.
                <br />
                <br />
                The free plan offers almost the same pro capabilities; The only
                limitation is that the service is under IP Address limitation to
                avoid flooding the service
                <br />
                <br />
                As soon as you need more, you can jump in a pro plan.
              </>
            </Faq.Asked>
          </Faq>
          <Faq>
            <Faq.Question>
              How different is the free plan compared with pro?
            </Faq.Question>
            <Faq.Asked>
              Some functionalities are only available under pro plans because
              they represent an infrastructure cost that you are paying with the
              pro plan.
              <br />
              <br />
              Also, the free plan runs under IP Address limitation, while any
              pro plan has an API token associated for identifying where the
              requests come from.
            </Faq.Asked>
          </Faq>
          <Faq>
            <Faq.Question>
              What if I don't know how much API quota I need?
            </Faq.Question>
            <Faq.Asked>
              No problem, just start with the smallest plan; in the moment you
              need more, you can upgrade your plan.
            </Faq.Asked>
          </Faq>
          <Faq>
            <Faq.Question>
              Do you have a Service-Level Agreements (SLA)?
            </Faq.Question>
            <Faq.Asked>
              You can see our SLA level on{' '}
              <Link
                display='inline'
                href='https://status.microlink.io'
                children='status page'
              />
              .
            </Faq.Asked>
          </Faq>
          <Faq>
            <Faq.Question>How I can know my plan usage?</Faq.Question>
            <Faq.Asked>
              We notify you in an automatic way when you reach 50% or more of
              your usage plan, offering to upgrade your current plan to one more
              suitable based on your plan usage.
            </Faq.Asked>
          </Faq>
          <Faq>
            <Faq.Question>What if I want to change my plan?</Faq.Question>
            <Faq.Asked>
              You can upgrade, downgrade, or cancel your monthly account at any
              time with no further obligation, sending an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />{' '}
              with the email you signed up.
            </Faq.Asked>
          </Faq>
          <Faq>
            <Faq.Question>How is the payment being processed?</Faq.Question>
            <Faq.Asked>
              We use Stripe to process your payment. It's the same payment
              provider used in products such as Twitter, Pinterest, and Lyft. We
              do not handle your credit card information directly.
            </Faq.Asked>
          </Faq>
          <Faq>
            <Faq.Question>Can I update my card details?</Faq.Question>
            <Faq.Asked>
              Yes, send an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />{' '}
              requesting the change. You will receive a link from where you'll
              be able to securely update your details.
            </Faq.Asked>
          </Faq>
          <Faq>
            <Faq.Question>Can I cancel my subscription?</Faq.Question>
            <Faq.Asked>
              Yes, by sending an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />
              . Your request will be processed within 24hrs.
            </Faq.Asked>
          </Faq>
          <Faq>
            <Faq.Question>Other questions?</Faq.Question>
            <Faq.Asked>
              We're always available at{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />
              .
            </Faq.Asked>
          </Faq>
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

const Container = ({ children, maxWidth, ...props }) => (
  <Box as='article' px={4} pt={[4, 5]} pb={[4, 5]} {...props}>
    <ContainerBase children={children} maxWidth={maxWidth} />
  </Box>
)

const Hero = () => {
  const title = 'Turn websites into data'
  const caption = 'Microlink makes easy to build an API on top of any website.'
  const header = <Header title={title} caption={caption} />

  const announcement = (
    <Announcement
      data-event-category='Home'
      data-event-action='Announcement'
      href='/screenshot'
      children='Take a screenshot of any website'
    />
  )

  // const announcement = (
  //   <Flex pt={[1, 0, 0, 0]} justifyContent='center' alignItems='center'>
  //     <Link
  //       data-event-category='Home'
  //       data-event-action='Announcement'
  //       href='https://www.producthunt.com/posts/microlink-2-0?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-microlink-2-0'
  //       target='_blank'
  //     >
  //       <Image
  //         width={['10rem', '10rem', '14rem', '14rem']}
  //         src='https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=136901&theme=light&period=daily'
  //         alt='Microlink 2.0 - Extract structured data from any website | Product Hunt Embed'
  //       />
  //     </Link>
  //   </Flex>
  // )

  return (
    <>
      <Hide breakpoints={[0, 1, 2]}>
        <Container id='hero'>
          {header}
          {announcement}
        </Container>
      </Hide>

      <Hide breakpoints={[3]}>
        <Box pb={[4, 5]}>
          <Container id='hero' pb={0}>
            {header}
          </Container>
          {announcement}
        </Box>
      </Hide>
    </>
  )
}

const Subheader = ({ children }) => (
  <>
    <Subhead fontSize={1} color='secondary'>
      <Caps as='span' children={children[0]} />
    </Subhead>
    <Heading mt={1} fontSize={[3, 4]} variant={null} children={children[1]} />
  </>
)

const Sdk = ({ loading, editor, children }) => (
  <Container
    maxWidth='100%'
    bg='pinky'
    id='sdk'
    borderTop={`${borders[1]} ${colors.pinkest}`}
    borderBottom={`${borders[1]} ${colors.pinkest}`}
  >
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      as='header'
    >
      <Subheader
        children={['Microlink SDK', 'Turn websites into rich media']}
      />
      <Box textAlign='center'>
        <Text py={4} maxWidth={8}>
          <Link href='/docs/sdk/getting-started/overview/'>Microlink SDK</Link>{' '}
          converts your links into beautiful previews. Make your content
          attractive, engaging better your links.
        </Text>
      </Box>
    </Flex>
    <Flex
      pt={[0, 0, 0, 4]}
      pb={[0, 0, 0, 4]}
      as='section'
      justifyContent='center'
      alignItems={['center', 'center', 'center', 'end']}
      flexDirection={['column', 'column', 'column', 'row']}
      ml='auto'
      mr='auto'
    >
      <Flex
        maxWidth={['100%', '100%', '100%', '23em']}
        justifyContent='center'
        flexDirection='column'
      >
        <Text
          maxWidth={['inherit', 'inherit', 'inherit', 8]}
          mt={[0, 0, 0, 3]}
          textAlign={['center', 'center', 'center', 'inherit']}
          children='Engage your content with enriched media.'
        />
        <List px={[3, 3, 3, 0]} mt={4} mb={3}>
          <List.Item children='Add it to an existing website or app.' />
          <List.Item children='Auto detection (image, video, audio) with media controls support.' />
          <List.Item children='Easily customizable.' />
        </List>
        <Flex
          alignItems='center'
          justifyContent={['center', 'center', 'center', 'end']}
          pb={[4, 4, 4, 0]}
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Hide breakpoints={[3]}>
            <LiveDemo loading={loading} children={editor} />
          </Hide>

          <ButtonSecondary onClick={() => navigate('/embed')}>
            <Caps fontSize={0}>See More</Caps>
          </ButtonSecondary>
        </Flex>
      </Flex>
      <Box ml={4} mr={4} />
      <Hide breakpoints={[0, 1, 2]}>
        <LiveDemo loading={loading} children={editor} />
      </Hide>
    </Flex>
    <Flex
      as='section'
      justifyContent='center'
      alignItems='center'
      ml='auto'
      mr='auto'
      flexDirection='column'
    >
      <Text pb={4} fontSize={1} color='gray8' children='Try another link →' />
      <DemoLinks
        children={children}
        onClick={({ brand }) => navigate(`/embed/${brand.toLowerCase()}`)}
      />
    </Flex>
  </Container>
)

const Mql = () => (
  <Container maxWidth='100%' id='mql'>
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      as='header'
    >
      <Subheader
        children={['Microlink API', 'Turns websites into structured data']}
      />

      <Box textAlign='center'>
        <Text py={4} maxWidth={8}>
          <Link href='/docs/mql/getting-started/overview'>
            Microlink Query Language
          </Link>{' '}
          (MQL) is a programmatic way to getting content from any URL. Build
          APIs from websites.
        </Text>
      </Box>
    </Flex>
    <Flex
      pt={[0, 0, 0, 4]}
      as='section'
      justifyContent='center'
      alignItems={['center', 'center', 'center', 'end']}
      flexDirection={['column', 'column', 'column', 'row']}
      ml='auto'
      mr='auto'
    >
      <Flex
        maxWidth={['100%', '100%', '100%', '23em']}
        justifyContent='center'
        flexDirection='column'
      >
        <Text
          maxWidth={['inherit', 'inherit', 'inherit', 8]}
          mt={[0, 0, 0, 3]}
          textAlign={['center', 'center', 'center', 'inherit']}
          children='Build APIs from websites.'
        />
        <List px={[3, 3, 3, 0]} mt={4} mb={3}>
          <List.Item children='Create data rules based on HTML markup.' />
          <List.Item children='Target any URL for getting specific content.' />
          <List.Item children='Builtin data validation & hydration.' />
        </List>
        <Flex
          alignItems='center'
          justifyContent={['center', 'center', 'center', 'end']}
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Hide breakpoints={[3]}>
            <MQLEditor />
          </Hide>

          <ButtonSecondary
            onClick={() => navigate('/docs/mql/getting-started/overview')}
          >
            <Caps fontSize={0}>See More</Caps>
          </ButtonSecondary>
        </Flex>
      </Flex>
      <Box ml={4} mr={4} />
      <Hide breakpoints={[0, 1, 2]}>
        <MQLEditor />
      </Hide>
    </Flex>
  </Container>
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

function Index () {
  const demoLink = useDefaultDemoLink().data
  const demoLinks = useDemoLinks()
  const {
    siteUrl,
    paymentApiKey,
    stripeKey,
    paymentEndpoint
  } = useSiteMetadata()

  return (
    <Layout>
      <Hero />
      <Sdk children={demoLinks} editor={demoLink} />
      <Mql />
      <Principles children={usePrinciples()} />
      <Pricing
        siteUrl={siteUrl}
        apiKey={paymentApiKey}
        stripeKey={stripeKey}
        apiEndpoint={paymentEndpoint}
      />
      <FaqSection />
    </Layout>
  )
}

export default Index
