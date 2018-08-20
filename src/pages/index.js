import React, { Fragment, Component } from 'react'
import {
  Text,
  Subhead,
  Box,
  Heading,
  Lead,
  Flex,
  Container,
  Hide
} from 'components/elements'
import {
  DemoLinks,
  CardLink,
  LiveDemo,
  PricingTable,
  Grid
} from 'components/patterns'
import { List, ListItem } from 'components/patterns/List'
import {
  Working,
  BrowserStats,
  DesignProcess,
  Frameworks
} from 'components/icons'

export default class extends Component {
  constructor (props) {
    super(props)
    const { data } = this.props
    const features = data.features.edges.map(item => item.node)
    const demoLinks = data.demoLinks.edges.map(item => item.node.data)
    const activeDemoLink = demoLinks[0]
    this.state = { features, demoLinks, activeDemoLink }
  }
  render () {
    const { paymentEndpoint, paymentApiKey, stripeKey } = this.props
    const { features, demoLinks, activeDemoLink } = this.state

    return (
      <Fragment>
        <Box is='article'>
          <Container is='section' pt={4} pb={5} px={0}>
            <Flex
              is='header'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              pb={[4, 5]}
            >
              <Heading
                children='Extract structured data from any website'
                maxWidth='12em'
              />
              <Lead
                mt={2}
                color='black50'
                children='Enter an URL, receive data.'
              />
            </Flex>
            <Box is='article'>
              <Container is='section' px={0}>
                <Flex flexDirection='column'>
                  <LiveDemo children={activeDemoLink} />
                  <Hide breakpoints={[0, 1]}>
                    <Flex
                      flexDirection='column'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Text
                        fontSize={1}
                        py={3}
                        color='gray8'
                        children='Try another link →'
                      />
                      <DemoLinks
                        px={[4, 0]}
                        size={[40, 48]}
                        children={demoLinks}
                        onClick={activeDemoLink =>
                          this.setState({ activeDemoLink })
                        }
                      />
                    </Flex>
                  </Hide>
                </Flex>
              </Container>
            </Box>
          </Container>
        </Box>
        <Box bg='#F5F4F9' is='article'>
          <Container is='section' py={[4, 6]}>
            <Flex
              flexDirection={['column', 'row']}
              justifyContent='space-between'
            >
              <Flex
                px={[4, 0]}
                maxWidth={['100%', '23em']}
                justifyContent='center'
                flexDirection='column'
              >
                <Subhead
                  is='header'
                  textAlign={['center', 'inherit']}
                  children='Browser as service'
                />
                <Text
                  textAlign={['center', 'inherit']}
                  maxWidth={['inherit', 6]}
                  mt={[1, 3]}
                  color='black80'
                  children='Microlink is a powerful API for developers with top notch tecnologies of the industry.'
                />
                <Hide breakpoints={[2, 3]}>
                  <Box textAlign='center'>
                    <BrowserStats py={4} width={'16rem'} />
                  </Box>
                </Hide>
                <List pl={[4, 0]} mt={4}>
                  <ListItem children='Runs on top of headless Chrome.' />
                  <ListItem children='Simple API integration.' />
                  <ListItem children='Add it to your existing stack or cloud.' />
                </List>
              </Flex>
              <Hide breakpoints={[0, 1]}>
                <Flex>
                  <BrowserStats
                    width={'24rem'}
                    transform={'translateY(-28px)'}
                  />
                </Flex>
              </Hide>
            </Flex>
          </Container>
        </Box>
        <Box is='article'>
          <Container is='section' py={4}>
            <Flex
              is='header'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              pb={[4, 5]}
            >
              <Heading children='Features' />
              <Lead
                mt={2}
                color='black50'
                children='Our feature at a glance.'
              />
            </Flex>
            <Hide breakpoints={[0, 1]}>
              <Grid children={features} itemsPerRow={3} />
            </Hide>
            <Hide breakpoints={[2, 3]}>
              <Grid children={features} itemsPerRow={1} />
            </Hide>
          </Container>
        </Box>
        <Box bg='#F5F4F9' is='article'>
          <Container is='section' py={[4, 6]}>
            <Flex
              flexDirection={['column', 'row']}
              justifyContent='space-between'
            >
              <Hide breakpoints={[0, 1]}>
                <Flex>
                  <DesignProcess
                    width={'24rem'}
                    transform={'translateY(4px)'}
                  />
                </Flex>
              </Hide>
              <Flex
                px={[4, 0]}
                maxWidth={['100%', '23em']}
                justifyContent='center'
                flexDirection='column'
              >
                <Subhead
                  is='header'
                  textAlign={['center', 'inherit']}
                  children='Turns any website into data'
                />
                <Text
                  textAlign={['center', 'inherit']}
                  maxWidth={['inherit', 6]}
                  mt={[1, 3]}
                  px={[3, 0]}
                  color='black80'
                  children='Microlink turns any website into useful structured data.'
                />
                <Hide breakpoints={[2, 3]}>
                  <Box textAlign='center'>
                    <DesignProcess py={4} width={'16rem'} />
                  </Box>
                </Hide>
                <List pl={[4, 0]} mt={4}>
                  <ListItem children='Works with any website.' />
                  <ListItem children='Detect complementary information (video, colors, dimensions, etc).' />
                  <ListItem children='Customize payload using Custom Rules.' />
                </List>
              </Flex>
            </Flex>
          </Container>
        </Box>
        <Box variant='gradient' is='article'>
          <Container is='section' py={[4, 5]}>
            <Flex
              px={3}
              flexDirection={['column', 'row']}
              justifyContent='space-between'
            >
              <Flex
                justifyContent='center'
                flexDirection='column'
                alignItems='center'
                mb={[4, 0]}
              >
                <CardLink
                  href='https://docs.microlink.io/sdk'
                  title='Explore the SDK'
                  description='See beyond any link, easily converting links into beautiful previews. Build engagement for your website, improving the user experience.'
                  iconComponent={Frameworks}
                />
              </Flex>
              <Flex
                justifyContent='center'
                flexDirection='column'
                alignItems='center'
              >
                <CardLink
                  href='https://docs.microlink.io'
                  title='Explore the Docs'
                  description='Customize each payload using custom rules, detect predominant colors or take sreenshot. Embed API calls directly in your markup.'
                  iconComponent={Working}
                />
              </Flex>
            </Flex>
          </Container>
        </Box>
        <Box is='article' id='pricing'>
          <Container is='section' pt={4} pb={0}>
            <Flex
              is='header'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              pb={[4, 5]}
            >
              <Heading children='Pricing' />
              <Lead
                mt={2}
                color='black50'
                children='Pay as you go, cancel anytime'
              />
            </Flex>
            <PricingTable
              apiEndpoint={paymentEndpoint}
              apiKey={paymentApiKey}
              stripeKey={stripeKey}
            />
          </Container>
        </Box>
      </Fragment>
    )
  }
}

export const query = graphql`
  query LandingPage {
    features: allFeaturesYaml {
      edges {
        node {
          title
          description
        }
      }
    }
    demoLinks: allDemoLink {
      edges {
        node {
          data {
            lang
            author
            title
            publisher
            description
            date
            url
            image {
              url
              width
              height
              type
              size
              size_pretty
            }
            logo {
              url
              width
              height
              type
              size
              size_pretty
            }
            video {
              url
              width
              height
              type
              size
              size_pretty
              duration
              duration_pretty
            }
          }
        }
      }
    }
  }
`
