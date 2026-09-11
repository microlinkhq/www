import React from 'react'

import Meta from 'components/elements/Meta/Meta'
import Editor from 'components/pages/editor'
import Layout from 'components/patterns/Layout'
import { theme } from 'theme'

import { META, STRUCTURED } from 'components/pages/editor/shared'

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={STRUCTURED}
  />
)

const EditorPage = () => (
  <Layout
    footer={false}
    css={theme({
      mt: 0,
      px: [3, 3, 3, 3],
      pb: 3,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      height: '100dvh',
      overflow: 'hidden',
      bg: 'gray1'
    })}
  >
    <Editor />
  </Layout>
)

export default EditorPage
