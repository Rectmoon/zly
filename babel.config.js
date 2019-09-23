const { BABEL_ENV } = process.env
const cjs = BABEL_ENV === 'commonjs'
const loose = true

module.exports = {
  presets: [['@babel/env', { loose, modules: false }]],
  plugins: [
    cjs && ['@babel/transform-modules-commonjs', { loose }],
    ['@babel/transform-runtime', { useESModules: !cjs, helpers: true, corejs: 3 }]
  ].filter(Boolean)
}
