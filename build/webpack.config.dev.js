const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = webpackMerge(baseConfig, {
  mode: 'development',

  devServer: {
    hot: true,
    open: false,
    port: 9000,
    contentBase: false,
    overlay: {
      errors: true
    },
    publicPath: '/example/',
    // quiet: true,  // 终端是否关闭打包日志
    // clientLogLevel: 'none', // 浏览器控制台是否输出编译相关日志
    before(app) {
      app.get('/api/profile', (req, res) => {
        res.json({
          name: 'zhangsan',
          age: 20
        })
      })

      app.use('*', (req, res, next) => {
        /**
         * do Somthing
         */
        next()
      })
    },
    proxy: {
      /**
       * proxy setting
       * 详细配置：https://github.com/chimurai/http-proxy-middleware
       */
    },

    historyApiFallback: {}
  },

  devtool: 'inline-source-map',

  plugins: [new webpack.NamedModulesPlugin()]
})
