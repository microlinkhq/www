import { theme } from 'theme'
import React from 'react'

import { ProductUseCases } from 'components/patterns/UseCaseStory'

import { ACCENT, Subhead } from './shared'

export const UseCases = () => (
  <ProductUseCases
    vertical='website-to-pdf'
    title={
      <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
        One document problem,{' '}
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
    caption='Invoices behind a login, clean print layouts, paper sizes, download links, archives and bulk generation. Each use case shows the exact options and the code to run.'
  />
)
