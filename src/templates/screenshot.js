import React from 'react'

import Template from 'components/pages/screenshot/template'
import { useSiteMetadata } from 'components/hook'
import { Layout } from 'components/patterns'
import { getDomain } from 'tldts'

export default ({ pageContext }) => {
  const { data, slug, id } = pageContext
  const metadata = useSiteMetadata()
  const meta = {
    url: `${metadata.siteUrl}${slug}`,
    title: `Turn ${getDomain(data.url)} into screenshots`
  }

  return (
    <Layout {...meta}>
      <Template data={data} id={id} />
    </Layout>
  )
}
