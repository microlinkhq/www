/* global fetch */
import {Box, Text, Flex, Heading, Subhead} from 'rebass'
import { color, space } from 'styled-system'
import MicrolinkCard from 'react-microlink'
import styled from 'styled-components'
import React, {Component} from 'react'
import Hide from 'hidden-styled'
import colorWrapper from 'color'

import {
  WaveSection,
  RippleSection,
  Section,
  GradientSection
} from '../components/Section'

import ContentFeature from '../components/ContentFeature'
import {LinkSolid, LinkDotted} from '../components/Link'
import PricingTable from '../components/PricingTable'
import ContentGrid from '../components/ContentGrid'
import DemoLinks from '../components/DemoLinks'
import Container from '../components/Container'
import SearchBox from '../components/SearchBox'
import CodeCard from '../components/CodeCard'
import getColors from '../helpers/get-colors'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Logo from '../components/Logo'
import {textGradient, primaryFont, maxWidth} from '../theme'

const SectionSubhead = Subhead.extend`
display: block;
`

const Description = Subhead.extend`
${textGradient}
text-align: center;
font-weight: normal;
max-width: 40rem;
`

const Main = styled.main`
  ${color}
  ${space}
`

const EllipsisText = Text.extend`
  ${maxWidth}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CustomHeading = Heading.extend`
  ${primaryFont}
`

const URL_FALLBACK = 'https://www.nytimes.com/2017/09/19/learning/whats-going-on-in-this-graph-sept-19-2017.html'

export default class extends Component {
  constructor (props) {
    super(props)
    this.loaderStop = this.loaderStop.bind(this)
    this.setUrl = this.setUrl.bind(this)
    this.fetchUrl = this.fetchUrl.bind(this)

    this.state = {
      loading: false,
      url: URL_FALLBACK,
      data: {
        'lang': 'en',
        'author': 'The Learning Network',
        'title': 'What’s Going On in This Graph? | Sept. 19, 2017',
        'publisher': 'NYTimes',
        'image': {
          'width': 1003,
          'height': 524,
          'type': 'png',
          'url': 'https://static01.nyt.com/images/2017/09/13/learning/WGOITGraph09-19-17LN/WGOITGraph09-19-17LN-facebookJumbo-v2.png',
          'palette': [
            '#1c94bc',
            '#ecfbb4',
            '#25519f',
            '#505cac',
            '#cbccd2'
          ],
          'background_color': '#CBCCD2',
          'color': '#115A73',
          'alternative_color': '#25519F'
        },
        'description': 'Look closely at this graph, and join the moderated conversation about what you and other students see.',
        'date': '2017-09-19T09:30:01.000Z',
        'logo': {
          'width': 57,
          'height': 57,
          'type': 'png',
          'url': 'https://static01.nyt.com/images/icons/ios-default-homescreen-57x57.png',
          'palette': [
            '#2b2b2b',
            '#c4c4c4',
            '#7c7c7c'
          ],
          'background_color': '#C4C4C4',
          'color': '#2B2B2B',
          'alternative_color': '#4F4F4F'
        },
        'url': 'https://www.nytimes.com/2017/09/19/learning/whats-going-on-in-this-graph-sept-19-2017.html'
      }
    }
  }

  loaderStop () {
    this.setState({loading: false})
  }

  fetchUrl (url) {
    fetch(this.getUrl(this.props.apiEndpoint, url))
      .then(res => res.json())
      .then(({data}) => {
        if (data) this.setState({url, data})
        this.loaderStop()
      })
  }

  onChange (newState) {
    try {
      const {data} = JSON.parse(newState)
      this.setState({data})
    } catch (err) {}
  }

  componentWillUpdate (nextProps, nextState) {
    const {url} = this.state
    const nextUrl = nextState.url
    if (url !== nextUrl) this.fetchUrl(nextUrl)
  }

  getUrl (apiEndpoint, url) {
    return `${apiEndpoint}/?url=${url}&palette`
  }

  setUrl (url) {
    if (url !== this.state.url) this.setState({loading: true, url})
  }

  render () {
    const {data, paymentEndpoint, paymentApiKey, stripeKey} = this.props
    const features = data.features.edges.map(item => item.node)
    const demos = data.demos.edges.map(item => item.node)
    const { color: _color, alternativeColor: _alternativeColor } = getColors(this.state.data)

    const colorBase = colorWrapper(_alternativeColor || _color)
    const textColor = colorWrapper(colorBase).isDark() ? '#FAFBFC' : 'gray9'

    return (
      <Main>
        <NavBar bg='white' color='black50' py={1} mx='auto' />
        <WaveSection bg='#FAFBFC' pt={'56px'} id='home' color={_color} alternativeColor={_alternativeColor}>
          <Container px={[3, 4, 5, 6]} pt={4}>
            <Flex is='section' justify='center' direction='column' align='center'>
              <Flex justify='center' direction='column' align='center' py={3}>
                <CustomHeading f={[5, 6]} pb={2} color='primary' bold>
                  <Logo ml={1} width={['32px', '48px']} /> microlink
                </CustomHeading>
                <Description f={[2, 3, 4]} px={[2, 4, 5]}>
                  Get relevant information from any link
                </Description>
              </Flex>
              <SearchBox
                bg='white'
                width={1}
                my={3}
                loading={this.state.loading}
                placeholder={URL_FALLBACK}
                value={this.state.url !== URL_FALLBACK ? this.state.url : null}
                onChange={this.setUrl}
              />
            </Flex>
          </Container>

          <Box py={4} px={[2, 4]}>
            <Flex is='section' justify='center' direction='column' align='center'>
              <Text f={1} py={3} color='gray8'>
                Click to see it in action →
              </Text>
            </Flex>

            <Container pb={3}>
              <DemoLinks
                px={[0, 4, 6, 0]}
                links={demos}
                onClick={({url}) => this.setUrl(url)}
              />
            </Container>

            <Container bg='transparent' py={3} color='black'>
              <CodeCard
                data={this.state.data}
                bg='transparent'
                pt={4}
                pb={5}
                px={[0, '', '', 3]}
                onChange={data => this.setState({ data: JSON.parse(data) })}
              />
            </Container>
          </Box>
        </WaveSection>

        <Section bg='#FAFBFC'>
          <Container p={[2, 5]} pt={[4, 5]}>
            <ContentFeature direction='right' image='/img/carbon-dracula.png'>
              <SectionSubhead
                f={[3, 5]}
                pt={[0, 3]}
                pb={[3, 4]}
                color='secondary'
              >Get the context of any link</SectionSubhead>

              <Text f={[2, 3]} py={3}>
                Enter an URL, receive information. Easy peasy.
              </Text>

              <Text f={[2, 3]} py={3}>
                You can obtain well structured and normalized data from practically any website, just providing the <LinkDotted to='https://docs.microlink.io/api/#api-parameters/url' external>url</LinkDotted>.
              </Text>

              <Text f={[2, 3]} py={3}>
                We also have <LinkDotted to='https://docs.microlink.io/api/#api-parameters/prerender' external>prerendering</LinkDotted> for get information from client side applications.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <Section bg='#FAFBFC' pb={5}>
          <Container p={[2, 5]}>
            <ContentFeature direction='right' image='/img/link-preview.png'>
              <SectionSubhead
                f={[3, 5]}
                pt={[0, 3]}
                pb={[3, 4]}
                color='secondary'
              >Build rich media embeds</SectionSubhead>

              <Text f={[2, 3]} py={3}>
                Improve your engagement for any media.
              </Text>

              <Text f={[2, 3]} py={3}>
                We help your users to understand why a link was shared and whether they need to act on it.
              </Text>

              <Text f={[2, 3]} py={3}>
                Use our <LinkDotted to='https://docs.microlink.io/sdk' external>SDK</LinkDotted> for easily integrate it into your site.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <RippleSection color={_color} alternativeColor={_alternativeColor} id='sdk'>
          <Container p={5}>
            <Flex justify='center' align='center' direction='column'>
              <Text color={textColor} py={3} f={[3, 4]}>
                Converts your links
              </Text>
              <EllipsisText style={{opacity: '0.5'}} color={textColor} py={3} f={[2, 4]} maxWidth={['100%', '500px']}>
                {this.state.url}
              </EllipsisText>
              <Text color={textColor} py={3} f={[1, 3]}>
                into beautiful previews
              </Text>
              <Box width={1}>
                <MicrolinkCard
                  key={`MicrolinkCard__${this.state.url}`}
                  url={this.state.url}
                  image={['image', 'logo']}
                  round
                  palette
                  style={{margin: '0 auto'}}
                />
              </Box>
              <Flex py={3} is='section' justify='center' direction='column' align='center'>
                <Text f={1} py={3} pb={1} color={textColor}>
                  Click to see more examples →
                </Text>
              </Flex>

              <Container pb={3}>
                <DemoLinks
                  size={32}
                  px={[0, '96px']}
                  links={demos}
                  onClick={({url}) => this.setUrl(url)}
                />
              </Container>
              <Text color={textColor} pt={4} f={3}>
                See <LinkSolid
                  color={textColor}
                  to='https://docs.microlink.io/sdk' external>
                  SDK Documentation
                </LinkSolid>.
              </Text>
            </Flex>
          </Container>
        </RippleSection>

        <Section bg='#FAFBFC'>
          <Container p={[2, 5]} pt={[4, 5]}>
            <ContentFeature direction='right' image='/img/browser.png'>
              <SectionSubhead
                f={[3, 5]}
                pt={[0, 3]}
                pb={[3, 4]}
                color='secondary'
              >Take screenshots</SectionSubhead>

              <Text f={[2, 3]} py={3}>
                Automate <LinkDotted to='https://docs.microlink.io/api/#api-parameters/screenshot' external>screenshot</LinkDotted>, displaying them anywhere.
              </Text>

              <Text f={[2, 3]} py={3}>
                Capture partial or full page snapshots, without complications.
              </Text>

              <Text f={[2, 3]} py={3}>
                We also support <LinkDotted to='https://docs.microlink.io/api/#api-parameters/screenshot/device-emulation' external>device</LinkDotted> emulation.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <Section bg='#FAFBFC' pb={5}>
          <Container p={[2, 5]}>
            <ContentFeature direction='right' image='/img/embed-support.png'>
              <SectionSubhead
                f={[3, 5]}
                pt={[0, 3]}
                pb={[3, 4]}
                color='secondary'
              >Embed in your markup</SectionSubhead>

              <Text f={[2, 3]} py={3}>
                Start by not writing any code.
              </Text>

              <Text f={[2, 3]} py={3}>
                You can <LinkDotted to='https://docs.microlink.io/api/#api-parameters/embed' external>embed</LinkDotted> directly in your HTML components.
              </Text>

              <Text f={[2, 3]} py={3}>
                Zero overhead. No dependencies.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <Section bg='white' id='features' px={[2, '', 5]} pt={[2, 5]}>
          <SectionSubhead
            f={[4, 5]}
            py={5}
            style={{textAlign: 'center'}}
            color='secondary'
            >Features</SectionSubhead>
          <Container>
            <Hide xs sm md><ContentGrid data={features} itemsPerRow={3} /></Hide>
            <Hide xs lg><ContentGrid data={features} itemsPerRow={2} /></Hide>
            <Hide sm md lg><ContentGrid data={features} itemsPerRow={1} /></Hide>
          </Container>
        </Section>

        <GradientSection bg='#FAFBFC' gradient='linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)'>
          <Container py={[6, '', '', 7]}>
            <Flex justify='center' align='center' direction='column'>
              <Text color='white' pb={2} f={3}>
                Discover all things you can do at
              </Text>
              <Text color='white' f={4}>
                <LinkSolid
                  color='white'
                  to='https://docs.microlink.io/api/'
                  external>
                  API Documentation
                </LinkSolid>
              </Text>
            </Flex>
          </Container>
        </GradientSection>

        <Section bg='white' id='pricing' px={[2, '', 5]} pt={[2, 5]} pb={[5, 0]}>
          <SectionSubhead
            f={[4, 5]}
            py={5}
            style={{textAlign: 'center'}}
            color='secondary'
            >Pricing</SectionSubhead>
          <Container pb={[2, 5]} px={[0, '', 3]}>
            <PricingTable
              api={paymentEndpoint}
              apiKey={paymentApiKey}
              stripeKey={stripeKey}
            />
          </Container>
        </Section>

        <Section bg='#10111B' color='gray1'>
          <Container py={[3, 4, 5]} px={[0, 0, 5]}>
            <Footer />
          </Container>
        </Section>

      </Main>
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
          icon
        }
      }
    }
    demos: allDemosYaml {
      edges {
        node {
          favicon
          url
        }
      }
    }
  }
`
