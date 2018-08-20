'use strict'

const KeyvFile = require('keyv-file')

const webpack = require('webpack')
const crypto = require('crypto')
const pAll = require('p-all')
const Keyv = require('keyv')
const path = require('path')
const got = require('got')

const URLS = require('./data/urls')

const keyv = new Keyv({
  store: new KeyvFile({
    filename: `./node_modules/.cache/microlink.msgpack`
  })
})

const apiFetch = async url => {
  const cachedData = await keyv.get(url)
  if (cachedData) return cachedData
  console.log('fetching', url)
  const { body } = await got(
    `https://api.microlink.io?url=${url}&video&palette&force`,
    { json: true }
  )
  const { data } = body
  await keyv.set(url, data)
  return data
}

exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat([`markdown-in-js/babel`])
  }
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  // See https://github.com/FormidableLabs/react-live/issues/5
  config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/))

  return config.merge({
    resolve: {
      root: path.resolve(__dirname, './src')
    }
  })
}

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators
  const actions = URLS.map(url => () => apiFetch(url))
  const links = await pAll(actions, { concurrency: 2 })

  const toNode = data => {
    const node = {
      data: data,
      id: data.url,
      parent: '__SOURCE__',
      children: [],
      internal: { type: `DemoLink` }
    }

    node.internal.contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(node))
      .digest(`hex`)

    return node
  }

  links.forEach(link => createNode(toNode(link)))
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const blogIndexTemplate = path.resolve(`src/layouts/blog.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
          {
            allJavascriptFrontmatter {
              edges {
                node {
                  frontmatter {
                    title
                    date
                    static
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const posts = result.data.allJavascriptFrontmatter.edges
          .map((data, index) => ({ ...data.node.frontmatter }))
          .filter(({ static: isStatic }) => isStatic !== true)
          .sort((a, b) => new Date(b.date) - new Date(a.date))

        return Promise.resolve(
          createPage({
            path: '/blog',
            component: blogIndexTemplate,
            context: { posts }
          })
        )
      })
    )
  })
}
