const fs = require('fs')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

const ENV = process.env.NODE_ENV
const isProd = ENV === 'production'
const defaultTemplatePath = resolve('index.html')

const getAllPages = (entries, entryDirPath) => {
  return entries.map(p => [
    path
      .relative(entryDirPath, p)
      .split(path.sep)
      .slice(0, -1)
      .join('/'),
    p
  ])
}

function assetsPath(_path) {
  return path.posix.join('assets', _path)
}

function getEntries(entryDir = 'src/entries') {
  const entryDirPath = resolve(entryDir)
  const entries = glob.sync(`${entryDirPath}/**/index.js`)
  return getAllPages(entries, entryDirPath).reduce((entries, next) => {
    entries[next[0]] = next[1]
    return entries
  }, {})
}

function getHtmlPlugins(entryDir = 'src/entries') {
  const entryDirPath = resolve(entryDir)
  const entries = glob.sync(`${entryDirPath}/**/index.js`)

  return getAllPages(entries, entryDirPath).map(p => {
    const chunks = ['manifest', 'polyfill', 'styles', p[0]]
    const tpName = p[1].replace('.js', '.html')
    const template = fs.existsSync(tpName) ? tpName : defaultTemplatePath

    return new HtmlWebpackPlugin({
      template: template,
      filename: `${p[0]}.html`,
      chunks,
      inject: true,
      chunksSortMode: 'manual',
      minify: isProd
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          }
        : false
    })
  })
}

module.exports = {
  resolve,
  assetsPath,
  getEntries,
  getHtmlPlugins
}
