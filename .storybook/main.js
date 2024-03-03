const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async config => {
    // Remove core-js to prevent issues with Storybook
    config.module.rules[0].exclude = /core-js/

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules.push({
      test: /\.(js)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              // use @babel/preset-react for JSX and env (instead of staged presets)
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-env')
            ],
            plugins: [
              // use @babel/plugin-proposal-class-properties for class arrow functions
              require.resolve('@babel/plugin-proposal-class-properties'),
              // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
              require.resolve('babel-plugin-remove-graphql-queries'),
              // use babel-plugin-react-docgen to ensure PropTables still appear
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
        // module.scss files (e.g component styles.module.scss)
        // https://webpack.js.org/loaders/style-loader/#modules
        {
          test: /\.module\.s?css$/,
          use: [
            // Add exports of a module as style to DOM
            {
              loader: 'style-loader',
              options: {
                esModule: true,
                modules: {
                  namedExport: true
                }
              }
            },
            // Loads CSS file with resolved imports and returns CSS code
            {
              loader: 'css-loader',
              options: {
                esModule: true,
                modules: {
                  namedExport: true
                }
              }
            },
            // Loads and compiles a SASS/SCSS file
            'sass-loader'
          ]
        },
        // scss files that are not modules (e.g. custom.scss)
        {
          use: [
            // Add exports of a module as style to DOM
            'style-loader',
            // Loads CSS file with resolved imports and returns CSS code
            'css-loader',
            // Loads and compiles a SASS/SCSS file
            'sass-loader'
          ]
        }
      ]
    })

    config.resolve.alias['@reach/router'] = path.resolve(
      __dirname,
      '../node_modules/@gatsbyjs/reach-router'
    )

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ['browser', 'module', 'main']

    config.resolve.modules = [
      ...config.resolve.modules,
      path.resolve(__dirname, '../src')
    ]

    return config
  }
}
