import React from 'react'
import {
  Camera,
  FileText,
  Filter,
  Play,
  Printer,
  Search,
  Tag
} from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import ArrowLink from 'components/patterns/ArrowLink'
import UseCaseSwitcher from 'components/patterns/UseCaseSwitcher'
import { PANELS } from 'components/pages/home/examples-panels'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'

import {
  DOCS_URL,
  REPOSITORY_URL,
  Section,
  SectionHeader
} from 'components/pages/sdk/shared'

import { theme } from 'theme'

const PANEL_ICONS = {
  screenshot: Camera,
  pdf: Printer,
  metadata: Tag,
  markdown: FileText,
  search: Search,
  function: Play,
  extract: Filter
}

const EXAMPLE_PANELS = PANELS.filter(panel => PANEL_ICONS[panel.id]).map(
  panel => ({ ...panel, icon: PANEL_ICONS[panel.id] })
)

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
      <UseCaseSwitcher
        baseId='sdk-examples'
        selectLabel='Choose an example'
        tablistLabel='Examples'
        panels={EXAMPLE_PANELS}
      />
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
