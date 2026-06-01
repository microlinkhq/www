const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: ['@storybook/addon-a11y'],
  framework: '@storybook/react-webpack5',
  core: {
    disableTelemetry: true
  },
  webpackFinal: async config => {
    config.module.rules[0].exclude = /core-js/

    config.module.rules.push({
      test: /\.(js)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-env')
            ],
            plugins: [
              require.resolve('@babel/plugin-proposal-class-properties'),
              require.resolve('babel-plugin-remove-graphql-queries'),
              require.resolve('babel-plugin-react-docgen'),
              require.resolve('babel-plugin-styled-components')
            ]
          }
        }
      ],
      exclude: /node_modules\/(?!(gatsby|gatsby-script)\/)/
    })

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      oneOf: [
        {
          test: /\.module\.s?css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                esModule: true,
                modules: {
                  namedExport: true
                }
              }
            },
            {
              loader: 'css-loader',
              options: {
                esModule: true,
                modules: {
                  namedExport: true
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    })

    config.resolve.alias['@reach/router'] = path.resolve(
      __dirname,
      '../node_modules/@gatsbyjs/reach-router'
    )

    config.resolve.mainFields = ['browser', 'module', 'main']

    config.resolve.modules = [
      ...config.resolve.modules,
      path.resolve(__dirname, '../src')
    ]

    return config
  }
}
