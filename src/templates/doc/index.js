import { getActiveRouteName } from 'components/patterns/Aside/constants'
import { Layout, Aside } from 'components/patterns'
import Markdown, { H1 } from 'components/markdown'
import { fontSizes, colors, layout } from 'theme'
import { formatDate } from 'helpers'
import React from 'react'

import {
  Choose,
  Badge,
  Box,
  Container,
  Flex,
  Link,
  Script,
  Text,
  Tooltip
} from 'components/elements'

const DocTemplate = ({ meta, content, githubUrl, ...props }) => {
  const activeRouteName = getActiveRouteName(props.location)

  return (
    <Layout
      footer={false}
      title={`${meta.name} ${activeRouteName}: ${meta.title}`}
      name='Microlink Docs'
    >
      <Script async src='https://embed.runkit.com' />
      <Container
        pt={[0, 0, 0, 4]}
        ml={[3, 3, 3, 'auto']}
        mr={[3, 3, 3, 'auto']}
        px={0}
        maxWidth={layout.large}
      >
        <Aside activeRouteName={activeRouteName}>
          <Choose>
            <Choose.When condition={!!meta.title}>
              <Text as='header'>
                <H1
                  mt={[0, 0, 0, `calc(-1 * ${fontSizes[2]})`]}
                  variant={null}
                  mb={1}
                  slug={false}
                >
                  <span>{meta.title}</span>
                  {meta.isPro && (
                    <Tooltip
                      ml={2}
                      display='inline'
                      content='This feature is only for pro plans.'
                    >
                      <Badge>PRO</Badge>
                    </Tooltip>
                  )}
                </H1>
              </Text>
            </Choose.When>
            <Choose.Otherwise>
              <Box mt={4} />
            </Choose.Otherwise>
          </Choose>
          <Markdown>{content}</Markdown>
          <Flex
            as='footer'
            borderTop={1}
            borderColor={colors.black05}
            justifyContent='space-between'
            my={4}
            pt={4}
          >
            <Text color='gray' fontSize={0}>
              Last Edited on {formatDate(meta.date)}
            </Text>
            <Link href={githubUrl} fontSize={0}>
              Edit on GitHub
            </Link>
          </Flex>
        </Aside>
      </Container>
    </Layout>
  )
}

export default DocTemplate
