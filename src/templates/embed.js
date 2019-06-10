import React from 'react'
import { useSiteMetadata } from 'components/hook'

import Template from 'components/pages/embed/template'

import { Layout } from 'components/patterns'

export default ({ pageContext }) => {
  const { data, slug, brand } = pageContext

  const metadata = useSiteMetadata()
  const meta = {
    url: `${metadata.siteUrl}${slug}`,
    headline: `Embed for ${data.publisher}`,
    image: `https://cdn.microlink.io/brand/${brand.toLowerCase()}.jpeg`
  }

  return (
    <Layout {...meta}>
      <Template data={data} brand={brand} />
    </Layout>
  )
}
