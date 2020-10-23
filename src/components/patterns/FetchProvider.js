import { LinkSolid, Text, Notification } from 'components/elements'
import React, { useState, useEffect } from 'react'
import { useQueryState } from 'components/hook'
import { urlVariations } from 'helpers'
import { Choose } from 'react-extras'
import mql from '@microlink/mql'

import demoLinks from '../../../data/demo-links'

const ErrorMessage = ({ more }) => {
  const text = 'The URL has something weird.'

  return (
    <Notification.Error>
      <Choose>
        <Choose.When condition={!!more}>
          <Text as='span'>
            {text}{' '}
            <LinkSolid display='inline' color='red8' href={more}>
              Report it.
            </LinkSolid>
          </Text>
        </Choose.When>
        <Choose.Otherwise>
          <Text as='span'>{text}</Text>
        </Choose.Otherwise>
      </Choose>
    </Notification.Error>
  )
}

const fetch = (url, opts) => {
  const variations = urlVariations(url)
  const item = demoLinks.find(item => variations.includes(item.data.url))
  return item || mql(url, opts)
}

export default ({ mqlOpts, children }) => {
  const [status, setStatus] = useState('initial')
  const [response, setResponse] = useState({})
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const fetchData = async (url, opts) => {
    try {
      setQuery({ url, ...opts })
      setError(null)
      setStatus('fetching')

      const doFetch = url => fetch(url, { ...mqlOpts, ...opts })

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
  }

  const doFetch = (url, opts) => {
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

  return (
    <>
      {error && <ErrorMessage {...error} />}
      {!error && warning && <Notification.Warning {...warning} />}
      {children({ status, doFetch, data, response })}
    </>
  )
}
