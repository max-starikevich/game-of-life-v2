const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    styles: './src/client/styles/main.scss',
    main: './src/client/main.jsx',
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
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle-[name].[hash].js',
    chunkFilename: 'chunk-[name].[hash].js',
  },
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: '8080',
    historyApiFallback: true,
    proxy: {
      '/socket/': {
        target: 'http://backend:3000/socket/',
      }
    }
  },
  resolve: {
    alias: {
      client: path.resolve(__dirname, 'src/client/'),
      components: path.resolve(__dirname, 'src/client/components'),
    },
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/templates/layout.hbs',
      inject: false
    })
  ]
}
