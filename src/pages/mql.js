/* global fetch */

import { Text, Box, Flex } from 'components/elements'
import { useSiteMetadata } from 'components/hook'
import GraphiQLExplorer from 'graphiql-explorer'
import React, { useRef, useState } from 'react'
import { Layout } from 'components/patterns'
import { buildClientSchema } from 'graphql'
import { css } from 'styled-components'
import fromEntries from 'fromentries'
import { marshall } from 'helpers'
import GraphiQL from 'graphiql'
import { pickBy, noop } from 'lodash'

import 'components/pages/mql/style.css'
import introspection from '../../data/introspection.json'

const NOOP_GRAPHIQL = {
  handlePrettifyQuery: noop,
  handleToggleHistory: noop,
  handleRunQuery: noop
}

const DEFAULT_QUERY = `
{
  page (url: "https://kikobeats.com") {
    url
  }
}
`

export default () => {
  const graphiqlEl = useRef(NOOP_GRAPHIQL)
  const graphiql = graphiqlEl.current

  const [schema] = useState(buildClientSchema(introspection))
  const [isExplorerOpen, setExplorerOpen] = useState(true)
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [resHeaders, setResHeaders] = useState({})
  const { apiEndpoint } = useSiteMetadata()
  const graphqlEndpoint = `${apiEndpoint}/___graphql`

  async function fetcher (graphQLParams) {
    const query = marshall(pickBy(graphQLParams))
    const response = await fetch(`${graphqlEndpoint}?${query}`)
    setResHeaders(fromEntries(response.headers.entries()))
    const payload = await response.json()
    return payload.data
  }

  // useEffect(() => {
  //   fetcher({ query: getIntrospectionQuery() }).then(result => {
  //     setSchema(buildClientSchema(result))
  //   })
  // }, [])

  const stats = [
    { key: 'Plan', value: resHeaders['x-pricing-plan'] },
    { key: 'Cache', value: resHeaders['x-cache-status'] },
    { key: 'Request Time', value: resHeaders['x-response-time'] }
  ]

  const toggleExplorer = () => setExplorerOpen(!isExplorerOpen)

  const graphqlContainerStyle = css`
    height: 80vh !important;
    * {
      box-sizing: content-box;
    }
  `

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
