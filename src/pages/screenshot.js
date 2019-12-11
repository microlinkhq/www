import { useDemoLinks, useQueryState } from 'components/hook'
import { Layout, FetchProvider } from 'components/patterns'
import { metaUrl, cdnUrl } from 'helpers'
import { Location } from '@reach/router'
import humanizeUrl from 'humanize-url'
import React from 'react'

import Examples from 'components/pages/screenshot/examples'
import Template from 'components/pages/screenshot/template'

import { screenshots } from 'components/pages/home/screenshots'

export default () => {
  const demoLinks = useDemoLinks()
  const [query] = useQueryState()
  const title = 'Take a screenshot of any website'
  const image = query.url ? metaUrl(query.url) : cdnUrl('page/screenshot.png')

  const suggestions = screenshots.map(({ id, filename, cdnUrl }) => {
    const { url } = demoLinks.find(link => link.id === id).data
    return {
      cdnUrl,
      filename,
      id,
      url,
      value: humanizeUrl(url)
    }
  })

  return (
    <Layout title={title} image={image}>
      <FetchProvider mqlOpts={{ screenshot: true }}>
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
