import { useSiteMetadata, useDemoLinks, useQueryState } from 'components/hook'
import { LinkSolid, Text, Notification } from 'components/elements'
import React, { useState, useRef, useEffect } from 'react'
import { Layout } from 'components/patterns'
import { Location } from '@reach/router'
import prependHttp from 'prepend-http'
import mql from '@microlink/mql'
import isUrl from 'is-url-http'

import Examples from 'components/pages/embed/examples'
import Template from 'components/pages/embed/template'

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
  const [warning, setWarning] = useState(null)
  const inputEl = useRef(null)
  const demoLinks = useDemoLinks()
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const fetchData = async url => {
    try {
      setQuery({ url })
      setError(null)
      setStatus('fetching')
      const { data } = await mql(url, {
        endpoint: apiEndpoint,
        palette: true
      })
      setData(data)
      setStatus('fetched')
    } catch (err) {
      setStatus('error')
      setError(err)
    }
  }

  const doFetch = url => {
    setWarning(null)
    if (isUrl(url)) return fetchData(url)
    setTimeout(
      () => setWarning({ children: 'You need to provide a valid URL.' }),
      0
    )
  }

  useEffect(() => {
    const { url } = query
    if (url) {
      focusInput()
      fetchData(url)
    }
  }, [query.url])

  const onSubmit = event => {
    event.preventDefault()
    doFetch(prependHttp(inputEl.current.value))
  }

  const cleanInput = () => {
    if (inputEl.current) {
      inputEl.current.value = ''
    }
  }

  const focusInput = () => {
    if (inputEl.current) {
      inputEl.current.focus()
    }
  }

  return (
    <Layout
      title='Enter an URL, receive data'
      image='https://cdn.microlink.io/page/embed.png'
    >
      {error && <ErrorMessage {...error} />}
      {!error && warning && <Notification.Warning {...warning} />}
      <Location>
        {({ location }) => {
          if (location.search !== '' && data && status === 'fetched') {
            return <Template data={data} />
          }

          if (!query.url && status !== 'fetching') cleanInput()
          focusInput()

          return (
            <Examples
              demoLinks={demoLinks}
              onSubmit={onSubmit}
              url={query.url}
              innerRef={inputEl}
              isLoading={status === 'fetching'}
            />
          )
        }}
      </Location>
    </Layout>
  )
}
