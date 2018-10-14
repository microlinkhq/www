'use strict'

const { createApiUrl } = require('react-microlink')

module.exports = (url, { force = false } = {}) => {
  let apiUrl = createApiUrl({ url, video: true, contrast: true })
  apiUrl += '&audio'
  if (force) apiUrl += '&force'
  return apiUrl
}
