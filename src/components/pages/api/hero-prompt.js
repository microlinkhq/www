import React from 'react'
import { theme } from 'theme'
import { mqlCode } from 'helpers/mql-code'

import Box from 'components/elements/Box'
import Terminal from 'components/elements/Terminal/Terminal'
import SeoCodeSnippets from 'components/patterns/MultiCodeEditor/interactive/seo-code-snippets'
import { InstallPanel } from 'components/pages/ai/install-panel'
import { INSTALL_PROMPT } from 'components/pages/ai/shared'

import { HERO_EXAMPLES } from './shared'

const seoSource = HERO_EXAMPLES.find(example => example.mqlCode)
const { url: seoUrl, ...seoOpts } = seoSource.mqlCode
const seoSnippets = mqlCode(seoUrl, seoOpts)

export const HeroPrompt = ({ tabs, labelledBy }) => (
  <>
    <Box css={theme({ width: '100%' })}>
      <Terminal
        blinkCursor={false}
        text={INSTALL_PROMPT}
        headerContent={tabs}
        contentId='api-hero-editor'
        contentRole='tabpanel'
        contentLabelledBy={labelledBy}
        role='application'
        aria-label='Prompt to start using the Microlink API'
        css={theme({ width: '100%' })}
      >
        <InstallPanel />
      </Terminal>
    </Box>
    <SeoCodeSnippets
      codeSnippets={seoSnippets}
      url={seoUrl}
      mqlOpts={seoOpts}
    />
  </>
)
