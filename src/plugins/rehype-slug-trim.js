const GithubSlugger = require('github-slugger').default
const { headingRank } = require('hast-util-heading-rank')
const { toString } = require('hast-util-to-string')
const { visit } = require('unist-util-visit')

const slugs = new GithubSlugger()

module.exports = function rehypeSlugTrim () {
  return function (tree) {
    slugs.reset()

    visit(tree, 'element', function (node) {
      if (headingRank(node) && !node.properties.id) {
        node.properties.id = slugs.slug(toString(node).trim())
      }
    })
  }
}
