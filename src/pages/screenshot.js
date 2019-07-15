import { useSiteMetadata, useDemoLinks, useQueryState } from 'components/hook'
import React, { useState, useRef, useEffect } from 'react'
import { Layout } from 'components/patterns'
import { Location } from '@reach/router'
import ms from 'ms'
import prependHttp from 'prepend-http'
import mql from '@microlink/mql'
import isUrl from 'is-url-http'

import Examples from 'components/pages/screenshot/examples'
import Template from 'components/pages/screenshot/template'

export default () => {
  const { apiEndpoint } = useSiteMetadata()
  const [status, setStatus] = useState('initial')
  const refUrl = useRef(null)
  const refWaitFor = useRef(null)
  const refOverlay = useRef(null)
  const refBackground = useRef(null)
  const demoLinks = useDemoLinks()
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const fetchData = async (url, opts) => {
    try {
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
      console.error(err)
    }
  }

  useEffect(() => {
    const { url, ...opts } = query
    if (url) {
      focusInput()
      fetchData(url, opts)
    }
  }, [query.url])

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
    <Layout image='https://cdn.microlink.io/page/embed.png'>
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
