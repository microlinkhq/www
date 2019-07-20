import { useSiteMetadata, useDemoLinks, useQueryState } from 'components/hook'
import { LinkSolid, Text, Notification } from 'components/elements'
import React, { useState, useRef, useEffect } from 'react'
import { Layout } from 'components/patterns'
import { Location } from '@reach/router'
import { screenshotUrl } from 'helpers'
import prependHttp from 'prepend-http'
import mql from '@microlink/mql'
import isUrl from 'is-url-http'
import { pickBy } from 'lodash'
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
  const [image, setImage] = useState(
    'https://cdn.microlink.io/page/screenshot.png'
  )
  const [warning, setWarning] = useState(null)
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
      setQuery({ url, ...opts })
      setError(null)
      setStatus('fetching')
      const { data } = await mql(url, {
        endpoint: apiEndpoint,
        screenshot: true,
        ...opts
      })
      setData(data)
      setStatus('fetched')
    } catch (err) {
      setStatus('error')
      setError(err)
    }
  }

  const doFetch = (url, opts) => {
    setWarning(null)
    if (isUrl(url)) return fetchData(url, opts)

    setTimeout(
      () => setWarning({ children: 'You need to provide a valid URL.' }),
      0
    )
  }

  useEffect(() => {
    const { url, ...opts } = query
    if (url) {
      focusInput()
      setImage(screenshotUrl(url, opts))
      fetchData(url, opts)
    }
  }, [query.url])

  const onSubmit = event => {
    event.preventDefault()
    doFetch(
      prependHttp(refUrl.current.value),
      pickBy({
        waitFor: ms(refWaitFor.current.value || '0'),
        browser: refOverlay.current.value,
        background: refBackground.current.value
      })
    )
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
