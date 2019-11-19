import { useDemoLinks, useQueryState } from 'components/hook'
import { Layout, FetchProvider } from 'components/patterns'
import { Location } from '@reach/router'
import { screenshotUrl } from 'helpers'
import React from 'react'

import Examples from 'components/pages/embed/examples'
import Template from 'components/pages/embed/template'

export default () => {
  const demoLinks = useDemoLinks()
  const demoLink = demoLinks.find(demoLink => demoLink.brand === 'YouTube')

  const [query] = useQueryState()
  const title = 'Universal Embed'
  const image = query.url
    ? screenshotUrl(`https://microlink.io/embed?url=${query.url}`)
    : 'https://cdn.microlink.io/page/embed.png'

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
