import React from 'react'
import { editorTemplateHref } from 'components/pages/editor/shared'
import { FunctionExampleCard } from 'components/pages/function/examples-grid'
import { withContainer } from 'helpers/hoc/with-container'

export const EditorCard = ({ template, title, code }) => (
  <withContainer.Container>
    <FunctionExampleCard
      href={editorTemplateHref(template)}
      title={title}
      code={code}
    />
  </withContainer.Container>
)
