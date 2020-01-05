import { useQueryState } from 'components/hook'
import { Layout } from 'components/patterns'
import humanizeUrl from 'humanize-url'
import { cdnUrl } from 'helpers'
import React from 'react'

import Examples from 'components/pages/pdf/examples'

export default () => {
  const [query] = useQueryState()
  const title = 'Get a PDF from any website'
  const image = cdnUrl('page/pdf.png')

  const suggestions = [
    'https://basecamp.com/shapeup/0.3-chapter-01',
    'https://blog.alexmaccaw.com/advice-to-my-younger-self',
    'https://css-tricks.com/snippets/css/a-guide-to-flexbox',
    'https://rauchg.com/2014/7-principles-of-rich-web-applications',
    'https://varnish-cache.org/docs/6.2/phk/thatslow.html'
  ].map(url => {
    return {
      url,
      value: humanizeUrl(url)
    }
  })

  return (
    <Layout title={title} image={image}>
      <Examples suggestions={suggestions} url={query.url} />
    </Layout>
  )
}
