/* global graphql */

import {Box, Row, Column, Measure, Text, Avatar, Flex, Heading, Subhead} from 'rebass'
import styled, {css} from 'styled-components'
import { color, space } from 'styled-system'
import React, {Component} from 'react'
import chunk from 'lodash.chunk'

import {textGradient} from '../theme'
import Container from '../components/Container'
import Separator from '../components/Separator'
import SearchBox from '../components/SearchBox'
import CodeCard from '../components/CodeCard'

const CustomSubhead = Subhead.extend`
  ${textGradient} text-align: center;
  font-weight: normal;
  max-width: 40rem;
`

const floatAnimation = css`
  display: inline-block;
  vertical-align: middle;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  transition-duration: 0.3s;
  transition-property: transform;
  transition-timing-function: ease-out;

  &:hover {
    transform: translateY(-8px);
  }
`

const CustomAvatar = Avatar.extend`
  border-radius: 8px;
  box-shadow: 0 16px 24px 0 rgba(127, 120, 118, 0.1);
  cursor: pointer;
  ${floatAnimation};
`

const Section = styled.section`
${color}
${space}
`

const CustomMeasure = Measure.extend`
  max-width: 30rem;
`

const URL_FALLBACK = 'https://kikobeats.com'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {url: URL_FALLBACK}
  }

  getUrl (apiEndpoint, url) {
    return `${apiEndpoint}/?url=${url}&paletteColors`
  }

  render () {
    const url = this.state.url || URL_FALLBACK
    const {apiEndpoint, data} = this.props
    const demos = data.demos.edges.map(item => item.node)
    const features = data.features.edges.map(item => item.node)

    return (
      <main>
        <Section bg='#f7f8fa'>
          <Container px='310px' pt={3}>
            <Flex is='section' justify='center' direction='column' align='center' px={[7, 0]}>
              <Flex justify='center' direction='column' align='center' py={3}>
                <Heading f={6} pb={2} color='#222' bold>
                Microlink
              </Heading>
                <CustomSubhead f='36px'>Turns any link into information.</CustomSubhead>
              </Flex>
              <SearchBox
                bg='white'
                width={['100%', '60%']}
                my={3}
                placeholder={URL_FALLBACK}
                value={this.state.url === URL_FALLBACK ? null : this.state.url}
                onSubmit={url => this.setState({url})}
              />
              <Text py={2} f={1} color='#4B5663'>Enter an URL. Receive information.</Text>
            </Flex>
          </Container>

          <Container bg='#f7f8fa' pt={3} pb={5}>
            <CodeCard url={this.getUrl(apiEndpoint, url)} bg='#f7f8fa' p={5} />
            <Flex width='100%' justify='space-around' py={3}>
              {demos.map((item, index) => (
                <CustomAvatar
                  key={index}
                  size={64}
                  src={item.favicon}
                  onClick={evt => {
                    evt.preventDefault()
                    this.setState({url: item.url})
                  }}
              />
            ))}
            </Flex>
          </Container>
        </Section>

        <Section bg='white'>
          <Separator
            py={4}
            title='Put your links in context'
            text={
              <CustomMeasure f={2}>
                We offer a simple <a href='#'>API</a> microservice to extract useful information from whatever internet link. Just call it.
              </CustomMeasure>
            }
          />

          <Container px={5} py={5}>
            {chunk(features, 3).map((row, index) => (
              <Row key={index} pb={4}>
                {row.map(({title, description}, index) => (
                  <Column key={index} style={{textAlign: 'center'}}>
                    <Avatar
                      size={54}
                      src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
                    />
                    <Box py={3}>
                      <Subhead f={3} py={3} bold>
                        {title}
                      </Subhead>
                      <Measure color='#4B5663'>{description}</Measure>
                    </Box>
                  </Column>
                ))}
              </Row>
            ))}
          </Container>
        </Section>
      </main>
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
    features: allFeaturesYaml {
      edges {
        node {
          title
          description
        }
      }
    }
  }
`
