import { useDemoLinks, useQueryState } from 'components/hook'
import { LinkSolid, Text, Notification } from 'components/elements'
import { Layout, Searchbox } from 'components/patterns'
import { Location } from '@reach/router'
import { screenshotUrl } from 'helpers'
import React from 'react'

import Examples from 'components/pages/screenshot/examples'
import Template from 'components/pages/screenshot/template'

const ErrorMessage = ({ more }) => {
  const text = 'The URL has something weird.'
  const children = more ? (
    <Text as='span'>
      {text}{' '}
      <LinkSolid display='inline' color='red8' href={more}>
        Report it.
      </LinkSolid>
    </Text>
  ) : (
    <Text as='span'>{text}</Text>
  )

  return <Notification.Error>{children}</Notification.Error>
}

export default () => {
  const demoLinks = useDemoLinks()
  const [query] = useQueryState()
  const title = 'Take a screenshot of any website'
  const image = query.url
    ? screenshotUrl(`https://microlink.io/screenshot?url=${query.url}`)
    : 'https://cdn.microlink.io/page/screenshot.png'

  return (
    <Layout title={title} image={image}>
      <Searchbox>
        {({ status, doFetch, data, warning, error }) => (
          <>
            {error && <ErrorMessage {...error} />}
            {error && warning && <Notification.Warning {...warning} />}
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
      </Searchbox>
    </Layout>
  )
}
