import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  VerticalHub,
  getVertical,
  verticalStructured
} from 'components/patterns/UseCaseStory'

const VERTICAL = getVertical('search-api')

const SearchApiUseCasesPage = () => <VerticalHub vertical={VERTICAL} />

export const Head = () => (
  <Meta
    title={VERTICAL.hub.title}
    description={VERTICAL.hub.description}
    schemaType='WebPage'
    structured={verticalStructured(VERTICAL)}
  />
)

export default SearchApiUseCasesPage
