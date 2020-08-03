import { Container, Heading, Flex, Box } from 'components/elements'
import { Caption, Layout } from 'components/patterns'
import Markdown, { H2 } from 'components/markdown'
import { useChangelog } from 'components/hook'
import { layout } from 'theme'
import React from 'react'

export default ({ meta }) => {
  const changelog = useChangelog()

  return (
    <Layout {...meta}>
      <Container pt={5} justifyContent='center' alignItems='center'>
        <Heading maxWidth={layout.large} children='Changelog' />
        <Caption
          pt={[3, 3, 4, 4]}
          px={[4, 4, 0, 0]}
          titleize={false}
          maxWidth={layout.small}
          children='We’re constantly improving the platform. See here notable changes in our lineup of products & improvements over the time.'
        />
        <Flex
          pt={[3, 3, 4, 4]}
          swidth='100%'
          maxWidth={layout.large}
          flexDirection='column'
        >
          {changelog.map(({ date, notes }) => {
            return (
              <Box key={date}>
                <H2 children={date} />
                <Markdown
                  children={notes.map(note => `- ${note}`).join('\n')}
                />
              </Box>
            )
          })}
        </Flex>
      </Container>
    </Layout>
  )
}
