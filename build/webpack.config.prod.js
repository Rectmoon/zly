const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const { resolve, assetsPath } = require('./utils')

const commonOptions = {
  chunks: 'all',
  reuseExistingChunk: true
}

module.exports = webpackMerge(baseConfig, {
  mode: 'production',

  output: {
    filename: assetsPath('js/[name].[chunkhash:6].min.js'),
    chunkFilename: assetsPath('js/[name].[chunkhash:6].min.js'),
    path: resolve('rainbow')
  },

  optimization: {
    moduleIds: 'hashed',

    runtimeChunk: {
      name: 'manifest'
    },

    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        polyfill: {
          test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
          name: 'polyfill',
          priority: 30,
          ...commonOptions
        },

        styles: {
          name: 'styles',
          test: /(reset|common|base|widget)\.(s?css|sass|styl|less)/,
          minSize: 1,
          ...commonOptions
        }
      }
    }
  }
})
