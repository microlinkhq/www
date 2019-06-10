import React, { useState, useRef } from 'react'
import { useDemoLinks, useQueryState } from 'components/hook'
import { Layout } from 'components/patterns'
import { isEmpty } from 'lodash'
import mql from '@microlink/mql'

import Examples from 'components/pages/embed/examples'
import Template from 'components/pages/embed/template'

export default () => {
  const inputEl = useRef(null)
  const demoLinks = useDemoLinks()
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [query, setQuery] = useQueryState()
  const { url } = query

  React.useEffect(() => {
    async function fetchData () {
      try {
        const { data } = await mql(url)
        setData(data)
      } catch (err) {}
    }
    fetchData()
    setLoading(false)
  }, [url])

  const onSubmit = async event => {
    setLoading(true)
    event.preventDefault()
    const url = inputEl.current.value
    setQuery({ url })
  }

  return (
    <Layout>
      {isEmpty(data) ? (
        <Examples
          demoLinks={demoLinks}
          onSubmit={onSubmit}
          url={url}
          innerRef={inputEl}
          isLoading={isLoading}
        />
      ) : (
        <Template data={data} />
      )}
    </Layout>
  )
}
