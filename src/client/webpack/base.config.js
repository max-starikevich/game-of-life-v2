const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const contextPath = `${__dirname}/../`

const baseConfig = {
  entry: {
    polyfills: [
      'babel-polyfill'
    ],
    main: path.resolve(contextPath, 'index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  output: {
    path: path.resolve(contextPath, 'dist'),
    publicPath: '/',
    filename: 'bundle-[name].[hash].js',
    chunkFilename: 'chunk-[name].[hash].js'
  },
  resolve: {
    alias: {
      components: path.resolve(contextPath, 'components')
    },
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(contextPath, 'templates/index.html')
    })
  ]
}

module.exports = {
  contextPath,
  baseConfig
}
