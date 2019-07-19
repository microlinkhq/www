import {
  useDefaultDemoLink,
  useDemoLinks,
  usePrinciples,
  useSiteMetadata
} from 'components/hook'

import React, { Fragment } from 'react'
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
  Grid,
  Header,
  Layout,
  LiveDemo,
  MQLEditor,
  PricingTable
} from 'components/patterns'

import { List, ListItem } from 'components/patterns/List/List'
import { borders } from 'theme'

// const FAQ = () => (
//   <Box as='article'>
//     <Container as='header' py={5}>
//       <Flex
//         as='header'
//         flexDirection='column'
//         justifyContent='center'
//         alignItems='center'
//         pb={[4, 5]}
//       >
//         <Heading mt={4} fontSize={7} children='Frequently Asked Questions' />
//         <Subhead mt={[2, 3]} color='black50' textAlign='center' maxWidth={8}>
//           Your questions, answered
//         </Subhead>
//       </Flex>
//     </Container>
//   </Box>
// )

const Pricing = ({ apiKey, stripeKey, apiEndpoint }) => {
  const title = 'Pricing'
  const caption = 'Growing with your business.'

  return (
    <Box as='article' id='pricing'>
      <Container as='section' pt={5} pb={0}>
        <Header title={title} caption={caption} />
        <PricingTable
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
    <Fragment>
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
    </Fragment>
  )
}

const Subheader = ({ children }) => (
  <Fragment>
    <Subhead fontSize={1} color='secondary'>
      <Caps as='span' children={children[0]} />
    </Subhead>
    <Heading mt={1} fontSize={[3, 4]} variant={null} children={children[1]} />
  </Fragment>
)

const SDK = ({ loading, editor, children }) => (
  <Container
    maxWidth='100%'
    bg='pinky'
    id='sdk'
    borderColor='pinkest'
    borderTop={borders[1]}
    borderBottom={borders[1]}
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
      <Box px={4} textAlign={'center'}>
        <Text mt={4} mb={[4, 4, 4, 0]} maxWidth={8}>
          <Link href='/docs/sdk/getting-started/overview/'>Microlink SDK</Link>{' '}
          converts your links into beautiful previews. Make your content
          attractive, engaging better your links.
        </Text>
      </Box>
    </Flex>
    <Flex
      py={[2, 3, 4, 5]}
      px={[5, 5, 5, 0]}
      as='section'
      justifyContent='center'
      alignItems={['center', 'center', 'center', 'end']}
      flexDirection={['column', 'column', 'column', 'row']}
      mx='auto'
    >
      <Flex
        maxWidth={['100%', '100%', '100%', '23em']}
        justifyContent='center'
        flexDirection='column'
      >
        <Text
          maxWidth={['inherit', 'inherit', 'inherit', 8]}
          mt={[1, 1, 1, 3]}
          textAlign={['center', 'center', 'center', 'inherit']}
          children='Engage your content with enriched media.'
        />
        <List px={[3, 3, 3, 0]} mt={4} mb={3}>
          <ListItem children='Add it to an existing website or app.' />
          <ListItem children='Auto detection (image, video, audio) with media controls support.' />
          <ListItem children='Easily customizable.' />
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
      <Box mx={4} />
      <Hide breakpoints={[0, 1, 2]}>
        <LiveDemo loading={loading} children={editor} />
      </Hide>
    </Flex>
    <Flex
      as='section'
      justifyContent='center'
      alignItems='center'
      mx='auto'
      flexDirection='column'
    >
      <Text
        mb={2}
        pb={[3, 4]}
        fontSize={1}
        color='gray8'
        children='Try another link →'
      />
      <DemoLinks
        children={children}
        onClick={({ brand }) => navigate(`/embed/${brand.toLowerCase()}`)}
      />
    </Flex>
  </Container>
)

const MQL = () => (
  <Container maxWidth='100%' id='sdk'>
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      as='header'
    >
      <Subheader
        children={['Microlink API', 'Turns websites into structured data']}
      />

      <Box px={4} textAlign={'center'}>
        <Text mt={4} mb={[4, 4, 4, 0]} maxWidth={8}>
          <Link href='/docs/mql/getting-started/overview'>
            Microlink Query Language
          </Link>{' '}
          (MQL) is a programmatic way to getting content from any URL. Build
          APIs from websites.
        </Text>
      </Box>
    </Flex>
    <Flex
      py={[2, 3, 4, 5]}
      px={[5, 5, 5, 0]}
      as='section'
      justifyContent='center'
      alignItems={['center', 'center', 'center', 'end']}
      flexDirection={['column', 'column', 'column', 'row']}
      mx='auto'
    >
      <Flex
        maxWidth={['100%', '100%', '100%', '23em']}
        justifyContent='center'
        flexDirection='column'
      >
        <Text
          maxWidth={['inherit', 'inherit', 'inherit', 8]}
          mt={[1, 1, 1, 3]}
          textAlign={['center', 'center', 'center', 'inherit']}
          children='Build APIs from websites.'
        />
        <List px={[3, 3, 3, 0]} mt={4} mb={3}>
          <ListItem children='Create data rules based on HTML markup.' />
          <ListItem children='Target any URL for getting specific content.' />
          <ListItem children='Builtin data validation & hydration.' />
        </List>
        <Flex
          alignItems='center'
          justifyContent={['center', 'center', 'center', 'end']}
          pb={[4, 4, 4, 0]}
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
      <Box mx={4} />
      <Hide breakpoints={[0, 1, 2]}>
        <MQLEditor />
      </Hide>
    </Flex>
  </Container>
)

const Principles = ({ children }) => (
  <Container
    id='principles'
    bg='pinky'
    borderColor='pinkest'
    borderTop={borders[1]}
    borderBottom={borders[1]}
  >
    <Header title='Principles' caption='How we build technical products.' />
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
  const { paymentApiKey, stripeKey, paymentEndpoint } = useSiteMetadata()

  return (
    <Layout>
      <Hero />
      <SDK children={demoLinks} editor={demoLink} />
      <MQL />
      <Principles children={usePrinciples()} />
      <Pricing
        apiKey={paymentApiKey}
        stripeKey={stripeKey}
        apiEndpoint={paymentEndpoint}
      />
      {/* <FAQ /> */}
    </Layout>
  )
}

export default Index
