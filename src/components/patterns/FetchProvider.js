import { LinkSolid, Text, Notification } from 'components/elements'
import { useQueryState } from 'components/hook'
import React, { useState, useEffect } from 'react'
import mql from '@microlink/mql'

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

export default ({ mqlOpts, children }) => {
  const [status, setStatus] = useState('initial')
  const [error, setError] = useState(null)
  const [warning, setWarning] = useState(null)
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const fetchData = async (url, opts) => {
    try {
      setQuery({ url, ...opts })
      setError(null)
      setStatus('fetching')

      const fromMql = url => mql(url, { ...mqlOpts, ...opts })

      const data = Array.isArray(url)
        ? (await Promise.all(url.map(fromMql))).map(res => res.data)
        : (await fromMql(url)).data

      setData(data)
      setStatus('fetched')
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
      {children({ status, doFetch, data })}
    </>
  )
}
