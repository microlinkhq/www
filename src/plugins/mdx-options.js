'use strict'

module.exports = {
  remarkPlugins: [require('remark-gfm').default],
  rehypePlugins: [require('./rehype-slug-trim')]
}
