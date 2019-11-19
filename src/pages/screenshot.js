import { useDemoLinks, useQueryState } from 'components/hook'
import { Layout, FetchProvider } from 'components/patterns'
import { Location } from '@reach/router'
import { screenshotUrl } from 'helpers'
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
