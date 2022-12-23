import { Choose, Box, Container, Flex, Link, Text } from 'components/elements'
import { getActiveRouteName } from 'components/patterns/Aside/constants'
import Markdown, { H1, ProBadge } from 'components/markdown'
import { Layout, Aside } from 'components/patterns'
import { fontSizes, colors, layout } from 'theme'
import { cdnUrl, formatDate } from 'helpers'
import React from 'react'

const DocTemplate = ({ meta, content, githubUrl, ...props }) => {
  const activeRouteName = getActiveRouteName(props.location)

  return (
    <Layout
      head={{
        image: cdnUrl('banner/docs.jpeg'),
        name: 'Microlink Docs',
        title: `${meta.name} ${activeRouteName}: ${meta.title}`
      }}
      footer={false}
    >
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
                  {meta.isPro && <ProBadge top='12px' ml={2} />}
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
