import { Container, Heading, Box } from 'components/elements'
import { Caption, Layout } from 'components/patterns'
import Markdown, { H2 } from 'components/markdown'
import { useChangelog } from 'components/hook'
import { layout } from 'theme'
import React from 'react'

const ChangelogPage = ({ meta }) => {
  const changelog = useChangelog()

  return (
    <Layout {...meta}>
      <Container pt={[2, 2, 3, 3]} justifyContent='center' alignItems='center'>
        <Heading maxWidth={layout.large}>Changelog</Heading>
        <Caption
          pt={[3, 3, 4, 4]}
          mb={['-16px', '-16px', '-32px', '-32px']}
          px={[4, 4, 0, 0]}
          titleize={false}
          maxWidth={layout.small}
        >
          We’re constantly improving the platform. See here notable changes in
          our lineup of products & improvements over the time.
        </Caption>
        <Box pt={[3, 3, 4, 4]}>
          {changelog.map(({ date, notes }) => {
            return (
              <Box key={date}>
                <H2>{date}</H2>
                <Markdown>{notes.map(note => `- ${note}`).join('\n')}</Markdown>
              </Box>
            )
          })}
        </Box>
      </Container>
    </Layout>
  )
}

export default ChangelogPage
