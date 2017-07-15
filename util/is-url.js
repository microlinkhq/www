const urlRegex = require('url-regex')

module.exports = (url) => urlRegex().test(url)
