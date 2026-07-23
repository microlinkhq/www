import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Subhead from 'components/elements/Subhead'

import { CodeInline } from 'components/markdown/CodeInline'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  BodyText,
  Eyebrow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

export const CodeExample = () => (
  <Section css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>Open source</Eyebrow>
      <Subhead css={theme({ textAlign: 'left' })}>
        Audit the detection layer yourself
      </Subhead>
      <BodyText css={theme({ pt: 3, pb: [3, 3, 4, 4] })}>
        The detection logic that powers Pro is open source as{' '}
        <CodeInline>is-antibot</CodeInline> — static HTTP response analysis with
        a minimal footprint, no headless browser required. Pass it any response
        and it tells you who blocked it. Works with{' '}
        <CodeInline>fetch</CodeInline>, <CodeInline>got</CodeInline>,{' '}
        <CodeInline>axios</CodeInline>, or <CodeInline>undici</CodeInline>.
      </BodyText>

      <CodeEditor
        title='index.js'
        language='javascript'
        css={theme({ width: '100%' })}
      >
        {`import isAntibot from 'is-antibot'

const response = await fetch('https://example.com')

const { detected, provider, detection } = isAntibot({
  headers: response.headers,
  statusCode: response.status,
  html: await response.text(),
  url: response.url
})

if (detected) {
  console.log(\`Blocked by \${provider} (via \${detection})\`)
  // => "Blocked by CloudFlare (via headers)"
}`}
      </CodeEditor>

      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='https://github.com/microlinkhq/is-antibot'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2]
          })}
        >
          View is-antibot on GitHub
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)
