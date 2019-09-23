const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const { resolve } = require('./utils')

const commonConfig = {
  mode: 'production',
  output: {
    filename: '[name].js',
    library: '[name]', // 暴露出的变量名 (libs中的文件名不要包括"-、."等字符， 文件名最好为驼峰格式)
    libraryTarget: 'umd', //var (默认值，发布为全局变量)、commonjs、commonjs2、amd、umd等
    globalObject: 'this',
    libraryExport: 'default',
    umdNamedDefine: true //(umd规范中输出amd的命名)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/env'],
            plugins: [['@babel/transform-runtime', { corejs: 3 }]]
          }
        }
      }
    ]
  },
  plugins: [new webpack.ProgressPlugin()]
}

const packageDir = resolve('packages')
const packages = glob.sync(`${packageDir}/**/src/index.js`)

module.exports = packages.reduce((res, next) => {
  const packageName = path.relative(packageDir, next).split(path.sep)[0]
  const c = {
    entry: {
      [packageName]: next
    }
  }
  res = res.concat([
    webpackMerge(commonConfig, {
      output: {
        filename: '[name].js',
        path: resolve(`${packageDir}/${packageName}/umd`)
      },
      optimization: {
        // nodeEnv: 'development',
        minimize: false
      },
      ...c,
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
      ]
    }),
    webpackMerge(commonConfig, {
      output: {
        filename: '[name].min.js',
        path: resolve(`${packageDir}/${packageName}/umd`)
      },
      ...c
    })
  ])
  return res
}, [])
