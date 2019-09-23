const webpack = require('webpack')

const { resolve, getEntries, getHtmlPlugins } = require('./utils')

module.exports = {
  entry: getEntries('example'),

  output: {
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.jsx'],

    alias: {
      '@': resolve('src')
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|umd/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },

  plugins: [...getHtmlPlugins('example'), new webpack.ProgressPlugin()]
}
