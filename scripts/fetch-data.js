'use strict'

const beautyError = require('beauty-error')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const got = require('got')

module.exports = async ({ dist, url }) => {
  try {
    if (await existsFile(dist)) return
    const { body } = await got(url, { json: true })
    return jsonFuture.saveAsync(dist, body)
  } catch (err) {
    console.log(beautyError(err))
    process.exit(1)
  }
}
