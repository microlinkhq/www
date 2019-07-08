import { useSiteMetadata, useDemoLinks, useQueryState } from 'components/hook'
import React, { useState, useRef, useEffect } from 'react'
import { Layout } from 'components/patterns'
import { Location } from '@reach/router'
import mql from '@microlink/mql'

import Examples from 'components/pages/embed/examples'
import Template from 'components/pages/embed/template'

export default () => {
  const { apiEndpoint } = useSiteMetadata()
  const [status, setStatus] = useState('initial')
  const inputEl = useRef(null)
  const demoLinks = useDemoLinks()
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()

  const fetchData = async url => {
    try {
      setStatus('fetching')
      const { data } = await mql(url, { endpoint: apiEndpoint })
      setData(data)
      setQuery({ url })
      setStatus('fetched')
    } catch (err) {
      setStatus('error')
      console.error(err)
    }
  }

  useEffect(() => {
    if (query.url) {
      focusInput()
      fetchData(query.url)
    }
  }, [query.url])

  const onSubmit = event => {
    event.preventDefault()
    fetchData(inputEl.current.value)
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
    <Layout image='https://cdn.microlink.io/page/embed.png'>
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
