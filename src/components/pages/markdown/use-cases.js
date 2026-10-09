import { theme } from 'theme'
import React from 'react'

import { ProductUseCases } from 'components/patterns/UseCaseStory'

import { Subhead } from './shared'

export const UseCases = () => (
  <ProductUseCases
    vertical='website-to-markdown'
    title={
      <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
        One conversion problem,{' '}
        <span
          css={theme({
            display: 'block',
            color: 'orange7',
            width: '100%',
            textAlign: 'left'
          })}
        >
          one recipe.
        </span>
      </Subhead>
    }
    caption='Frontmatter metadata, content-only conversions, LLM context, office documents, YouTube transcripts and more. Each use case shows the exact options and the code to run.'
  />
)
