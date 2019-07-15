import { useSiteMetadata, useDemoLinks, useQueryState } from 'components/hook'
import { LinkSolid, Text, Notification } from 'components/elements'
import React, { useState, useRef, useEffect } from 'react'
import { Layout } from 'components/patterns'
import { Location } from '@reach/router'
import prependHttp from 'prepend-http'
import mql from '@microlink/mql'
import isUrl from 'is-url-http'
import ms from 'ms'

import Examples from 'components/pages/screenshot/examples'
import Template from 'components/pages/screenshot/template'

const ErrorMessage = ({ more }) => {
  const text = `The URL has something weird.`
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
  const { apiEndpoint } = useSiteMetadata()
  const [status, setStatus] = useState('initial')
  const [error, setError] = useState(null)
  const refUrl = useRef(null)
  const refWaitFor = useRef(null)
  const refOverlay = useRef(null)
  const refBackground = useRef(null)
  const demoLinks = useDemoLinks()
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const fetchData = async (url, opts) => {
    try {
      setError(null)
      setStatus('fetching')
      const { data } = await mql(url, {
        endpoint: apiEndpoint,
        screenshot: true,
        ...opts
      })
      setData(data)
      setQuery({ url, ...opts })
      setStatus('fetched')
    } catch (err) {
      setStatus('error')
      setError(err)
    }
  }

  useEffect(
    () => {
      const { url, ...opts } = query
      if (url) {
        focusInput()
        fetchData(url, opts)
      }
    },
    [query.url]
  )

  const onSubmit = event => {
    event.preventDefault()

    const url = prependHttp(refUrl.current.value)

    if (!isUrl(url)) {
      refUrl.current.setCustomValidity('You need to provide a valid URL.')
    }

    const waitFor = ms(refWaitFor.current.value || '0')
    const browser = refOverlay.current.value
    fetchData(url, { waitFor, browser })
  }

  const cleanInput = () => {
    if (refUrl.current) {
      refUrl.current.value = ''
    }
  }

  const focusInput = () => {
    if (refUrl.current) {
      refUrl.current.focus()
    }
  }

  return (
    <Layout
      title='Take screenshot of any website'
      image='https://cdn.microlink.io/page/screenshot.png'
    >
      {error && <ErrorMessage {...error} />}
      <Location>
        {({ location }) => {
          const hasContent =
            location.search !== '' && data && status === 'fetched'
          if (hasContent) {
            return <Template data={data} />
          }

          if (!query.url && status !== 'fetching') cleanInput()
          focusInput()

          return (
            <Examples
              demoLinks={demoLinks}
              onSubmit={onSubmit}
              url={query.url}
              refUrl={refUrl}
              refWaitFor={refWaitFor}
              refOverlay={refOverlay}
              refBackground={refBackground}
              isLoading={status === 'fetching'}
            />
          )
        }}
      </Location>
    </Layout>
  )
}
