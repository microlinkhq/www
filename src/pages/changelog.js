import { Meta, Container, Heading, Box } from 'components/elements'
import { Caption, Layout } from 'components/patterns'
import Markdown, { H1 } from 'components/markdown'
import { useChangelog } from 'components/hook'
import { cdnUrl } from 'helpers'
import { layout, theme } from 'theme'
import React from 'react'

export const Head = () => (
  <Meta
    description='We’re constantly improving the platform. See here notable changes in our lineup of products & improvements over the time.'
    image={cdnUrl('banner/changelog.jpeg')}
  />
)

const ChangelogPage = () => {
  const changelog = useChangelog()

  return (
    <Layout>
      <Container
        css={theme({
          pt: [2, null, 3],
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Heading css={{ maxWidth: layout.large }}>Changelog</Heading>
        <Caption
          forwardedAs='h2'
          css={theme({
            pt: [3, null, 4],
            mb: ['-16px', null, '-32px'],
            px: [4, null, 0],
            maxWidth: layout.small
          })}
          titleize={false}
        >
          We’re constantly improving the platform. See here notable changes in
          our lineup of products & improvements over the time.
        </Caption>
        <Box css={theme({ pt: [3, null, 4] })}>
          {changelog.map(({ date, notes }) => {
            return (
              <Box key={date}>
                <H1 forwardedAs='h3'>{date}</H1>
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
