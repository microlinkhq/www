import { useSiteMetadata } from 'components/hook'
import { layout } from 'theme'
import React from 'react'

import { Layout, GraphqlEditor, Header } from 'components/patterns'
import { Box, Container } from 'components/elements'

const getRatio = width => (width * 9) / 16

const WIDTH = [0.4, 0.6, 0.8, 1].map(n => n * layout.medium)
const HEIGHT = WIDTH.map(getRatio)

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
      <Box p={0} as='section' mx='auto' maxWidth={WIDTH} height={HEIGHT}>
        <GraphqlEditor graphqlEndpoint={graphqlEndpoint} />
      </Box>
    </Layout>
  )
}
