import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import {
  UseCaseLanding,
  useCaseStructured
} from 'components/patterns/UseCaseStory'

import { CONTENT } from 'components/pages/use-cases/website-metadata/missing-or-wrong-metadata'

const UseCaseMetadataMissingOrWrongPage = () => <UseCaseLanding content={CONTENT} />

export const Head = () => (
  <Meta
    title={CONTENT.head.title}
    description={CONTENT.head.description}
    schemaType='TechArticle'
    structured={useCaseStructured(CONTENT)}
  />
)

export default UseCaseMetadataMissingOrWrongPage
