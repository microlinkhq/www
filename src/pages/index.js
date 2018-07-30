import React, { Component } from 'react'
import { Heading, Lead, Flex, Container, Hide } from 'components/elements'

import { Grid } from 'components/patterns'

export default class extends Component {
  render () {
    const { data } = this.props
    const features = data.features.edges.map(item => item.node)

    return (
      <Container is='article' py={4}>
        <Flex
          is='header'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          pb={5}
        >
          <Heading pb={2} children={'Features'} />
          <Lead color='black50' children={'Our feature at a glance.'} />
        </Flex>
        <Hide breakpoints={[0, 1]}>
          <Grid children={features} itemsPerRow={3} />
        </Hide>
        <Hide breakpoints={[2, 3]}>
          <Grid children={features} itemsPerRow={1} />
        </Hide>
      </Container>
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
