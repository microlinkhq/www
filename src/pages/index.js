import {ButtonOutline, Box, Text, Flex, Heading, Subhead} from 'rebass'
import { color, space } from 'styled-system'
import styled from 'styled-components'
import React, {Component} from 'react'
import fetch from 'unfetch'

import {bgGradient, textGradient} from '../theme'
import ContentFeature from '../components/ContentFeature'
import PricingTable from '../components/PricingTable'
import ContentGrid from '../components/ContentGrid'
import WaveSection from '../components/WaveSection'
import DemoLinks from '../components/DemoLinks'
import Container from '../components/Container'
import SearchBox from '../components/SearchBox'
import Separator from '../components/Separator'
import CodeCard from '../components/CodeCard'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Logo from '../components/Logo'
import Link from '../components/Link'

const CustomSubhead = Subhead.extend`
  ${textGradient} text-align: center;
  font-weight: normal;
  max-width: 40rem;
`

const Section = styled.section`
${color}
${space}
`

const Main = styled.main`
${color}
${space}
`

const CustomHeading = Heading.extend`
  letter-spacing: 2px;
`

const GradientSection = Section.extend`
${bgGradient}
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
        author: null,
        date: null,
        description: 'Converse has spent a good part of this year updating some of their classics. Our past is constantly catching up to us, but we rarely get to see the relationship…',
        favicon: {
          width: 180,
          height: 180,
          type: 'png',
          url: 'https://i.vimeocdn.com/favicon/main-touch_180',
          palette: [
            '#04acec',
            '#94dcfb',
            '#025f82'
          ],
          background_color: '#94DCFB',
          color: '#025E81',
          alternative_color: '#025F82'
        },
        image: {
          width: 1280,
          height: 720,
          type: 'jpg',
          url: 'https://i.vimeocdn.com/video/598160082_1280x720.jpg',
          palette: [
            '#564748',
            '#21a8f4',
            '#dabcbd',
            '#9ccded',
            '#5d7c9b',
            '#044cad'
          ],
          background_color: '#564748',
          color: '#77CAF8',
          alternative_color: '#C8DFFE'
        },
        logo: null,
        publisher: 'Vimeo',
        title: 'Converse - Past meets Present - Montage',
        url: 'https://vimeo.com/188175573'
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
    const {data} = this.props
    const demos = data.demos.edges.map(item => item.node)
    const features = data.features.edges.map(item => item.node)

    return (
      <Main>
        <NavBar bg='white' color='black50' py={1} mx='auto' />
        <WaveSection bg='#FAFBFC' mt={5} id='home' data={this.state.data.image}>
          <Container px={[0, '310px']} pt={3}>
            <Flex is='section' justify='center' direction='column' align='center'>
              <Flex justify='center' direction='column' align='center' py={3}>
                <CustomHeading f={[5, 6]} pb={2} color='#222' bold>
                  Microlink <Logo ml={1} width={['32px', '48px']} />
                </CustomHeading>
                <CustomSubhead f={[3, 4]}>
                  Get relevant information from any website.
                </CustomSubhead>
              </Flex>
              <SearchBox
                bg='white'
                width={['80%', '100%']}
                my={3}
                loading={this.state.loading}
                placeholder={URL_FALLBACK}
                value={this.state.url !== URL_FALLBACK ? this.state.url : null}
                onChange={this.setUrl}
              />
            </Flex>
          </Container>

          <Box py={5}>
            <Flex is='section' justify='center' direction='column' align='center'>
              <Text pb={2} f={1} color='gray8'>
                Click to see it in action →
              </Text>
            </Flex>

            <Container>
              <DemoLinks
                pt={[2, 3]} px={[3, 6]}
                links={demos}
                onClick={({url}) => this.setUrl(url)}
              />
            </Container>
          </Box>

          <Container bg='transparent' pt={3} pb={4} px={3}>
            <CodeCard
              data={this.state.data}
              bg='transparent'
              py={[0, 4]} px={[0, 5]}
              onChange={data => this.setState({ data: JSON.parse(data) })}
            />

          </Container>
        </WaveSection>

        <Section bg='#FAFBFC'>
          <Container p={[2, 5]}>
            <ContentFeature direction='right'>
              <Subhead f={[4, 5]} py={4}>Extract data from any website</Subhead>

              <Text f='18px' py={3} pl={'64px'}>
                Enter an URL, receive information. Easy peasy.
              </Text>

              <Text f='18px' py={3} pl={'64px'}>
                You can obtain well structured and normalized data from practically any website, just providing the <Link to='https://docs.microlink.io/#url' external>url</Link>.
              </Text>

              <Text f='18px' py={3} pl={'64px'}>
                We also have <Link to='https://docs.microlink.io/#prerender' external>prerendering</Link> for get information from client side applications.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <Section bg='#FAFBFC'>
          <Container p={[2, 5]}>
            <ContentFeature direction='right'>
              <Subhead f={[4, 5]} py={4}>Build rich media embeds</Subhead>

              <Text f='18px' py={3} pl={'64px'}>
                No matters if you are a newspaper, tech writter or just have a personal blog.
              </Text>

              <Text f='18px' py={3} pl={'64px'}>
                Improve your social content engagement using adaptative UIs for any media.
              </Text>

              <Text f='18px' py={3} pl={'64px'}>
                We provide you <Link to='https://docs.microlink.io/#palette' external>palette</Link> schema per each image detected using our <Link to='https://docs.microlink.io' external>API</Link>.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <GradientSection>
          <Container p={[2, 6]}>
            <Flex justify='center' align='center' direction='column'>
              <ButtonOutline
                fontSize={2}
                style={{cursor: 'pointer'}}
                color='white'
                children='API Documentation'
              />
            </Flex>
          </Container>
        </GradientSection>

        <Section bg='#FAFBFC'>
          <Container p={[2, 5]}>
            <ContentFeature direction='right'>
              <Subhead f={[4, 5]} py={4}>Take screenshots</Subhead>

              <Text f='18px' py={3} pl={'64px'}>
                Automate <Link to='https://docs.microlink.io/#screenshot' external>screenshots</Link> of any website, displaying them anywhere.
              </Text>

              <Text f='18px' py={3} pl={'64px'}>
                Capture easily partial or full page snapshots, without complications.
              </Text>

              <Text f='18px' py={3} pl={'64px'}>
                You can also emulate specific <Link to='https://docs.microlink.io/#device-emulation' external>devices</Link> or adapt the viewport.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <Section bg='#FAFBFC'>
          <Container p={[2, 5]}>
            <ContentFeature direction='right'>
              <Subhead f={[4, 5]} py={4}>Embed in your markup</Subhead>

              <Text f='18px' py={3} pl={'64px'}>
                The integration of third parties more simple and universal without effort.
              </Text>

              <Text f='18px' py={3} pl={'64px'}>
                You can <Link to='https://docs.microlink.io/#embed' external>embed</Link> the API calls directly in your HTML markup.
              </Text>

              <Text f='18px' py={3} pl={'64px'}>
                Zero overhead. No dependencies.
              </Text>
            </ContentFeature>
          </Container>
        </Section>

        <Section bg='white' id='features'>
          <Separator py={4} title='Features' />
          <Container p={[0, 5]}>
            <ContentGrid data={features} itemsPerRow={3} />
          </Container>
        </Section>

        <Section bg='white' id='pricing' py={[3, 4]}>
          <Separator title='Pricing' py={3} />
          <Container py={[3, 4]}>
            <PricingTable />
          </Container>
        </Section>

        <Section bg='#FAFBFC'>
          <Footer mx={-2} py={[3, 4]} px={[3, 7]} />
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
