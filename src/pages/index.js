import {Text, Flex, Heading, Subhead} from 'rebass'
import styled from 'styled-components'
import { color, space } from 'styled-system'
import React, {Component} from 'react'

import PricingTable from '../components/PricingTable'
import FeatureList from '../components/FeatureList'
import Container from '../components/Container'
import Separator from '../components/Separator'
import SearchBox from '../components/SearchBox'
import DemoLinks from '../components/DemoLinks'
import CodeCard from '../components/CodeCard'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Logo from '../components/Logo'
import {textGradient} from '../theme'

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

const URL_FALLBACK = 'https://vimeo.com/188175573'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {url: URL_FALLBACK}
  }

  getUrl (apiEndpoint, url) {
    return `${apiEndpoint}/?url=${url}&palette`
  }

  render () {
    const url = this.state.url || URL_FALLBACK
    const {apiEndpoint, data} = this.props
    const demos = data.demos.edges.map(item => item.node)

    return (
      <Main>
        <NavBar bg='white' color='black' py={3} mx='auto' />
        <Section bg='#FAFBFC' pt={6} id='home'>
          <Container px={[0, '310px']} pt={3}>
            <Flex is='section' justify='center' direction='column' align='center'>
              <Flex justify='center' direction='column' align='center' py={3}>
                <CustomHeading f={[5, 6]} pb={2} color='#222' bold>
                  Microlink <Logo ml={1} width={'64px'} />
                </CustomHeading>
                <CustomSubhead f={['36px', 4]}>
                  Turns any link into information
                </CustomSubhead>
              </Flex>
              <SearchBox
                bg='white'
                width={['80%', '100%']}
                my={3}
                placeholder={URL_FALLBACK}
                value={this.state.url === URL_FALLBACK ? null : this.state.url}
                onSubmit={url => this.setState({url})}
              />
              <Text py={2} f={1} color='gray8'>Enter an URL. Receive information.</Text>
            </Flex>
          </Container>

          <Container bg='#FAFBFC' pt={3} pb={4}>
            <CodeCard url={this.getUrl(apiEndpoint, url)} bg='#FAFBFC' p={[3, 5]} />
            <DemoLinks
              links={demos}
              onClick={(event, item) => {
                event.preventDefault()
                this.setState({url: item.url})
              }}
            />
          </Container>
        </Section>

        <Section bg='#FAFBFC' pt={4} pb={5} id='features'>
          <FeatureList />
        </Section>

        <Section bg='white' id='pricing' py={4}>
          <Separator title='Pricing' />
          <Container py={4}>
            <PricingTable />
          </Container>
        </Section>

        <Section bg='#FAFBFC'>
          <Footer mx={-2} py={[3, 4]} px={[0, 7]} />
        </Section>

      </Main>
    )
  }
}

export const query = graphql`
  query LandingPage {
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
