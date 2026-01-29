'use strict'

const path = require('path')
const { buildUserAgents } = require('../../build-user-agents/index.mjs')

module.exports = () =>
  require('../create-provider').fromCode(buildUserAgents, {
    dist: path.resolve(__dirname, '../../../static/user-agents.json')
  })
