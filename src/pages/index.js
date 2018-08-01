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
import { Grid } from 'components/patterns'
import { List, ListItem } from 'components/patterns/List'
import BrowserStats from 'components/icons/BrowserStats'

export default class extends Component {
  render () {
    const { data } = this.props
    const features = data.features.edges.map(item => item.node)

    return (
      <Fragment>
        <Box is='article'>
          <Container py={4}>
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
        </Box>
        <Box bg='#F5F4F9' is='article'>
          <Container py={[4, 6]}>
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
                  textAlign={['center', 'inherit']}
                  children='Turns any website into data'
                />
                <Text
                  textAlign={['center', 'inherit']}
                  maxWidth={['inherit', 6]}
                  mt={[1, 3]}
                  color='black80'
                  children='Microlink turns any website into useful structured data.'
                />
                <Hide breakpoints={[2, 3]}>
                  <Box textAlign='center'>
                    <BrowserStats py={4} width={5} />
                  </Box>
                </Hide>
                <List pl={[4, 0]} mt={4}>
                  <ListItem children='Works with any website.' />
                  <ListItem children='Detect complementary information (video, colors, dimensions, etc).' />
                  <ListItem children='Customize payload using Custom Rules.' />
                </List>
              </Flex>
              <Hide breakpoints={[0, 1]}>
                <Flex>
                  <BrowserStats width={6} transform={'translateY(-28px)'} />
                </Flex>
              </Hide>
            </Flex>
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
