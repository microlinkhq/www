'use strict'

const webpack = require('webpack')
const path = require('path')

exports.modifyWebpackConfig = ({ config, stage }) => {
  // See https://github.com/FormidableLabs/react-live/issues/5
  config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/))

  return config.merge({
    resolve: {
      root: path.resolve(__dirname, './src')
    }
  })
}
