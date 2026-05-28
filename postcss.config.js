const plugins = [require('postcss-focus')]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    require('cssnano')({
      preset: require('cssnano-preset-advanced')
    })
  )
}

module.exports = { plugins }
