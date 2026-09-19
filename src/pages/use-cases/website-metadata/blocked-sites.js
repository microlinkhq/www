import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  UseCaseLanding,
  useCaseStructured
} from 'components/patterns/UseCaseStory'

import { CONTENT } from 'components/pages/use-cases/website-metadata/blocked-sites'

const UseCaseMetadataBlockedSitesPage = () => <UseCaseLanding content={CONTENT} />

export const Head = () => (
  <Meta
    title={CONTENT.head.title}
    description={CONTENT.head.description}
    schemaType='TechArticle'
    structured={useCaseStructured(CONTENT)}
  />
)

export default UseCaseMetadataBlockedSitesPage
