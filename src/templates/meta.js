import Template from 'components/pages/meta/template'
import { useSiteMetadata } from 'components/hook'
import { Layout } from 'components/patterns'
import { getDomain } from 'tldts'
import React from 'react'

export default ({ pageContext }) => {
  const { data, slug, id } = pageContext

  const metadata = useSiteMetadata()
  const meta = {
    url: `${metadata.siteUrl}${slug}`,
    title: `Turn ${getDomain(data.url)} into structured data`
  }

  return (
    <Layout {...meta}>
      <Template data={data} id={id} />
    </Layout>
  )
}
