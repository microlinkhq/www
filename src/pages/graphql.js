import { useSiteMetadata } from 'components/hook'
import React from 'react'

import { Layout, GraphqlEditor } from 'components/patterns'

import {
  Subhead,
  Flex,
  Input,
  Text,
  Box,
  ButtonSecondary,
  Container,
  Caps,
  Image
} from 'components/elements'

export default () => {
  const { apiEndpoint } = useSiteMetadata()
  const graphqlEndpoint = `${apiEndpoint}/graphql`
  const title = 'Microlink for GraphQL'
  const subtitle = 'What If the Internet Was Just One Graph?'
  const image = ''

  return (
    <Layout title={title} image={image}>
      <Container py={5} px={4}>
        <Subhead>{title}</Subhead>
      </Container>
      <Box as='section' mx='auto' maxWidth='80%'>
        <GraphqlEditor graphqlEndpoint={graphqlEndpoint} />
      </Box>
    </Layout>
  )
}
