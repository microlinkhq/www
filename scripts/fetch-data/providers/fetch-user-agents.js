'use strict'

const crawlerAgents = require('top-crawler-agents')
const userAgents = require('top-user-agents')
const $ = require('tinyspawn')
const path = require('path')

const pkgInfo = async pkgName => {
  const { stdout } = await $.json(`npm view ${pkgName} --json`)
  const version = stdout.version
  const updatedAt = stdout.time[version]
  return { updatedAt, version }
}

const fn = async () => {
  const npm = await Promise.all([
    pkgInfo('top-user-agents'),
    pkgInfo('top-crawler-agents')
  ])

  return [
    {
      name: 'top-user-agents',
      ...npm[0],
      data: userAgents
    },
    {
      name: 'top-crawler-agents',
      ...npm[1],
      data: crawlerAgents
    }
  ]
}

module.exports = () =>
  require('../create-provider').fromCode(fn, {
    dist: path.resolve(__dirname, '../../../data/user-agents.json')
  })
