import { Headline, Layout } from 'components/patterns'
import { Flex, Text, Box } from 'components/elements'
import Markdown, { H1 } from 'components/markdown'
import { useChangelog } from 'components/hook'
import { layout } from 'theme'
import React from 'react'

export default ({ meta }) => {
  const changelog = useChangelog()

  return (
    <Layout {...meta}>
      <Flex
        pt={[0, 0, 0, 3]}
        px={3}
        width='100%'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Headline title='Changelog' pb={3} />
        <Text
          fontSize={[2, 2, 2, 3]}
          mb={4}
          textAlign='center'
          maxWidth={10}
          children='We’re constantly improving the platform. See here notable changes in our lineup of products & improvements over the time.'
        />
        <Flex width='100%' maxWidth={layout.medium} flexDirection='column'>
          {changelog.map(({ date, notes }) => {
            console.log(notes)
            return (
              <Box key={date}>
                <H1 mb={0} children={date} />
                <Markdown
                  children={notes.map(note => `- ${note}`).join('\n')}
                />
              </Box>
            )
          })}
        </Flex>
      </Flex>
    </Layout>
  )
}
