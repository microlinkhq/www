import React from 'react'
import { cdnUrl } from 'helpers'

import Template from 'components/pages/screenshot/template'
import { useSiteMetadata } from 'components/hook'
import { Layout } from 'components/patterns'

export default ({ pageContext }) => {
  const { data, slug, id } = pageContext

  const metadata = useSiteMetadata()
  const meta = {
    url: `${metadata.siteUrl}${slug}`,
    title: `Screenshot for ${data.publisher}`,
    image: cdnUrl(`screenshot/${id}.png`)
  }

  return (
    <Layout {...meta}>
      <Template data={data} id={id} />
    </Layout>
  )
}
