const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const contextPath = __dirname + '/../'

module.exports = {
  entry: {
    main: path.resolve(contextPath, 'src/client/main.jsx')
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
    path: path.resolve(contextPath, 'dist'),
    publicPath: '/',
    filename: 'bundle-[name].[hash].js',
    chunkFilename: 'chunk-[name].[hash].js'
  },
  devServer: {
    contentBase: path.resolve(contextPath, 'dist'),
    host: '0.0.0.0',
    port: '8080',
    historyApiFallback: true,
    proxy: {
      '/socket.io/': {
        target: 'http://backend:3000/socket.io/'
      }
    }
  },
  resolve: {
    alias: {
      components: path.resolve(contextPath, 'src/client/components')
    },
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(contextPath, 'src/client/index.html')
    })
  ]
}
