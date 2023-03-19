import { Choose, Link, Notification } from 'components/elements'
import React, { useCallback, useState, useEffect } from 'react'
import { useQueryState } from 'components/hook'
import { urlVariations } from 'helpers'
import mql from '@microlink/mql'

import demoLinks from '../../../data/demo-links'

const ErrorMessage = ({ more }) => {
  const text = 'The URL has something weird.'

  return (
    <Notification.Error>
      <Choose>
        <Choose.When condition={!!more}>
          {text}{' '}
          <Link display='inline' href={more}>
            Report it.
          </Link>
        </Choose.When>
        <Choose.Otherwise>{text}</Choose.Otherwise>
      </Choose>
    </Notification.Error>
  )
}

const fetch = (url, fromCache, opts) => {
  const variations = urlVariations(url)
  return fromCache(variations, opts) || mql(url, opts)
}

const FetchProvider = ({ fromCache, mqlOpts, children }) => {
  const [status, setStatus] = useState('initial')
  const [response, setResponse] = useState({})
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const fetchData = useCallback(
    async (url, opts) => {
      try {
        setQuery({ url, ...opts })
        setError(null)
        setStatus('fetching')

        const doFetch = url => fetch(url, fromCache, { ...mqlOpts, ...opts })

        const { data, response } = Array.isArray(url)
          ? await Promise.all(url.map(doFetch))
          : await doFetch(url)

        setStatus('fetched')
        setData(data)
        setResponse(response)
      } catch (err) {
        console.error('FetchProvider:', err)
        setStatus('error')
        setError(err)
      }
    },
    [setQuery, fromCache, mqlOpts]
  )

  const doFetch = (url, opts) => {
    setWarning(null)
    if (url) return fetchData(url, opts)
    queueMicrotask(() =>
      setWarning({ children: 'You need to provide a valid URL.' })
    )
  }

  // TODO: Use React.Suspense
  /* eslint-disable*/
  useEffect(() => {
    queueMicrotask(() => {
      const { url, ...opts } = query
      if (url) fetchData(url, opts)
    })
  }, [])
  /* eslint-enable */

  return (
    <>
      {error && <ErrorMessage {...error} />}
      {!error && warning && <Notification.Warning {...warning} />}
      {children({ status, doFetch, data, response })}
    </>
  )
}

FetchProvider.defaultProps = {
  fromCache: variations =>
    demoLinks.find(item => variations.includes(item.data.url))
}

export default FetchProvider
