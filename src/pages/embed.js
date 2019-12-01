import { useDemoLinks, useQueryState } from 'components/hook'
import { Layout, FetchProvider } from 'components/patterns'
import { Location } from '@reach/router'
import { screenshotUrl } from 'helpers'
import humanizeUrl from 'humanize-url'
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

  const suggestions = [
    'NYTimes',
    'Spotify',
    'TechCrunch',
    'TheVerge',
    'YouTube'
  ].map(brand => {
    const { data } = demoLinks.find(item => item.brand === brand)
    const { url } = data
    return { brand, value: humanizeUrl(url), url, data }
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
