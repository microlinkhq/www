import React from 'react'
import { useSiteMetadata } from 'components/hook'

import Template from 'components/pages/screenshot/template'

import { Layout } from 'components/patterns'

export default ({ pageContext }) => {
  const { data, slug, brand } = pageContext

  const metadata = useSiteMetadata()
  const meta = {
    url: `${metadata.siteUrl}${slug}`,
    title: `Screenshot for ${data.publisher}`,
    image: `https://cdn.microlink.io/screenshot/browser/light/${brand.toLowerCase()}.png`
  }

  return (
    <Layout {...meta}>
      <Template data={data} brand={brand} />
    </Layout>
  )
}
