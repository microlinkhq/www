'use strict'

const KeyvFile = require('keyv-file')

const download = require('download')
const webpack = require('webpack')
const URL = require('url-parse')
const crypto = require('crypto')
const pAll = require('p-all')
const path = require('path')
const Keyv = require('keyv')
const got = require('got')

const URLS = require('./data/urls')

const keyv = new Keyv({
  store: new KeyvFile({
    filename: `./node_modules/.cache/microlink.msgpack`
  })
})

const isProduction = process.env.NODE_ENV === 'production'

const apiFetch = async targetUrl => {
  try {
    const key = `https://api.microlink.io?url=${targetUrl}&video&palette&force`
    const cachedData = await keyv.get(key)
    if (!isProduction && cachedData) return cachedData
    const { body } = await got(key, { json: true })

    const { data } = body
    const { url, logo, screenshot, video, image } = data

    const assets = [
      { propName: 'logo', propValue: logo, url },
      { propName: 'screenshot', propValue: screenshot, url },
      { propName: 'video', propValue: video, url },
      { propName: 'image', propValue: image, url }
    ].filter(({ propValue }) => !!propValue)

    const downloads = assets.map(({ url, propName, propValue }) => {
      const { hostname, pathname } = new URL(propValue.url)
      const filepath = path.dirname(pathname).substr(1)
      const downloadPath = path.resolve(
        'static',
        'card',
        hostname,
        propName,
        filepath
      )
      console.log('downloadPath', downloadPath)
      return download(propValue.url, downloadPath)
    })

    await Promise.all([Promise.all(downloads), keyv.set(key, data)])
    console.log(`fetch url=${targetUrl}`)
    return data
  } catch (err) {
    err.message = `${err.message}: ${targetUrl}`
    throw err
  }
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

  if (stage === 'build-html') {
    config.loader('null', {
      test: /react-json-view/,
      loader: 'null-loader'
    })
  }

  return config.merge({
    resolve: {
      root: path.resolve(__dirname, './src')
    }
  })
}

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators
  const actions = URLS.map(url => () => apiFetch(url))
  const links = await pAll(actions, { concurrency: 1 })

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
