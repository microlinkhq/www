'use strict'

const { createApiUrl } = require('react-microlink')

module.exports = url => {
  let apiUrl = createApiUrl({ url, video: true, contrast: true })
  apiUrl += '&audio'
  apiUrl += '&force'
  return apiUrl
}
