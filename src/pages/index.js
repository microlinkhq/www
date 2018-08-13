import is from 'styled-is'
import React, { Fragment, Component } from 'react'
import { transition, space } from 'theme'
import styled from 'styled-components'
import { BlockLink } from 'rebass'
import {
  Text,
  Subhead,
  Box,
  Caps,
  Heading,
  Lead,
  Card,
  Flex,
  Container,
  Hide
} from 'components/elements'
import { PricingTable, Grid } from 'components/patterns'
import { List, ListItem } from 'components/patterns/List'
import {
  Working,
  BrowserStats,
  DesignProcess,
  Frameworks
} from 'components/icons'

const CapsIcon = styled(Caps)`
  transition: margin-left ${transition.medium};

  ${is('hover')`
  margin-left: ${space[2]}px;
`};
`

CapsIcon.defaultProps = {
  blacklist: [...Object.keys(Caps.propTypes), 'hover']
}

const CardTitle = ({ children, hover }) => (
  <Text my={27}>
    <Caps
      is='span'
      fontWeight='bold'
      color='secondary'
      fontSize={2}
      children={children}
    />
    <CapsIcon
      is='span'
      fontWeight='bold'
      color='secondary'
      fontSize={2}
      ml={1}
      children='→'
      hover={hover}
    />
  </Text>
)

const CardLink = class extends Component {
  state = { hover: false }
  mouseOut = () => this.setState({ hover: false })
  onMouseOver = () => this.setState({ hover: true })
  render () {
    const {
      iconComponent: IconComponent,
      title,
      description,
      href
    } = this.props
    const { hover } = this.state
    return (
      <BlockLink
        href={href}
        onMouseOut={this.mouseOut}
        onMouseOver={this.onMouseOver}
      >
        <Card py={[47.6, 56]} px={4} width={[314.5, 370]} height={[400, 420]}>
          <Flex
            justifyContent='space-between'
            alignItems='center'
            flexDirection='column'
            style={{ height: '100%' }}
          >
            <IconComponent width='100%' />
            <CardTitle children={title} hover={hover} />
            <Text
              fontSize={15}
              textAlign='center'
              color='black80'
              lineHeight={3}
              children={description}
            />
          </Flex>
        </Card>
      </BlockLink>
    )
  }
}

export default class extends Component {
  render () {
    const { data, paymentEndpoint, paymentApiKey, stripeKey } = this.props
    const features = data.features.edges.map(item => item.node)

    return (
      <Fragment>
        <Box is='article'>
          <Container is='section' py={4}>
            <Flex
              is='header'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              pb={5}
            >
              <Heading
                children='Extract structured data from any website'
                maxWidth='12em'
              />
              <Lead color='black50' children='Enter an URL, receive data.' />
            </Flex>
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
              pb={5}
            >
              <Heading children='Features' />
              <Lead color='black50' children='Our feature at a glance.' />
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
        <Box is='article'>
          <Container is='section' pt={4} pb={0}>
            <Flex
              is='header'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              pb={5}
            >
              <Heading children='Pricing' />
              <Lead color='black50' children='Pay as you go, cancel anytime' />
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
