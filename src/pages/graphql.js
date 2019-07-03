/* global fetch */

import { useSiteMetadata, useQueryState } from 'components/hook'
import React, { useRef, useState, useEffect } from 'react'
import { Text, Box, Flex } from 'components/elements'
import GraphiQLExplorer from 'graphiql-explorer'
import { Layout } from 'components/patterns'
import { buildClientSchema } from 'graphql'
import { css } from 'styled-components'
import fromEntries from 'fromentries'
import { pickBy, noop } from 'lodash'
import { encode } from 'qss'
import copy from 'copy-to-clipboard'

import 'components/pages/graphql/style.css'

import introspection from '../../data/introspection.json'

const NOOP_GRAPHIQL = {
  handlePrettifyQuery: noop,
  handleToggleHistory: noop,
  handleRunQuery: noop
}

const DEFAULT_QUERY = `
{
  home: page (url: "https://microlink.io") {
    url
    image {
      url
      palette
    }
    resume: text(selector: "h2:first"),
    caption: text(selector: "h3:first")
  }

  blog: page(url: "https://microlink.io/blog", force:true) {
    url
    posts: text(selector: "section a")
  }
}
`

const TEXT = {
  SHARE: 'Share',
  SHARED: 'Copied!',
  CURL: 'Copy as cURL'
}

const TEXT_ANIMATION_MS = 1000

let GraphiQL

if (global.window) {
  GraphiQL = require('graphiql')
}

export default () => {
  const graphiqlEl = useRef(NOOP_GRAPHIQL)
  const graphiql = graphiqlEl.current

  const [windowQuery, setWindowQuery] = useQueryState()
  const [schema] = useState(buildClientSchema(introspection))
  const [isExplorerOpen, setExplorerOpen] = useState(true)
  const [shareText, setShareText] = useState(TEXT.SHARE)
  const [curlText, setCurlText] = useState(TEXT.CURL)
  const [query, setQuery] = useState(windowQuery.query || DEFAULT_QUERY)
  const [resHeaders, setResHeaders] = useState({})
  const { apiEndpoint } = useSiteMetadata()
  const graphqlEndpoint = `${apiEndpoint}/graphql`
  const [response, setResponse] = useState(null)

  const apiUrl = query => `${graphqlEndpoint}?${encode(query)}`

  async function fetchQuery (query) {
    const response = await fetch(apiUrl(query), {
      cache: 'no-store'
    })
    const headers = fromEntries(response.headers.entries())
    const payload = await response.json()
    return { payload, headers }
  }

  async function fetcher (graphQLParams) {
    const query = pickBy(graphQLParams)
    setWindowQuery(query)
    const { payload, headers } = await fetchQuery(query)
    setResHeaders(headers)
    return payload.data
  }

  async function fetchInitialResponse (query) {
    const { payload, headers } = await fetchQuery(query)
    setResponse(JSON.stringify(payload.data, null, 2))
    setResHeaders(headers)
  }

  const stats = [
    { key: 'Plan', value: resHeaders['x-pricing-plan'] },
    { key: 'Cache', value: resHeaders['x-cache-status'] },
    { key: 'Request Time', value: resHeaders['x-response-time'] }
  ]

  const toggleExplorer = () => setExplorerOpen(!isExplorerOpen)

  const onShare = () => {
    copy(window.location.href)
    setShareText(TEXT.SHARED)
    setTimeout(() => setShareText(TEXT.SHARE), TEXT_ANIMATION_MS)
  }

  const onCurl = () => {
    copy(`curl ${apiUrl({ query })}`)
    setCurlText(TEXT.SHARED)
    setTimeout(() => setCurlText(TEXT.CURL), TEXT_ANIMATION_MS)
  }

  const graphqlContainerStyle = css`
    height: 80vh !important;
    * {
      box-sizing: content-box;
    }
  `

  useEffect(() => {
    if (windowQuery.query === query && response === null) {
      fetchInitialResponse(windowQuery)
    }
  }, [windowQuery.query])

  if (!GraphiQL) return null

  return (
    <Layout>
      <Flex
        as='main'
        className='graphiql-container'
        css={graphqlContainerStyle}
      >
        <GraphiQLExplorer
          schema={schema}
          query={query}
          onEdit={setQuery}
          onRunOperation={graphiql.handleRunQuery}
          explorerIsOpen={isExplorerOpen}
          onToggleExplorer={toggleExplorer}
        />
        <GraphiQL
          ref={graphiqlEl}
          fetcher={fetcher}
          schema={schema}
          query={query}
          onEditQuery={setQuery}
          response={response}
        >
          <GraphiQL.Logo>MQL</GraphiQL.Logo>
          <GraphiQL.Toolbar>
            <GraphiQL.Button
              onClick={graphiql.handlePrettifyQuery}
              label='Prettify'
              title='Prettify Query (Shift-Ctrl-P)'
            />
            <GraphiQL.Button
              onClick={graphiql.handleToggleHistory}
              label='History'
              title='Show History'
            />
            <GraphiQL.Button
              onClick={toggleExplorer}
              label='Explorer'
              title='Toggle Explorer'
            />
            <Box mx='auto' />
            <GraphiQL.Button
              onClick={onShare}
              label={shareText}
              title={shareText}
            />
            <GraphiQL.Button
              onClick={onCurl}
              label={curlText}
              title={curlText}
            />
          </GraphiQL.Toolbar>
          <GraphiQL.Footer>
            <Box py={'4px'} px={'4px'}>
              {stats.map(({ key, value }) => (
                <Text as='span' key={key} fontSize={0} ml={1} mr={2}>
                  {key}:
                  <Text as='span' fontSize={0} fontWeight='regular'>
                    {' '}
                    {value || '-'}
                  </Text>
                </Text>
              ))}
            </Box>
          </GraphiQL.Footer>
        </GraphiQL>
      </Flex>
    </Layout>
  )
}
