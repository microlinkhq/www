import { FetchProvider, Layout } from 'components/patterns'
import { useQueryState } from 'components/hook'
import humanizeUrl from 'humanize-url'
import { proxyImage } from 'helpers'
import { getDomain } from 'tldts'
import React from 'react'

import Examples from 'components/pages/insights/examples'

export default () => {
  const [query] = useQueryState()
  const title = 'Turn websites into a insights'

  const suggestions = [
    'https://kikobeats.com',
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

  const fallbackUrl = proxyImage(
    'https://cdn.microlink.io/logo/lighthouse.png',
    {
      w: 400,
      output: 'jpg',
      bg: 'white'
    }
  )

  const image = query.url
    ? `https://unavatar.now.sh/${getDomain(query.ur)}?fallback=${fallbackUrl}`
    : fallbackUrl

  return (
    <Layout title={title} image={image}>
      <FetchProvider mqlOpts={{ meta: false, insights: true }}>
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
