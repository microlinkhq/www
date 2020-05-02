import { FetchProvider, Layout } from 'components/patterns'
import { useQueryState } from 'components/hook'
import humanizeUrl from 'humanize-url'
import React from 'react'

import Examples from 'components/pages/pdf/examples'

export default () => {
  const [query] = useQueryState()

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
    <Layout>
      <FetchProvider mqlOpts={{ meta: false, pdf: true }}>
        {({ status, doFetch, data }) => {
          return (
            <Examples
              data={data}
              onSubmit={doFetch}
              isLoading={status === 'fetching'}
              suggestions={suggestions}
              query={query}
            />
          )
        }}
      </FetchProvider>
    </Layout>
  )
}
