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
import {textGradient, primaryFont} from '../theme'

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
  max-width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CustomHeading = Heading.extend`
  ${primaryFont}
`

const URL_FALLBACK = 'https://vimeo.com/188175573/'

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
        'author': null,
        'title': 'Converse - Past meets Present - Montage',
        'publisher': 'Vimeo',
        'image': {
          'width': 1280,
          'height': 720,
          'type': 'jpg',
          'url': 'https://i.vimeocdn.com/filter/overlay?src0=https://i.vimeocdn.com/video/598160082_1280x720.webp&src1=https://f.vimeocdn.com/images_v6/share/play_icon_overlay.png',
          'palette': [
            '#334553',
            '#1689d4',
            '#c8afae',
            '#6abce2',
            '#6c8ca4',
            '#0c54ac'
          ],
          'background_color': '#C8AFAE',
          'color': '#0B4368',
          'alternative_color': '#0A458D'
        },
        'description': 'Converse has spent a good part of this year updating some of their classics. Our past is constantly catching up to us, but we rarely get to see the relationship…',
        'date': '2016-10-20T13:06:52.000Z',
        'logo': {
          'width': 180,
          'height': 180,
          'type': 'png',
          'url': 'https://i.vimeocdn.com/favicon/main-touch_180',
          'palette': [
            '#04acec',
            '#94dcfb',
            '#025f82'
          ],
          'background_color': '#94DCFB',
          'color': '#025E81',
          'alternative_color': '#025F82'
        },
        'url': 'https://vimeo.com/188175573'
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
    const currentUrl = this.state.url
    const nextUrl = nextState.url
    if (currentUrl !== nextUrl) this.fetchUrl(nextUrl)
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
    const textColor = colorWrapper(colorBase).dark() ? '#FAFBFC' : 'gray9'

    return (
      <Main>
        <NavBar bg='white' color='black50' py={1} mx='auto' />
        <WaveSection bg='#FAFBFC' mt={'56px'} id='home' color={_color} alternativeColor={_alternativeColor}>
          <Container px={[3, 6]} pt={4}>
            <Flex is='section' justify='center' direction='column' align='center'>
              <Flex justify='center' direction='column' align='center' py={3}>
                <CustomHeading f={[5, 6]} pb={2} color='#303A52' bold>
                  <Logo ml={1} width={['32px', '48px']} /> microlink
                </CustomHeading>
                <Description f={[3, 4]} px={5} color='#654EA3'>
                  Get relevant information from any website
                </Description>
              </Flex>
              <SearchBox
                bg='white'
                width={['80%', '100%']}
                my={[1, 3]}
                loading={this.state.loading}
                placeholder={URL_FALLBACK}
                value={this.state.url !== URL_FALLBACK ? this.state.url : null}
                onChange={this.setUrl}
              />
            </Flex>
          </Container>

          <Box py={4} px={[3, 6]}>
            <Flex is='section' justify='center' direction='column' align='center'>
              <Text f={1} py={3} color='gray8'>
                Click to see it in action →
              </Text>
            </Flex>

            <Container pb={3}>
              <DemoLinks
                px={[0, '96px']}
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
                onChange={data => this.setState({ data: JSON.parse(data) })}
              />
            </Container>
          </Box>
        </WaveSection>

        <Section bg='#FAFBFC'>
          <Container p={[2, 5]}>
            <ContentFeature direction='right' image='/img/carbon-dracula.png'>
              <Subhead
                f={[3, 5]}
                pt={[0, 3]}
                pb={[3, 4]}
                color='secondary'
              >Extract data from any website</Subhead>

              <Text f={[2, 3]} py={3}>
                Enter an URL, receive information. Easy peasy.
              </Text>

              <Text f={[2, 3]} py={3}>
                You can obtain well structured and normalized data from practically any website, just providing the <LinkSolid to='https://docs.microlink.io/#url' external>url</LinkSolid>.
              </Text>

              <Text f={[2, 3]} py={3}>
                We also have <LinkSolid to='https://docs.microlink.io/#prerender' external>prerendering</LinkSolid> for get information from client side applications.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <Section bg='#FAFBFC' pb={5}>
          <Container p={[2, 5]}>
            <ContentFeature direction='right' image='/img/link-preview.png'>
              <Subhead
                f={[3, 5]}
                pt={[0, 3]}
                pb={[3, 4]}
                color='secondary'
              >Build rich media embeds</Subhead>

              <Text f={[2, 3]} py={3}>
                No matters if you are a newspaper, tech writter or just have a personal blog.
              </Text>

              <Text f={[2, 3]} py={3}>
                Improve your social content engagement using adaptative UIs for any media.
              </Text>

              <Text f={[2, 3]} py={3}>
                Use our JavaScript SDK <LinkSolid to='https://microlinkjs.org' external>microlink.js</LinkSolid> for easily integrating your site.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <RippleSection color={_color} alternativeColor={_alternativeColor} id='sdk'>
          <Container p={5}>
            <Flex justify='center' align='center' direction='column'>
              <Text color={textColor} py={3} f={4}>
                Converts your links
              </Text>
              <EllipsisText style={{opacity: '0.5'}} color={textColor} py={3} f={4}>
                {this.state.url}
              </EllipsisText>
              <Text color={textColor} py={3} f={3}>
                into beautiful previews
              </Text>
              <MicrolinkCard
                key={`MicrolinkCard__${this.state.url}`}
                url={this.state.url}
                image={['image', 'logo']}
                round
                palette
              />
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
                using <LinkDotted color={textColor} to='https://microlink.js.org' external>Microlink SDK</LinkDotted>
              </Text>
            </Flex>
          </Container>
        </RippleSection>

        <Section bg='#FAFBFC' py={5}>
          <Container p={[2, 5]}>
            <ContentFeature direction='right' image='/img/browser.png'>
              <Subhead
                f={[3, 5]}
                pt={[0, 3]}
                pb={[3, 4]}
                color='secondary'
              >Take screenshots</Subhead>

              <Text f={[2, 3]} py={3}>
                Automate <LinkSolid to='https://docs.microlink.io/#screenshot' external>screenshots</LinkSolid> of any website, displaying them anywhere.
              </Text>

              <Text f={[2, 3]} py={3}>
                Capture easily partial or full page snapshots, without complications.
              </Text>

              <Text f={[2, 3]} py={3}>
                You can also emulate specific <LinkSolid to='https://docs.microlink.io/#device-emulation' external>devices</LinkSolid> or adapt the viewport.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <Section bg='#FAFBFC'>
          <Container p={[2, 5]}>
            <ContentFeature direction='right' image='/img/embed-support.png'>
              <Subhead
                f={[3, 5]}
                pt={[0, 3]}
                pb={[3, 4]}
                color='secondary'
              >Embed in your markup</Subhead>

              <Text f={[2, 3]} py={3}>
                The integration of third parties more simple and universal without effort.
              </Text>

              <Text f={[2, 3]} py={3}>
                You can <LinkSolid to='https://docs.microlink.io/#embed' external>embed</LinkSolid> the API calls directly in your HTML markup.
              </Text>

              <Text f={[2, 3]} py={3}>
                Zero overhead. No dependencies.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <Section bg='white' id='features' px={[2, 5]} pt={[2, 5]}>
          <Subhead
            f={[4, 5]}
            py={5}
            style={{textAlign: 'center'}}
            color='secondary'
            >Features</Subhead>
          <Container>
            <Hide xs sm><ContentGrid data={features} itemsPerRow={3} /></Hide>
            <Hide md lg><ContentGrid data={features} itemsPerRow={1} /></Hide>
          </Container>
        </Section>

        <GradientSection bg='#FAFBFC' gradient='linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)'>
          <Container p={7}>
            <Flex justify='center' align='center' direction='column'>
              <Text color='white' pb={2} f={3}>
                Discover all things you can do at
              </Text>
              <Text color='white' f={4}>
                <LinkDotted to='https://docs.microlink.io' external>API Documentation</LinkDotted>
              </Text>
            </Flex>
          </Container>
        </GradientSection>

        <Section bg='white' id='pricing' px={[2, 5]} pt={[2, 5]} pb={[5, 0]}>
          <Subhead
            f={[4, 5]}
            py={5}
            style={{textAlign: 'center'}}
            color='secondary'
            >Pricing</Subhead>
          <Container pb={[2, 5]}>
            <PricingTable
              api={paymentEndpoint}
              apiKey={paymentApiKey}
              stripeKey={stripeKey}
            />
          </Container>
        </Section>

        <Section bg='#10111B' color='gray1'>
          <Footer py={[3, 5]} px={[3, 7]} />
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
