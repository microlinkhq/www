import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import ArrowLink from 'components/patterns/ArrowLink'
import ExamplesSwitcher from 'components/patterns/ExamplesSwitcher'
import { PANELS } from 'components/pages/home/examples-panels'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'

import {
  DOCS_URL,
  REPOSITORY_URL,
  Section,
  SectionHeader
} from 'components/pages/sdk/shared'

import { theme } from 'theme'

const Examples = () => (
  <Section id='examples'>
    <SectionHeader
      title='See it run.'
      caption='Real calls, real responses — switch products without changing shape.'
    />
    <Box
      css={theme({
        maxWidth: HOME_CONTENT_WIDTH,
        mx: 'auto',
        mt: [4, 4, 5, 5],
        width: '100%'
      })}
    >
      <ExamplesSwitcher panels={PANELS} visibleTabs={5} />
    </Box>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        justifyContent: 'center',
        fontSize: [2, 2, 3, 3]
      })}
    >
      <ArrowLink css={theme({ pr: [2, 4, 4, 4] })} href={DOCS_URL}>
        Read the docs
      </ArrowLink>
      <ArrowLink href={REPOSITORY_URL}>View on GitHub</ArrowLink>
    </Flex>
  </Section>
)

export default Examples
