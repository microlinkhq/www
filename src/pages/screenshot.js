import { useQueryState } from 'components/hook'
import { Layout, FetchProvider } from 'components/patterns'
import { Location } from '@reach/router'
import humanizeUrl from 'humanize-url'
import React from 'react'

import { screenshots } from 'components/pages/home/screenshots'
import Examples from 'components/pages/screenshot/examples'
// import Template from 'components/pages/screenshot/template'

import demoLinks from '../../data/demo-links'

export default () => {
  const [query] = useQueryState()

  const suggestions = screenshots.map(({ id }) => {
    const { data } = demoLinks.find(item => item.id === id)
    const { url } = data
    return { value: humanizeUrl(url) }
  })

  return (
    <Layout>
      <FetchProvider mqlOpts={{ screenshot: true }}>
        {({ status, doFetch, data }) => (
          <>
            <Location>
              {({ location }) => {
                if (location.search !== '' && data && status === 'fetched') {
                  return '<Template data={data} />'
                }

                return (
                  <Examples
                    suggestions={suggestions}
                    onSubmit={doFetch}
                    query={query}
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
