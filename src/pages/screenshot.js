import { useDemoLinks, useQueryState } from 'components/hook'
import { LinkSolid, Text, Notification } from 'components/elements'
import React, { useState, useEffect } from 'react'
import { Layout } from 'components/patterns'
import { Location } from '@reach/router'
import { screenshotUrl } from 'helpers'

import mql from '@microlink/mql'

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
  const [status, setStatus] = useState('initial')
  const [warning, setWarning] = useState(null)
  const [error, setError] = useState(null)
  const demoLinks = useDemoLinks()
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const fetchData = async (url, opts) => {
    try {
      setQuery({ url, ...opts })
      setError(null)
      setStatus('fetching')
      const { data } = await mql(url, {
        screenshot: true,
        meta: false,
        disableAnimations: true,
        ...opts
      })
      setData(data)
      setStatus('fetched')
    } catch (err) {
      setStatus('error')
      setError(err)
    }
  }

  const doFetch = ({ url, ...opts }) => {
    setWarning(null)
    if (url) return fetchData(url, opts)

    setTimeout(
      () => setWarning({ children: 'You need to provide a valid URL.' }),
      0
    )
  }

  useEffect(() => {
    const { url, ...opts } = query
    if (url) fetchData(url, opts)
  }, [query.url])

  const image = query.url
    ? screenshotUrl(`https://microlink.io/screenshot?url=${query.url}`)
    : 'https://cdn.microlink.io/page/screenshot.png'

  return (
    <Layout title='Take a screenshot of any website' image={image}>
      {error && <ErrorMessage {...error} />}
      {!error && warning && <Notification.Warning {...warning} />}
      <Location>
        {({ location }) => {
          const hasContent =
            location.search !== '' && data && status === 'fetched'

          if (hasContent) {
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
    </Layout>
  )
}
