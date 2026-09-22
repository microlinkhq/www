import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  IndustryHub,
  getIndustry,
  industryStructured
} from 'components/patterns/UseCaseStory'

const INDUSTRY = getIndustry('industries/sales-and-lead-enrichment')

const SalesAndLeadEnrichmentIndustryPage = () => <IndustryHub industry={INDUSTRY} />

export const Head = () => (
  <Meta
    title={INDUSTRY.head.title}
    description={INDUSTRY.head.description}
    schemaType='WebPage'
    structured={industryStructured(INDUSTRY)}
  />
)

export default SalesAndLeadEnrichmentIndustryPage
