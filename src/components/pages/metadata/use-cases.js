import { theme } from 'theme'
import React from 'react'

import { ProductUseCases } from 'components/patterns/UseCaseStory'

import { ACCENT, Subhead } from './shared'

export const UseCases = () => (
  <ProductUseCases
    vertical='website-metadata'
    title={
      <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
        One metadata problem,{' '}
        <span
          css={theme({
            display: 'block',
            color: ACCENT,
            width: '100%',
            textAlign: 'left'
          })}
        >
          one recipe.
        </span>
      </Subhead>
    }
    caption='Custom fields, broken og:image fixes, single-page apps, brand colors, blocked sites and link previews at scale. Each use case shows the exact options and the code to run.'
  />
)
