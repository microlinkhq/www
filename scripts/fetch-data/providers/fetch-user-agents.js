'use strict'

const path = require('path')
const { buildUserAgents } = require('../../build-user-agents/index.mjs')

const DIST = path.resolve(__dirname, '../../../static/user-agents.json')

module.exports = () =>
  require('../create-provider').fromCode(buildUserAgents, { dist: DIST })

module.exports.dist = DIST
