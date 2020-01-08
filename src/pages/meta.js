import { useDemoLinks, useQueryState } from 'components/hook'
import { Layout, FetchProvider } from 'components/patterns'
import { cdnUrl, metaUrl } from 'helpers'
import { Location } from '@reach/router'
import humanizeUrl from 'humanize-url'
import React from 'react'

import Examples from 'components/pages/meta/examples'
import Template from 'components/pages/meta/template'

export default () => {
  const demoLinks = useDemoLinks()
  const demoLink = demoLinks.find(demoLink => demoLink.id === 'youtube')

  const [query] = useQueryState()
  const title = 'Turns websites into data'
  const image = query.url ? metaUrl(query.url) : cdnUrl('www/meta.png')

  const suggestions = [
    'instagram',
    'soundcloud',
    'spotify',
    'theverge',
    'youtube'
  ].map(id => {
    const { data } = demoLinks.find(item => item.id === id)
    const { url } = data
    return { id, value: humanizeUrl(url), url, data }
  })

  return (
    <Layout title={title} image={image}>
      <FetchProvider
        mqlOpts={{ palette: true, audio: true, video: true, iframe: true }}
      >
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
                    demoLink={demoLink}
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
