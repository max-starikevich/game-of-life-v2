const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/web/main.jsx'
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
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
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle-[name].[hash].js',
    chunkFilename: 'chunk-[name].[hash].js'
  },
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: '8080',
    historyApiFallback: true,
    proxy: {
      '/socket/': {
        target: 'http://backend:3000/socket/'
      }
    }
  },
  resolve: {
    alias: {
      scenes: path.resolve(__dirname, 'src/web/scenes'),
      shared: path.resolve(__dirname, 'src/shared')
    },
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/web/templates/layout.hbs',
      inject: false
    })
  ]
}
