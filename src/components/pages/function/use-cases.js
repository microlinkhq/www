import React from 'react'

import { ProductUseCases } from 'components/patterns/UseCaseStory'
import { Subhead } from 'components/patterns/ProductStory'

const FUNCTION_USE_CASES = [
  'scraping/run-puppeteer-without-chrome',
  'scraping/npm-packages-remotely',
  'scraping/load-more-and-pagination'
]

export const FunctionUseCases = () => (
  <ProductUseCases
    vertical='scraping'
    slugs={FUNCTION_USE_CASES}
    title={<Subhead titleize={false}>Browser code, in practice.</Subhead>}
    caption='Puppeteer without hosting Chrome, npm packages on any URL and Load more buttons. Each use case shows the function to run and the limits to plan for.'
  />
)
