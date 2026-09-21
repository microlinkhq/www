import { theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Eyebrow } from 'components/patterns/CustomerStory/chrome'
import {
  Figure,
  Section,
  SectionInner
} from 'components/patterns/CustomerStory/primitives'
import { sdkExample } from 'components/patterns/ExamplesSwitcher'

import { CodeBlock } from './code-block'
import { inline } from './inline-links'
import { ParamsList } from './params-list'
import { curlFor } from './request'
import { ACCENT } from '../use-cases'

const sourceOf = step => {
  if (step.sdk) return sdkExample(step.sdk)
  if (step.request) return curlFor(step.request)
  return step.code
}

const languageOf = step => step.language || (step.request ? 'bash' : 'js')

export const HowSection = ({ how }) => (
  <Section id='how-it-works' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How it works
      </Eyebrow>
      <Subhead css={theme({ textAlign: 'left' })}>{how.title}</Subhead>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        {inline(how.intro)}
      </Text>
      <Figure css={theme({ pb: 3 })}>
        <Flex
          css={theme({
            flexDirection: 'column',
            gap: [3, 3, 4, 4],
            alignItems: 'stretch'
          })}
        >
          {how.steps.map(step => (
            <CodeBlock
              key={step.label}
              step={step.label}
              language={languageOf(step)}
              note={step.note}
            >
              {sourceOf(step)}
            </CodeBlock>
          ))}
        </Flex>
      </Figure>
      {how.params && how.params.length > 0 && (
        <ParamsList params={how.params} />
      )}
      {how.outro && (
        <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
          {inline(how.outro)}
        </Text>
      )}
    </SectionInner>
  </Section>
)
