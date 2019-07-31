import { Layout, GraphqlEditor, Header } from 'components/patterns'
import { Box, Container } from 'components/elements'
import { useSiteMetadata } from 'components/hook'
import { aspectRatio } from 'helpers'
import React from 'react'

export default () => {
  const { apiEndpoint } = useSiteMetadata()
  const graphqlEndpoint = `${apiEndpoint}/graphql`
  const title = 'Microlink for GraphQL'
  const subtitle = 'Turn interrnet into a graph'
  const image = ''

  return (
    <Layout title={title} image={image}>
      <Container px={4} pt={5}>
        <Header subtitle={title} caption={subtitle} />
      </Container>
      <Box
        p={0}
        as='section'
        mx='auto'
        maxWidth={aspectRatio.widths}
        height={aspectRatio.heights}
      >
        <GraphqlEditor graphqlEndpoint={graphqlEndpoint} />
      </Box>
    </Layout>
  )
}
