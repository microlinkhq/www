import { useDemoLinks, useQueryState } from 'components/hook'
import { Layout, FetchProvider } from 'components/patterns'
import { Location } from '@reach/router'
import { screenshotUrl } from 'helpers'
import humanizeUrl from 'humanize-url'
import React from 'react'

import Examples from 'components/pages/screenshot/examples'
import Template from 'components/pages/screenshot/template'

export default () => {
  const demoLinks = useDemoLinks()
  const [query] = useQueryState()
  const title = 'Take a screenshot of any website'
  const image = query.url
    ? screenshotUrl(`https://microlink.io/screenshot?url=${query.url}`)
    : 'https://cdn.microlink.io/page/screenshot.png'

  const suggestions = [
    { theme: 'dark', brand: 'Apple' },
    { theme: 'light', brand: 'MDN' },
    { theme: 'light', brand: 'StackOverflow' },
    { theme: 'light', brand: 'ProductHunt' },
    { theme: 'dark', brand: 'Nasa' }
  ].map(item => {
    const { url } = demoLinks.find(link => link.brand === item.brand).data
    const id = item.brand.toLowerCase()
    const filename = `${id}.png`

    return {
      ...item,
      id,
      filename,
      url,
      value: humanizeUrl(url),
      cdnUrl: `https://cdn.microlink.io/website/browser/${item.theme}/${filename}`
    }
  })

  return (
    <Layout title={title} image={image}>
      <FetchProvider mqlOpts={{ screenshot: true, meta: false }}>
        {({ status, doFetch, data }) => (
          <>
            <Location>
              {({ location }) => {
                if (location.search !== '' && data && status === 'fetched') {
                  return <Template data={data} />
                }

                return (
                  <Examples
                    suggestions={suggestions}
                    demoLinks={demoLinks}
                    onSubmit={doFetch}
                    url={query.url}
                    isLoading={status === 'fetching'}
                  />
                )
              }}
            </Location>
          </>
        )}
      </FetchProvider>
    </Layout>
  )
}
