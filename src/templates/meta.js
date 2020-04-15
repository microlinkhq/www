import React from 'react'
import { useSiteMetadata } from 'components/hook'
import Template from 'components/pages/meta/template'
import { Layout } from 'components/patterns'
import { metaUrl } from 'helpers'

export default ({ pageContext }) => {
  const { data, slug, id } = pageContext

  const metadata = useSiteMetadata()
  const meta = {
    url: `${metadata.deployUrl}${slug}`,
    title: `meta for ${data.publisher}`,
    image: metaUrl(data.url)
  }

  return (
    <Layout {...meta}>
      <Template data={data} id={id} />
    </Layout>
  )
}
