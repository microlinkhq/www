import React from 'react'
import { useSiteMetadata } from 'components/hook'
import Template from 'components/pages/embed/template'
import { Layout } from 'components/patterns'
import { metaUrl } from 'helpers'

export default ({ pageContext }) => {
  const { data, slug, id } = pageContext

  const metadata = useSiteMetadata()
  const meta = {
    url: `${metadata.siteUrl}${slug}`,
    title: `Embed for ${data.publisher}`,
    image: metaUrl(data.url)
  }

  return (
    <Layout {...meta}>
      <Template data={data} id={id} />
    </Layout>
  )
}
