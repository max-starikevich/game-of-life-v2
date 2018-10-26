const path = require('path')

module.exports = {
  entry: './src/client/main.jsx',
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
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: '3000',
    historyApiFallback: true
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/client/components'),
    },
    extensions: ['*', '.js', '.jsx']
  }
}
