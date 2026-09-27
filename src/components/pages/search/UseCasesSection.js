import { theme } from 'theme'
import React from 'react'

import Subhead from 'components/elements/Subhead'

import { ProductUseCases } from 'components/patterns/UseCaseStory'

const UseCasesSection = () => (
  <ProductUseCases
    vertical='search-api'
    title={
      <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
        One search job, one recipe.
      </Subhead>
    }
    caption='News monitoring, Google Shopping prices, Maps leads, rank tracking, Scholar and live search for LLMs. Each use case shows the query options and the code to run.'
  />
)

export default UseCasesSection
