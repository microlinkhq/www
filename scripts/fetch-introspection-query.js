'use strict'

const { getIntrospectionQuery } = require('graphql')
const { stringify } = require('querystring')
const jsonFuture = require('json-future')
const existsFile = require('exists-file')
const chalk = require('chalk')
const path = require('path')
const got = require('got')

const { NODE_ENV, MICROLINK_API_ENDPOINT } = require('../env')

const INTROSPECTION_PATH = path.resolve(__dirname, '../data/introspection.json')

const main = async () => {
  if (!existsFile.sync(INTROSPECTION_PATH)) {
    throw new Error('Introspection file not detected!')
  }

  if (NODE_ENV === 'production') return

  const graphqlEndpoint = `${MICROLINK_API_ENDPOINT}/graphql`
  const query = stringify({ query: getIntrospectionQuery() })
  const { body } = await got(`${graphqlEndpoint}?${query}`, { json: true })
  return jsonFuture.saveAsync(INTROSPECTION_PATH, body)
}

main()
  .then(() => process.exit())
  .catch(() => {
    console.log(`${chalk.yellow('warning')} introspection query not updated`)
    process.exit(0)
  })
