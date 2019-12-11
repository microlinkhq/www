import React from 'react'
import { useSiteMetadata } from 'components/hook'
import Template from 'components/pages/embed/template'
import { Layout } from 'components/patterns'
import { cdnUrl } from 'helpers'

export default ({ pageContext }) => {
  const { data, slug, id } = pageContext

  const metadata = useSiteMetadata()
  const meta = {
    url: `${metadata.siteUrl}${slug}`,
    title: `Embed for ${data.publisher}`,
    image: cdnUrl(`embed/${id}.png`)
  }

  return (
    <Layout {...meta}>
      <Template data={data} id={id} />
    </Layout>
  )
}
