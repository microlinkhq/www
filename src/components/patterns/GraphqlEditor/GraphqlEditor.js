/* global fetch */

import { useQueryState } from 'components/hook'
import React, { useRef, useState, useEffect } from 'react'
import { Text, Box, Flex } from 'components/elements'
import GraphiQLExplorer from 'graphiql-explorer'
import { buildClientSchema } from 'graphql'
import { css } from 'styled-components'
import fromEntries from 'fromentries'
import { pickBy, noop } from 'lodash'
import copy from 'copy-to-clipboard'
import { encode } from 'qss'

import introspection from '../../../../data/introspection.json'

import './style.css'

const NOOP_GRAPHIQL = {
  handlePrettifyQuery: noop,
  handleToggleHistory: noop,
  handleRunQuery: noop
}

const DEFAULT_QUERY = `
{
  home: page(url: "https://microlink.io") {
    title: text(selector:"h2")
    subtitle: text(selector: "h3")
    sections: url(selectorAll:"nav:first a")
  }

  blog: page(url: "https://microlink.io/blog") {
    posts: url(selectorAll: "section a", attr: "href")
  }
}
`

const TEXT = {
  SHARE: 'Share',
  SHARED: 'Copied!',
  CURL: 'Copy as cURL'
}

const TEXT_ANIMATION_MS = 800

const SCHEMA = buildClientSchema(introspection)

let GraphiQL

if (global.window) {
  GraphiQL = require('graphiql')
}

const graphqlContainerStyle = css`
  height: 50vh !important;
  * {
    box-sizing: content-box;
  }
`

const GraphqlEditor = ({ graphqlEndpoint, css }) => {
  const graphiqlEl = useRef(NOOP_GRAPHIQL)
  const graphiql = graphiqlEl.current

  const [query, setQuery] = useQueryState()
  const [isExplorerOpen, setExplorerOpen] = useState(true)
  const [shareText, setShareText] = useState(TEXT.SHARE)
  const [curlText, setCurlText] = useState(TEXT.CURL)
  const [graphqlQuery, setGraphqlQuery] = useState(query.query || DEFAULT_QUERY)
  const [resHeaders, setResHeaders] = useState({})
  const [response, setResponse] = useState(null)

  const apiUrl = query => `${graphqlEndpoint}?${encode(query)}`

  async function fetchQuery (query) {
    const response = await fetch(apiUrl(query), { cache: 'no-store' })
    const headers = fromEntries(response.headers.entries())
    const payload = await response.json()
    return { payload, headers }
  }

  async function fetcher (graphQLParams) {
    const query = pickBy(graphQLParams)
    setQuery(query)
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
    copy(`curl ${apiUrl({ query: graphqlQuery })}`)
    setCurlText(TEXT.SHARED)
    setTimeout(() => setCurlText(TEXT.CURL), TEXT_ANIMATION_MS)
  }

  useEffect(() => {
    if (query.query === graphqlQuery && response === null) {
      fetchInitialResponse(query)
    }
  }, [query.query])

  if (!GraphiQL) return null

  return (
    <Flex className='graphiql-container' css={css}>
      <GraphiQLExplorer
        schema={SCHEMA}
        query={graphqlQuery}
        onEdit={setGraphqlQuery}
        onRunOperation={graphiql.handleRunQuery}
        explorerIsOpen={isExplorerOpen}
        onToggleExplorer={toggleExplorer}
      />
      <GraphiQL
        ref={graphiqlEl}
        fetcher={fetcher}
        schema={SCHEMA}
        query={graphqlQuery}
        onEditQuery={setGraphqlQuery}
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
          <GraphiQL.Button onClick={onCurl} label={curlText} title={curlText} />
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
  )
}

GraphqlEditor.defaultProps = {
  css: graphqlContainerStyle
}

export default GraphqlEditor
