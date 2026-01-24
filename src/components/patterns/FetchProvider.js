import Choose from 'components/elements/Choose'
import { Link } from 'components/elements/Link'
import Notification from 'components/elements/Notification/Notification'
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { findDemoLinkByVariations } from 'helpers/demo-links'
import { urlVariations } from 'helpers/url-variations'
import { useQueryState } from 'components/hook/use-query-state'
import mql from '@microlink/mql'

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

const fetchFromApi = (url, fromCache, opts) => {
  const variations = urlVariations(url)
  return fromCache(variations, opts) || mql(url, opts)
}

const defaultFromCache = variations => findDemoLinkByVariations(variations)

const FetchProvider = ({ fromCache = defaultFromCache, mqlOpts, children }) => {
  const [status, setStatus] = useState('initial')
  const [response, setResponse] = useState({})
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const didInitialFetch = useRef(false)

  const fetchData = useCallback(
    async (url, opts) => {
      try {
        setQuery({ url, ...opts })
        setError(null)
        setStatus('fetching')

        const doFetch = url =>
          fetchFromApi(url, fromCache, { ...mqlOpts, ...opts })

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
    if (!url) {
      setWarning({ children: 'You need to provide a valid URL.' })
      return
    }
    return fetchData(url, opts)
  }

  useEffect(() => {
    if (didInitialFetch.current) return
    didInitialFetch.current = true

    const { url, ...opts } = query
    if (url) fetchData(url, opts)
  }, [query, fetchData])

  return (
    <>
      {error ? <ErrorMessage {...error} /> : null}
      {!error && warning ? <Notification.Warning {...warning} /> : null}
      {children({ status, doFetch, data, response })}
    </>
  )
}

export default FetchProvider
